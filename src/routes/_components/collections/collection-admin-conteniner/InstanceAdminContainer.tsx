import { useSuspenseQuery } from "@tanstack/react-query";
import { useMultiplePocketbase } from "../use-collection";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { CollectionsList } from "../list/CollectionsList";
import type { PBClientInstances } from "../collection-instance/types";
import { Trash } from "lucide-react";
import { SigninInstanceAdmin, SignoutInstanceAdmin } from "./InstanceAdminAuth";

interface InstanceAdminContainerProps {
  instances: PBClientInstances;
}

export function InstanceAdminContainer({
  instances,
}: InstanceAdminContainerProps) {
  const localPB = useMultiplePocketbase({
    instanceKey: instances.local.instanceKey,
    url: instances.local.url,
  });
  const remotePB = useMultiplePocketbase({
    instanceKey: instances.remote.instanceKey,
    url: instances.remote.url,
  });

  const local_admin_query = useSuspenseQuery({
    queryKey: ["collection-admin", instances.local.instanceKey],
    queryFn: () => {
      return pbTryCatchWrapper(localPB.admins.authRefresh());
    },
    staleTime: 1000 * 60 * 60,
  });

  const remote_admin_query = useSuspenseQuery({
    queryKey: ["collection-admin", instances.remote.instanceKey],
    queryFn: () => {
      return pbTryCatchWrapper(localPB.admins.authRefresh());
    },
    staleTime:1000*60*60
 
  });

  // local admin
  const local_admin = local_admin_query.data.data;
  const local_admin_error = local_admin_query.data.error;
  // remote_admin_query
  const remote_admin = remote_admin_query.data.data;
  const remote_admin_error = remote_admin_query.data.error;

  // if (!local_admin || local_admin_error) {
  //   return (
  //     <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4">
  //       <div className="w-full flex flex-col gap-3 ">
  //         <h2>login {instances.local.instanceKey} admin</h2>
  //         <SigninInstanceAdmin
  //           pb={localPB}
  //           instanceKey={instances.local.instanceKey}
  //           instances={instances}
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  // if (!remote_admin || remote_admin_error) {
  //   return (
  //     <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4">
  //       <div className="w-full flex flex-col gap-3 ">
  //         <h2>login {instances.remote.instanceKey} admin</h2>
  //         <SigninInstanceAdmin
  //           pb={remotePB}
  //           instanceKey={instances.remote.instanceKey}
  //           instances={instances}
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  console.log("local_admin", local_admin);
  console.log("remote_admin", remote_admin);
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Accordion type="single" collapsible className="w-[90%] ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Admin</AccordionTrigger>
            <AccordionContent>
              <div className="w-full flex flex-col gap-3 md:flex-row">
                {local_admin ? (
                  <SignoutInstanceAdmin
                    pb={localPB}
                    instanceKey={instances.local.instanceKey}
                    instances={instances}
                  />
                ) : (
                  <SigninInstanceAdmin
                    pb={localPB}
                    instanceKey={instances.local.instanceKey}
                    instances={instances}
                  />
                )}
                {remote_admin ? (
                  <SignoutInstanceAdmin
                    pb={remotePB}
                    instanceKey={instances.remote.instanceKey}
                    instances={instances}
                  />
                ) : (
                  <SigninInstanceAdmin
                    pb={remotePB}
                    instanceKey={instances.remote.instanceKey}
                    instances={instances}
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <CollectionsList localPB={localPB} remotePB={remotePB} />
    </div>
  );
}

