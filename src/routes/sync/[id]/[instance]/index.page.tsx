import type { PageProps } from "rakkasjs";
import { OneCollectionComponent } from "./_components/OneCollectionComponent";
export default function OneInstanceCollectionPage({ params }: PageProps) {
  return (
    <div className="w-full h-full  min-h-screen  flex flex-col items-center ">
      <OneCollectionComponent instance={params.instance as any} collectionName={params.id}/>
    </div>
  );
}
