export interface UsePoscketBaseInstance {
  url: string;
  instanceKey: "primary" | "secondary";
}

export type PoscketBaseInstanceType = {
  primary: {
    instanceKey: "primary";
    url: string;
  }
  secondary: {
    instanceKey: "secondary";
    url: string;
  }
}
