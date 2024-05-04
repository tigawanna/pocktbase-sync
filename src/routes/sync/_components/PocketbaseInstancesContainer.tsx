import { Suspense} from "react";
import { PocketbaseInstance } from "./PocketbaseInstance";
import { useInstanceStore } from "@/stores/instance-store";
import { PocketbaseInstanceForm } from "./PocketbaseInstanceForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";


interface PocketbaseInstancesContainerProps {}

export function PocketbaseInstancesContainer({}: PocketbaseInstancesContainerProps) {
  const instances = useInstanceStore((state) => state.instance);


  if (!instances) {
    return (
      <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col gap-3 md:flex-row">
          <PocketbaseInstanceForm instanceKey="primary" />
          <PocketbaseInstanceForm instanceKey="secondary" />
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
                <PocketbaseInstanceForm instanceKey="primary" />
                <PocketbaseInstanceForm instanceKey="secondary" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full h-full flex gap-2 *:bg-base-200 *:rounded-lg">
        <Suspense
          fallback={<div className="w-full h-screen bg-base-200 skeleton" />}
        >
          <PocketbaseInstance  instance={instances.primary} />
        </Suspense>
        <Suspense
          fallback={<div className="w-full h-screen bg-base-200 skeleton" />}
        >
          <PocketbaseInstance  instance={instances.secondary} />
        </Suspense>
      </div>
    </div>
  );
}
