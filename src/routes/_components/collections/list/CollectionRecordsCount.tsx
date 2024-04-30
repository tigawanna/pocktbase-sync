import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type Client from "pocketbase";

interface CollectionRecordsInfoProps {
  pb: Client;
  collectionName: string;
}

export function CollectionRecordsInfo({
  pb,
  collectionName,
}: CollectionRecordsInfoProps) {
  const query = useSuspenseQuery({
    queryKey: ["collections", collectionName],
    queryFn: () => {
      return pbTryCatchWrapper(pb.collection(collectionName).getList(1, 1));
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
    <div className="w-full flex items-centergap-2">
     Total: {total_records}
    </div>
  );
}
