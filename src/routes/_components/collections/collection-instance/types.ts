export interface CollectionInstanceType{
  url: string;
  instanceKey: "remote" | "local";
}
export type PBClientInstances = {
  [key in "remote" | "local"]: CollectionInstanceType;
};
