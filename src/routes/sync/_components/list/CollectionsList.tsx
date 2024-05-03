import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import type Client from "pocketbase";
import { CollectiosnCard } from "./CollectiosnCard";

interface CollectionsListProps {
  localPB: Client;
  remotePB: Client;
}

export function CollectionsList({ localPB, remotePB }: CollectionsListProps) {
  const query = useSuspenseQuery({
    queryKey: ["collections"],
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
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center ">
      <ul className="w-full h-full flex flex-wrap items-center justify-center gap-2">
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
