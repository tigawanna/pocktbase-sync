import PocketBase, { LocalAuthStore } from "pocketbase";
import type { UsePoscketBaseInstance } from "../type";


export function usePoscketBaseInstance({
  url,
  instanceKey,
}: UsePoscketBaseInstance) {
  return new PocketBase(url, new LocalAuthStore(instanceKey));
}
