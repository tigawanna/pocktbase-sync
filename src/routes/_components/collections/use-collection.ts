import PocketBase, { LocalAuthStore } from "pocketbase";


interface UseMultiplePocketbase {
    url: string;
    instanceKey:"remote"|"local"
}
export function useMultiplePocketbase({url,instanceKey}: UseMultiplePocketbase) {
    const pb = new PocketBase(
        url,
      new LocalAuthStore(instanceKey),
    );

    return pb;
}
