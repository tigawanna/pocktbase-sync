import { useFormHook } from "@/components/form/useForm";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { useMutation } from "@tanstack/react-query";
import type Client from "pocketbase";

interface PocketbaseInstanceAdminAuthProps {
  pb: Client;
  instanceKey: "primary" | "secondary";
}

export function PocketbaseInstanceAdminSignin({
  pb,
  instanceKey,
}: PocketbaseInstanceAdminAuthProps) {
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
      invalidates: ["collection-admin", instanceKey],
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
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });
  return (
    <form
      className="min-w-[50%] p-3 flex flex-col justify-center items-center"
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

export function PocketbaseInstanceAdminSignout({
  pb,
  instanceKey,
}: PocketbaseInstanceAdminAuthProps) {
  async function logOutAdmin() {
    await pb.authStore.clear();
  }
  const mutation = useMutation({
    mutationFn: () => {
      return pbTryCatchWrapper(logOutAdmin());
    },
    meta: {
      invalidates: ["collection-admin", instanceKey],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: "Succesfully logged out",
        });
      }
      if (data.error) {
        sonnerToast({
          title: "Logout failed",
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });
  return (
    <SpinnerButton
      mutation={mutation}
      onClick={() => mutation.mutate()}
      label="Logout"
    />
  );
}
