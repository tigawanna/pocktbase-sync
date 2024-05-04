import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { Button } from "@/components/shadcn/ui/button";
import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { useMutation, useSuspenseQueries } from "@tanstack/react-query";
import { FileWarningIcon, MessageCircleWarning } from "lucide-react";
import type Client from "pocketbase";
import type { CollectionModel } from "pocketbase";
import { FaClone } from "react-icons/fa";

interface OneCollectionDetailsProps {
  primaryPB: Client;
  secondaryPB: Client;
  collectionName: string;
  instance: "primary" | "secondary";
}

export function OneCollectionDetails({
  collectionName,
  primaryPB,
  secondaryPB,
  instance,
}: OneCollectionDetailsProps) {
  const query = useSuspenseQueries({
    queries: [
      {
        queryKey: ["collection", "primary", collectionName],
        queryFn: () => {
          return pbTryCatchWrapper(
            primaryPB.collections.getOne(collectionName),
          );
        },
      },
      {
        queryKey: ["collection", "secondary", collectionName],
        queryFn: () => {
          return pbTryCatchWrapper(
            secondaryPB.collections.getOne(collectionName),
          );
        },
      },
    ],
  });

  const import_collection_to_secondary_mutation = useMutation({
    mutationFn: async (collections: CollectionModel[]) => {
      return pbTryCatchWrapper(
        secondaryPB.collections.import(collections, false),
      );
    },
    meta: {
      invalidates: ["collection"],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: `${collectionName} Succesfully imported`,
        });
      }
      if (data.error) {
        sonnerToast({
          title: `Error importing ${collectionName}`,
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });

  const primaryCollection = query[0].data.data;
  const secondaryCollection = query[1].data.data;

  if (!secondaryCollection) {
    return (
      <div className="p-[3%] h-full min-h-[40vh] flex flex-col items-center justify-center gap-5 bg-base-300 rounded-md">
        <span className="text-xl flex gap-2 justify-center text-warning-content">
          <FileWarningIcon className="text-warning" />
          This collection doesn't exist in the other pocketbase instance
        </span>
        {primaryCollection && (
          <SpinnerButton
            onClick={() =>
              import_collection_to_secondary_mutation.mutate([
                primaryCollection,
              ])
            }
            mutation={import_collection_to_secondary_mutation}
            label={
              <span className="flex gap-2 items-center justify-center ">
                <FaClone /> clone {collectionName}
              </span>
            }
          />
        )}
      </div>
    );
  }

  if (!primaryCollection) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ErrorOutput
          error={
            new Error("Something went wrong, this collection doesn't exist")
          }
        />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {primaryCollection.name}
    </div>
  );
}
