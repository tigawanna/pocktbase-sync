import type Client from "pocketbase";
import type { CollectionModel } from "pocketbase";
import { SpinnerButton } from "@/lib/tanstack/components/SpinnerButton";
import { useMutation } from "@tanstack/react-query";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { Trash } from "lucide-react";
import { sonnerToast } from "@/components/shadcn/misc/sonner-taost";

interface CollectionCardDeleteProps {
  primaryPB: Client;
    collection: CollectionModel;
}

export function CollectionCardDelete({
  primaryPB,
  collection,
}: CollectionCardDeleteProps) {
  const deleteCollection = useMutation({
    mutationFn: async () => {
      return pbTryCatchWrapper(primaryPB.collections.delete(collection.id));
    },
    meta:{
        invalidates:["collections","collection-admin"],
    },
    onSuccess: (data) => {
      if (data.data) {
        sonnerToast({
          title: "Succesfully deleted",
        });
      }
      if (data.error) {
        sonnerToast({
          title: "Delete failed",
          type: "error",
          options: {
            description: data.error.message,
          },
        });
      }
    },
  });
  return (
    <div className="w-fit  flex justify-end">
      <SpinnerButton
        type="button"
        variant={"destructive"}
        onClick={() => deleteCollection.mutate()}
        mutation={deleteCollection}
        label={<Trash className="" />}
      />
    </div>
  );
}
