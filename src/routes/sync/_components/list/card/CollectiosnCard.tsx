import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import type { CollectionModel } from "pocketbase";
import type Client from "pocketbase";
import { CollectionRecordsInfo } from "./CollectionRecordsCount";
import { Suspense } from "react";
import type { UsePoscketBaseInstance } from "../../type";
import { CloneCollection } from "./CloneCollection";

interface CollectiosnCardProps {
  primaryPB: Client;
  secondaryPB: Client;
  collection: CollectionModel;
  instance: UsePoscketBaseInstance;
}

export function CollectiosnCard({
  primaryPB,
  secondaryPB,
  collection,
  instance,
}: CollectiosnCardProps) {
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
        {/* <Suspense fallback={<div className="h-14 bg-base-100 skeleton" />}>
          <CloneCollection
            collection={collection}
            instance={instance}
            primaryPB={primaryPB}
            secondaryPB={secondaryPB}
          />
        </Suspense> */}

        <div className="w-full flex justify-between gap-2 ">
          <Suspense fallback={<div className="h-14 bg-base-100 skeleton" />}>
            <CollectionRecordsInfo
              pb={primaryPB}
              collectionName={collection.name}
            />
          </Suspense>
        </div>
      </div>
    </li>
  );
}
