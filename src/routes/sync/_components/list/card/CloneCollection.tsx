import type Client from "pocketbase";
import type { CollectionModel } from "pocketbase";
import type { UsePoscketBaseInstance } from "../../type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { FaClone } from "react-icons/fa";

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
    queryKey: ["collections", secondaryPB.baseUrl, collection.id],
    queryFn: () => {
      return pbTryCatchWrapper(
        secondaryPB
          .collections
          .getOne(collection.id)
      );
    },
  });
  const import_collection_to_secondary_mutation = useMutation({
    mutationFn: async (collections: CollectionModel[]) => {
      return pbTryCatchWrapper(
        secondaryPB.collections.import(collections, false),
      );
    },
    meta: {
      invalidates: ["collections","collection"],
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

  const collection_exist_in_secondary = secondary_pb_query.data?.data;




  return (
    <div className="w-full  flex flex-col items-center justify-center">
      <div className="w-full  flex flex-col items-center justify-center">
        {!collection_exist_in_secondary && collection && (
          <SpinnerButton
            variant={"outline"}
            onClick={() =>
              import_collection_to_secondary_mutation.mutate([collection])
            }
            mutation={import_collection_to_secondary_mutation}
            label={
              <span className="flex gap-2 items-center justify-center ">
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
                </div>{" "}
              </span>
            }
          />
        )}
      </div>
    </div>
  );
}
