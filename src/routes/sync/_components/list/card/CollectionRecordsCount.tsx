import { TimeCompponent } from "@/components/wrappers/TimeCompponent";
import { History } from "lucide-react";
import type { ListResult, RecordModel } from "pocketbase";

interface CollectionRecordsInfoProps {
  data: ListResult<RecordModel> | null;
  instance:"primary" | "secondary"
}

export function CollectionRecordsInfo({ data,instance }: CollectionRecordsInfoProps) {
  const total_records = data?.totalItems;

  return (
    <div className="w-full flex items-center justify-between gap-0.5 text-xs">
      <div className="w-full">
          total in {instance}: {total_records}
      </div>
      {data?.items[0]?.created && (
        <div className="w-full flex   items-center">
          <History className="size-3" />
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
