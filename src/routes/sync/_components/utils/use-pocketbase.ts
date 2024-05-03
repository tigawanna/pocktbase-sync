import PocketBase, { LocalAuthStore } from "pocketbase";
import type { UsePoscketBaseInstance } from "../type";
import { useInstanceStore } from "@/stores/instance-store";

export function usePoscketBaseInstance({
  url,
  instanceKey,
}: UsePoscketBaseInstance) {
  return new PocketBase(url, new LocalAuthStore(instanceKey));
}

export function useDynamicPoscketBaseInstance({
  instanceKey
}:{instanceKey:"primary"|"secondary"}) {
  const instances = useInstanceStore((state) => state.instance);
  if (instanceKey === "secondary")
    return {
      primaryPB: new PocketBase(
        instances.secondary.url,
        new LocalAuthStore("secondary"),
      ),
      secondaryPB: new PocketBase(
        instances.primary.url,
        new LocalAuthStore("primary"),
      ),
    };
  return {
    primaryPB: new PocketBase(
      instances.primary.url,
      new LocalAuthStore("primary"),
    ),
    secondaryPB: new PocketBase(
      instances.secondary.url,
      new LocalAuthStore("secondary"),
    ),
  };
}
