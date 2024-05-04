import type { PageProps } from "rakkasjs";
import { PocketbaseInstancesContainer } from "./sync/_components/PocketbaseInstancesContainer";

export default function HomePage({}: PageProps) {
  return (
    <main className="flex h-full min-h-screen p-4 ">
      <PocketbaseInstancesContainer />
    </main>
  );
}
