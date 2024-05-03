import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type Client from "pocketbase";
import { TimeCompponent } from "@/components/wrappers/TimeCompponent";
import { History } from "lucide-react";

interface CollectionRecordsInfoProps {
  pb: Client;
  collectionName: string;
}

export function CollectionRecordsInfo({
  pb,
  collectionName,
}: CollectionRecordsInfoProps) {
  const query = useSuspenseQuery({
    queryKey: ["collections", collectionName, pb.baseUrl],
    queryFn: () => {
      return pbTryCatchWrapper(
        pb.collection(collectionName).getList(1, 1, {
          sort: "-created",
        }),
      );
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
  const data = query.data?.data;
  const count_records_error = query.data?.error;
  const total_records = data?.totalItems;

  if (count_records_error) {
    return null;
  }
  return (
    <div className="w-full flex items-center justify-betweengap-2">
      <div className="w-full"> Total: {total_records}</div>
      {data?.items[0]?.created && (
        <div className="w-full flex gap-1 text-sm  items-center">
          <History className="size-4" />
          <TimeCompponent
            className=""
            relative
            time={data?.items[0]?.created}
          />
        </div>
      )}
    </div>
  );
}
