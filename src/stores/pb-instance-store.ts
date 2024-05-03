import { create, useStore } from "zustand";
import PocketBase, { LocalAuthStore } from "pocketbase";
import type Client from "pocketbase";
import { useInstanceStore } from "./instance-store";

interface PocketbaseState {
  primaryPB: Client;
  secondaryPB: Client;
}
const instances = () => useStore(useInstanceStore, (state) => state.instance);



export const usePocketbaseStore = create<PocketbaseState>()((set) => ({
  primaryPB: new PocketBase(
    instances().primary.url,
    new LocalAuthStore("primary"),
  ),
  secondaryPB: new PocketBase(
    instances().secondary.url,
    new LocalAuthStore("secondary"),
  ),
}));
