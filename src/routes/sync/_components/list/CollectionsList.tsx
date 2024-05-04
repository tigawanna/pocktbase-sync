import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type Client from "pocketbase";
import { CollectionsCard} from "./card/CollectionsCard";
import type{ UsePoscketBaseInstance } from "../type";
import { ListPagination } from "@/components/pagination/ReactresponsivePagination";

interface CollectionsListProps {
  primaryPB: Client;
  secondaryPB: Client;
  instance: UsePoscketBaseInstance;
  searchParamKey: string;
  debouncedValue: string;
  searchParam: string;
}

export function CollectionsList({ primaryPB, secondaryPB, instance,debouncedValue,searchParam, searchParamKey }: CollectionsListProps) {
  const page = debouncedValue.length > 0 ? 1 : searchParam;
  const query = useSuspenseQuery({
    queryKey: ["collections",primaryPB.baseUrl,debouncedValue,page],
    queryFn: () => {
      return pbTryCatchWrapper(primaryPB.collections.getList(+page,12,{
        sort: "-name",
        filter: `name ~ "${debouncedValue}"`,
      }));
    },
    staleTime: 1000 * 60 * 60 * 24,
  });

  const collection_list = query.data.data;
  const collection_error = query.data.error;
  if (collection_error) {
    return (
      <div className="w-full min-h-screen h-full flex flex-col items-center justify-center">
        <div className="p-5 bg-error-content text-error rounded-lg">
          {collection_error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen h-full flex flex-col  ">
      <ul className="w-full h-full flex flex-wrap  gap-2">
        {collection_list?.items?.map((coll) => {
          return (
            <CollectionsCard
              key={coll.id}
              primaryPB={primaryPB}
              secondaryPB={secondaryPB}
              collection={coll}
              instance={instance}
              collectionName={coll.name}
            />
          );
        })}
      </ul>
      <div className=" w-full">
        <ListPagination
          query_key={searchParamKey}
          total_pages={query?.data?.data?.totalPages ?? 1}
        />
      </div>
    </div>
  );
}



export function CollectionsListSuspenseFallback(){
return (
  <ul className="w-full h-full flex flex-wrap  gap-2">
    {Array.from({ length: 10 }).map((_, i) => {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <li key={i} className="relative h-44 w-[95%] flex flex-col justify-between bg-base-300 p-2 gap-2 rounded-lg group" />
      ); 
    })}
  </ul>
);
}


