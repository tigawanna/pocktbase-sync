import { create } from "zustand";
import { persist } from "zustand/middleware";

type PBInstanceType = {
  instance: {
    primary: {
      instanceKey: "primary";
      url: string;
    };
    secondary: {
      instanceKey: "secondary";
      url: string;
    };
  };
updateInstance: (key: "primary" | "secondary", url: string) => void;
};

export const useInstanceStore = create<PBInstanceType>()(
  persist(
    (set, get) => ({
      instance: {
        primary: {
          instanceKey: "primary",
          url: "http://127.0.0.1:8090",
        },
        secondary: {
          instanceKey: "secondary",
          url: "https://pocketbase.io/demo",
        },
      },

      updateInstance: (key: "primary" | "secondary", url: string) => {
        set((state: PBInstanceType) => {
          return {
            instance: {
              ...state.instance,
              [key]: {
                ...state.instance[key],
                url,
              },
            },
          };
        });
      },
    }),
    {
      name: "instance-storage", // name of item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    },
  ),
);
