import { PBTimeStamp } from "@/lib/pb/components/PBTimestamp";
import type { CollectionModel } from "pocketbase";
import type Client from "pocketbase";
import { CollectionRecordsInfo } from "./CollectionRecordsCount";
import { Suspense } from "react";
import type { UsePoscketBaseInstance } from "../../type";
import { CloneCollection } from "./CloneCollection";
import { Link } from "rakkasjs";

interface CollectionsCardProps {
  primaryPB: Client;
  secondaryPB: Client;
  collection: CollectionModel;
  instance: UsePoscketBaseInstance;
  collectionName: string;
}

export function CollectionsCard({
  primaryPB,
  secondaryPB,
  collection,
  collectionName,
  instance,
}: CollectionsCardProps) {
  return (
    <li
      key={collection.id}
      className={
        "relative w-[95%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group"
      }
    >
      <Link
        className="text-2xl hover:link-hover hover:text-secondary-content"
        href={`/sync/${collection.name}/${instance.instanceKey}`}
      >
        {collection.name}
      </Link>
      <div className="w-full flex flex-col justify-between gap-2 ">
        <PBTimeStamp
          timestamp={collection.created}
          label="Created"
          className="w-full justify-start"
        />
        <Suspense fallback={<div className="h-14 bg-base-100 skeleton" />}>
          <CloneCollection
            collection={collection}
            instance={instance}
            primaryPB={primaryPB}
            secondaryPB={secondaryPB}
          />
        </Suspense>

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
