import { useFormHook } from "@/components/form/useForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { useState } from "react";

import { CollectionInstanceForm } from "./CollectionInstanceForm";
import type { CollectionInstanceType, PBClientInstances } from "./types";
import { InstanceAdminContainer } from "../collection-admin-conteniner/InstanceAdminContainer";

type CollectionInstanceContainerForm = CollectionInstanceType;

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

  if (!instances) {
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
      <InstanceAdminContainer instances={instances} />
    </div>
  );
}
