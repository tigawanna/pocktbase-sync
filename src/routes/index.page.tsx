import type{ PageProps } from "rakkasjs";
import { CollectionInstanceContainer } from "./_components/collections/CollectionInstanceContainer";


export default function HomePage({}: PageProps) {
  
  return (
    <main className="flex h-fit w-full flex-col  items-center ">
      <CollectionInstanceContainer/>
    </main>
  );
}
