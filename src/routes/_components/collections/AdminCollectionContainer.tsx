import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useMultiplePocketbase } from "./use-collection";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { CollectionsList } from "./list/CollectionsList";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import type { PBClientInstances } from "./CollectionInstanceContainer";
import type Client from "pocketbase";

interface AdminCollectionContainerProps {
  instances: PBClientInstances;
}

export function AdminCollectionContainer({
  instances,
}: AdminCollectionContainerProps) {
  const localPB = useMultiplePocketbase({
    instanceKey: instances.local.instanceKey,
    url: instances.local.url,
  });
  const remotePB = useMultiplePocketbase({
    instanceKey: instances.remote.instanceKey,
    url: instances.remote.url,
  });

  const query = useSuspenseQuery({
    queryKey: ["collections", instances.local.instanceKey],
    queryFn: () => {
      return pbTryCatchWrapper(localPB.admins.authRefresh());
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  const admin = query.data.data;
  const admin_error = query.data.error;

  if (!admin || admin_error) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full flex flex-col gap-3 md:flex-row">
          <AdminCollectionForm
            pb={localPB}
            instanceKey={instances.local.instanceKey}
            instances={instances}
          />
          <AdminCollectionForm
            pb={remotePB}
            instanceKey={instances.remote.instanceKey}
            instances={instances}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Accordion type="single" collapsible className="w-[90%] ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Admin</AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col gap-3 md:flex-row">
                <AdminCollectionForm
                  pb={localPB}
                  instanceKey={instances.local.instanceKey}
                  instances={instances}
                />
                <AdminCollectionForm
                  pb={remotePB}
                  instanceKey={instances.remote.instanceKey}
                  instances={instances}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <CollectionsList localPB={localPB} remotePB={remotePB} />
    </div>
  );
}


interface AdminCollectionFormProps {
  pb: Client;
  instanceKey: keyof PBClientInstances;
  instances: PBClientInstances;
}

export function AdminCollectionForm({
  pb,
  instanceKey,
  instances,
}: AdminCollectionFormProps) {
  const { input, handleChange } = useFormHook({
    initialValues: {
      email: import.meta.env.RAKKAS_PB_ADMIN_EMAIL || "",
      password: import.meta.env.RAKKAS_PB_ADMIN_PASSWORD || "",
    },
  });
  const mutation = useMutation({
    mutationFn: (vars: { email: string; password: string }) => {
      return pbTryCatchWrapper(
        pb.admins.authWithPassword(vars.email, vars.password),
      );
    },
    meta: {
      invalidates: ["collections", instances[instanceKey].instanceKey],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: "Succesfully logged in",
        });
      }
      if (data.error) {
        sonnerToast({
          title: "Login failed",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });
  return (
    <form
      className="w-full px-3"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(input);
      }}
    >
      <PbTheTextInput
        field_key={"email"}
        field_name={"email"}
        type="email"
        val={input.email}
        onChange={handleChange}
      />
      <PbTheTextInput
        field_key={"password"}
        field_name={"password"}
        val={input.password}
        onChange={handleChange}
      />
      <SpinnerButton
        mutation={mutation}
        label="Login"
        className="w-fit md:max-w-[50%] mt-5"
      />
    </form>
  );
}
