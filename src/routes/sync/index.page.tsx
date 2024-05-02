import type { PageProps } from "rakkasjs";
import { PocketbaseInstance } from "./_components/PocketbaseInstance";
import { Suspense } from "react";
export default function SyncPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen  flex flex-col items-center justify-center">
      <div className="w-full h-full flex gap-2 *:bg-base-200 *:rounded-lg">
        <Suspense
          fallback={<div className="w-full h-[300px] bg-base-200 skeleton" />}
        >
          <PocketbaseInstance
            instance={{ instanceKey: "primary", url: "http://127.0.0.1:8090" }}
          />
        </Suspense>
        <Suspense
          fallback={<div className="w-full h-[300px] bg-base-200 skeleton" />}
        >
          <PocketbaseInstance
            instance={{
              instanceKey: "secondary",
              url: "https://tigawanna-pocketbase.fly.dev/",
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
