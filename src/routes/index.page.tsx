import type{ PageProps } from "rakkasjs";
import { CollectionInstanceContainer } from "./_components/collections/collection-instance/CollectionInstanceContainer";


export default function HomePage({}: PageProps) {
  
  return (
    <main className="flex h-full min-h-screen pb-4 ">
      <CollectionInstanceContainer/>
    </main>
  );
}
