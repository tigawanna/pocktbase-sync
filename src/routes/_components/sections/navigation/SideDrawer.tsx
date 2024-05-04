import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { Menu, X } from "lucide-react";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";
import { TooltipWrapper } from "@/components/wrappers/TooltipWrapper";
import { Link } from "rakkasjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";

interface SideDrawerProps {}

export function SideDrawer({}: SideDrawerProps) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className="w-fit min-w-[80%] md:min-w-[30%]  h-full left-0  bg-base-300 ">
        <div className="w-full h-full flex flex-col justify-between items-center  pb-12 relative ">
          <DrawerClose className="absolute bottom-[3%] right-[5%]">
            <X />
          </DrawerClose>

          <MiniSettingsModal triggerClassname="size-16" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
//
