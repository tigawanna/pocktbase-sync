import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { useState } from "react";
import { AdminCollectionContainer } from "./AdminCollectionContainer";

interface CollectionInstanceContainerForm {
  url: string;
  instanceKey: "remote" | "local";
}
export type PBClientInstances = {
  [key in "remote" | "local"]: CollectionInstanceContainerForm;
};

interface CollectionInstanceContainerProps {}

export function CollectionInstanceContainer({}: CollectionInstanceContainerProps) {
  const [instances, setInstances] = useState<PBClientInstances>({
    local: {
      instanceKey: "local",
      url: "http://127.0.0.1:8090",
    },
    remote: {
      instanceKey: "remote",
      url: "https://pocketbase.io/demo",
    },
  });
  const { input, handleChange } = useFormHook<CollectionInstanceContainerForm>({
    initialValues: {
      instanceKey: "local",
      url: "http://127.0.0.1:8090",
    },
  });

  if (!input || !input.instanceKey || !input.url) {
    return (
      <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col gap-3 md:flex-row">
          <CollectionInstanceForm
            instanceKey="local"
            instances={instances}
            setInstances={setInstances}
          />
          <CollectionInstanceForm
            instanceKey="remote"
            instances={instances}
            setInstances={setInstances}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Accordion type="single" collapsible className="w-[90%] ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Instances</AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col gap-3 md:flex-row">
                <CollectionInstanceForm
                  instanceKey="local"
                  instances={instances}
                  setInstances={setInstances}
                />
                <CollectionInstanceForm
                  instanceKey="remote"
                  instances={instances}
                  setInstances={setInstances}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <AdminCollectionContainer instances={instances} />
    </div>
  );
}

interface CollectionInstanceFormProps {
  instanceKey: keyof PBClientInstances;
  instances: PBClientInstances;
  setInstances: React.Dispatch<React.SetStateAction<PBClientInstances>>;
}

export function CollectionInstanceForm({
  instanceKey,
  instances,
  setInstances,
}: CollectionInstanceFormProps) {
  const { input, setInput } = useFormHook<CollectionInstanceContainerForm>({
    initialValues: {
      instanceKey,
      url: instances[instanceKey].url,
    },
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleChange(e);
    setInstances((prev) => ({
      ...prev,
      [instanceKey]: {
        ...prev[instanceKey],
        [e.target.name]: e.target.value,
      },
    }));
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (
    <form className="w-full px-3 bg-base-100 rounded p-[5%]">
      <h2>{instanceKey}</h2>
      <PbTheTextInput<CollectionInstanceContainerForm>
        field_key={"instanceKey"}
        field_name={"Instance key"}
        placeholder="remote or local"
        val={input.instanceKey}
        onChange={handleChange}
      />
      <PbTheTextInput<CollectionInstanceContainerForm>
        field_key={"url"}
        field_name={"Pocketbase URL"}
        val={input.url}
        onChange={handleChange}
      />
    </form>
  );
}
