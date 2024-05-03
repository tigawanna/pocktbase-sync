import PocketBase, { LocalAuthStore } from "pocketbase";
import type { UsePoscketBaseInstance } from "../type";
import { useInstanceStore } from "@/stores/instance-store";


export function usePoscketBaseInstance({
  url,
  instanceKey,
}: UsePoscketBaseInstance) {
  return new PocketBase(url, new LocalAuthStore(instanceKey));
}

