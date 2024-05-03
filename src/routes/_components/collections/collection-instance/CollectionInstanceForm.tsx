import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import type { CollectionInstanceType, PBClientInstances } from "./types";

interface CollectionInstanceFormProps {
  instanceKey: keyof PBClientInstances;
  instances: PBClientInstances;
  setInstances: React.Dispatch<React.SetStateAction<PBClientInstances>>;
}

export function CollectionInstanceForm({
  instanceKey,
  instances,
  setInstances,
}: CollectionInstanceFormProps) {


 function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
setInstances((prev) => {
  return {
    ...prev,
    [instanceKey]: {
      ...prev[instanceKey],
      [e.target.name]: e.target.value,
    },
  };
})
  }

  return (
    <form className="w-full px-3 bg-base-100 rounded p-[5%]">
      <h2>{instanceKey}</h2>
      <PbTheTextInput<CollectionInstanceType>
        field_key={"instanceKey"}
        field_name={"Instance key"}
        placeholder="remote or local"
        val={instances[instanceKey].instanceKey}
        onChange={handleChange}
      />
      <PbTheTextInput<CollectionInstanceType>
        field_key={"url"}
        field_name={"Pocketbase URL"}
        val={instances[instanceKey].url}
        onChange={handleChange}
      />
    </form>
  );
}
