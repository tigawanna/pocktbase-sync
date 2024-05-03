import { useSuspenseQuery } from "@tanstack/react-query";
import type { UsePoscketBaseInstance } from "./type";
import { usePoscketBaseInstance } from "./utils/use-pocketbase";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import {
  PocketbaseInstanceAdminSignin,
  PocketbaseInstanceAdminSignout,
} from "./PocketbaseInstanceAuth";

interface PocketbaseInstanceProps {
  instance: UsePoscketBaseInstance;
}

export function PocketbaseInstance({ instance }: PocketbaseInstanceProps) {
  const pb = usePoscketBaseInstance(instance);
  const query = useSuspenseQuery({
    queryKey: ["collection-admin", instance.instanceKey],
    queryFn: () => {
      return pbTryCatchWrapper(pb.admins.authRefresh());
    },
    staleTime: 1000 * 60 * 60,
  });
  const admin = query.data?.data;

  if (!admin) {
    return (
      <div className="w-full h-full p-3 flex flex-col items-center justify-center ">
        <PocketbaseInstanceAdminSignin
          pb={pb}
          instanceKey={instance.instanceKey}
        />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="w-full flex flex-col md:flex-row  gap-2 p-[3%] justify-center items-center ">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="">{admin.admin.email}</div>
          <div className="text-sm line-clamp-1">{pb.baseUrl}</div>
        </div>
        <div className="w-full flex justify-center items-center  ">
          <PocketbaseInstanceAdminSignout
            pb={pb}
            instanceKey={instance.instanceKey}
          />
        </div>
      </div>
    </div>
  );
}
