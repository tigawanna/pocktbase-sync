import { ClientSuspense, Link } from "rakkasjs";
import { SideDrawer } from "./SideDrawer";
import { MiniSettingsModal } from "./mini-settings/MiniSettings";
import { SiPocketbase } from "react-icons/si";

interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  return (
    <div className=" sticky top-0 z-30 flex  w-full items-center justify-between bg-inherit p-1">
      <Link href="/" className="p-2 text-2xl hover:text-secondary font-bold">
        <SiPocketbase />
      </Link>
      <div className="hidden items-center justify-end gap-2 px-2 md:flex">
        <ClientSuspense
          fallback={
            <div className="size-9 rounded-full bg-base-300 skeleton " />
          }
        >
          <MiniSettingsModal />
        </ClientSuspense>
      </div>
      {/* sidebar */}

      <div className="relative flex w-full justify-end p-2 md:hidden">
        <ClientSuspense
          fallback={<div className="h-6 bg-base-100 skeleton " />}
        >
          <SideDrawer />
        </ClientSuspense>
      </div>
    </div>
  );
}
