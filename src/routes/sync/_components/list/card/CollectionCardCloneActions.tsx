import type Client from "pocketbase";
import type { CollectionModel } from "pocketbase";
import type { UsePoscketBaseInstance } from "../../type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useMutation,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { CollectionRecordsInfo } from "./CollectionRecordsCount";

interface CollectionCardCloneActionsProps {
  primaryPB: Client;
  secondaryPB: Client;
  collection: CollectionModel;
  instance: UsePoscketBaseInstance;
}

export function CollectionCardCloneActions({
  collection,
  instance,
  primaryPB,
  secondaryPB,
}: CollectionCardCloneActionsProps) {
  const record_counts = useSuspenseQueries({
    queries: [
      {
        queryKey: [
          "collections",
          "primary",
          "cound",
          primaryPB.baseUrl,
          collection.id,
        ],
        queryFn: () => {
          return pbTryCatchWrapper(
            primaryPB.collection(collection.name).getList(1, 1, {
              sort: "-created",
            }),
          );
        },
      },
      {
        queryKey: [
          "collections",
          "secondary",
          "cound",
          secondaryPB.baseUrl,
          collection.id,
        ],
        queryFn: () => {
          return pbTryCatchWrapper(
            secondaryPB.collection(collection.name).getList(1, 1, {
              sort: "-created",
            }),
          );
        },
      },
    ],
  });

  const secondary_pb_query = useSuspenseQuery({
    queryKey: ["collections", secondaryPB.baseUrl, collection.id],
    queryFn: () => {
      return pbTryCatchWrapper(secondaryPB.collections.getOne(collection.id));
    },
  });

  const import_collection_mutation = useMutation({
    mutationFn: async (collections: CollectionModel[]) => {
      return pbTryCatchWrapper(
        secondaryPB.collections.import(collections, false),
      );
    },
    meta: {
      invalidates: ["collections", "collection"],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: `${collection.name} Succesfully imported`,
        });
      }
      if (data.error) {
        sonnerToast({
          title: `Error importing ${collection.name}`,
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });
  const push_data_to_secondary_mutation = useMutation({
    mutationFn: async (collections: CollectionModel[]) => {
      secondaryPB.autoCancellation(false);
      const collectionData = await pbTryCatchWrapper(
        primaryPB.collection(collection.name).getFullList(),
      );

      if (!collectionData || !collectionData.data)
        throw new Error("No data founfd in primary pb");
      if (collectionData.error)
        throw new Error("Error getting data in primary pb");
      const collectionsToImport = collectionData.data.map((coll) => {
        return secondaryPB.collection(collection.name).create(coll);
      });

      const successfullyImported = await Promise.allSettled(
        collectionsToImport,
      ).then((results) => {
        return {
          succeded: results.filter((result) => result.status === "fulfilled"),
          rejected: results.filter((result) => result.status === "rejected"),
        };
      });

      return {
        data: successfullyImported.succeded as any,
        error: successfullyImported.rejected as any,
      };
    },
    meta: {
      invalidates: ["collections", "collection"],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: `${collection.name} Data succesfully pushed to secondary`,
        });
      }
      if (data.error) {
        console.log(
          " ==================== ERROR downloading ==============",
          data.error,
        );
      }
    },
  });

  const collection_exist_in_secondary = secondary_pb_query.data?.data;
  const primary_total_items = record_counts[0].data.data?.totalItems ?? 0;
  const secondaryy_total_items = record_counts[1].data.data?.totalItems ?? 0;
  const show_push_data_button =
    collection_exist_in_secondary &&
    secondaryy_total_items < primary_total_items;
  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <div className="w-full  flex flex-col items-center justify-center">
        {!collection_exist_in_secondary && collection && (
          <SpinnerButton
            variant={"outline"}
            onClick={() => import_collection_mutation.mutate([collection])}
            mutation={import_collection_mutation}
            label={
              <div className="flex gap-1 justify-center">
                {instance.instanceKey === "primary" ? (
                  <span className="flex gap-2 justify-center items-center">
                    clone {collection.name} <ChevronRight />
                  </span>
                ) : (
                  <span className="flex gap-2 justify-center items-center">
                    <ChevronLeft /> clone {collection.name}
                  </span>
                )}
              </div>
            }
          />
        )}

        {show_push_data_button && (
          <SpinnerButton
            variant={"outline"}
            onClick={() => push_data_to_secondary_mutation.mutate([collection])}
            mutation={push_data_to_secondary_mutation}
            label={
              <div className="flex gap-1 justify-center">
                {instance.instanceKey === "primary" ? (
                  <span className="flex gap-2 justify-center items-center">
                    push data <ChevronRight />
                  </span>
                ) : (
                  <span className="flex gap-2 justify-center items-center">
                    <ChevronLeft /> push data
                  </span>
                )}
              </div>
            }
          />
        )}
      </div>
      <div className="w-full flex flex-col ">
        <CollectionRecordsInfo
          instance="primary"
          data={record_counts[0].data.data}
        />
        <CollectionRecordsInfo
          instance="secondary"
          data={record_counts[1].data.data}
        />
      </div>
    </div>
  );
}
