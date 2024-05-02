import PocketBase, { LocalAuthStore } from "pocketbase";

interface UseMultiplePocketbase {
  url: string;
  instanceKey: "remote" | "local";
}
export function useMultiplePocketbase({
  url,
  instanceKey,
}: UseMultiplePocketbase) {
  return new PocketBase(url, new LocalAuthStore(instanceKey));
}
