import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type Client from "pocketbase";
import { CollectiosnCard } from "./CollectiosnCard";
import type{ UsePoscketBaseInstance } from "../type";

interface CollectionsListProps {
  localPB: Client;
  remotePB: Client;
  instance: UsePoscketBaseInstance;
}

export function CollectionsList({ localPB, remotePB, instance }: CollectionsListProps) {
const query = useSuspenseQuery({
    queryKey: ["collections",localPB.baseUrl],
    queryFn: () => {
      return pbTryCatchWrapper(localPB.collections.getFullList({}));
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
        {collection_list?.map((coll) => {
          return (
            <CollectiosnCard
              key={coll.id}
              localPB={localPB}
              remotePB={remotePB}
              collection={coll}
            />
          );
        })}
      </ul>
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

// <table className="table justify-between">
//   {/* head */}
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Created</th>
//     </tr>
//   </thead>
//   <tbody>
//     {collection_list?.map((coll) => {
//       return (
//         <tr key={coll.id}>

//           <td>{coll.name}</td>
//           <td>{coll.created}</td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
