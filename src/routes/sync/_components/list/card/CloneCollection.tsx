import type Client from "pocketbase";
import type { CollectionModel } from "pocketbase";
import type { UsePoscketBaseInstance } from "../../type";
import { ChevronLeft, ChevronRight, FileWarning } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";

interface CloneCollectionProps {
  primaryPB: Client;
  secondaryPB: Client;
  collection: CollectionModel;
  instance: UsePoscketBaseInstance;
}

export function CloneCollection({
  collection,
  instance,
  primaryPB,
  secondaryPB,
}: CloneCollectionProps) {
  const secondary_pb_query = useSuspenseQuery({
    queryKey: ["collection", secondaryPB.baseUrl, collection.id],
    queryFn: () => {
      return pbTryCatchWrapper(
        secondaryPB
          .collection(collection.id)
          .getFirstListItem(`name=${collection.name}`),
      );
    },
  });
  const collection_exist_in_secondary = secondary_pb_query.data?.data;
  console.log("secondary_pb_query ", collection_exist_in_secondary);

  if(!collection_exist_in_secondary) 
    return(
      <div className="w-full  flex flex-col items-center justify-center">
        <button type="button" className="flex gap-1 justify-center">
          <FileWarning/>
          <span>Clone</span>
        </button>
      </div>
    )

  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <button type="button" className="flex gap-1 justify-center">
        {instance.instanceKey === "primary" ? (
          <ChevronRight />
        ) : (
          <ChevronLeft />
        )}
      </button>
    </div>
  );
}
