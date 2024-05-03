import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import type { CollectionModel } from "pocketbase";
import type Client from "pocketbase";
import { CollectionRecordsInfo } from "./CollectionRecordsCount";
import { Suspense } from "react";

interface CollectiosnCardProps {
  localPB: Client;
  remotePB: Client;
  collection: CollectionModel;
}

export function CollectiosnCard({ localPB,remotePB, collection }: CollectiosnCardProps) {
  const checked = false;
  return (
    <li
      key={collection.id}
      className={
        "relative w-[95%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
      }
    >
      <h2 className="text-2xl "> {collection.name}</h2>
      <div className="w-full flex flex-col justify-between gap-2 ">
        <PBTimeStamp
          timestamp={collection.created}
          label="Created"
          className="w-full justify-start"
        />
        <div className="w-full flex justify-between gap-2 ">
          <Suspense fallback={<div className="h-14 bg-base-100 skeleton" />}>
            <CollectionRecordsInfo
              pb={localPB}
              collectionName={collection.name}
            />
          </Suspense>
        </div>
      </div>
    </li>
  );
}
