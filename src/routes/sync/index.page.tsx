import type { PageProps } from "rakkasjs";
import { PocketbaseInstancesContainer } from "./_components/PocketbaseInstancesContainer";
export default function SyncPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen  flex flex-col items-center justify-center">
      <div className="w-full h-full flex gap-2 p-1 *:bg-base-200 ">
        <PocketbaseInstancesContainer/>
      </div>
    </div>
  );
}
