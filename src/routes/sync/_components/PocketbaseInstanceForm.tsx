import { PbTheTextInput } from "@/lib/pb/components/form/input-parts/PBTheTextInput";
import type { UsePoscketBaseInstance } from "./type";
import { useInstanceStore } from "@/stores/instance-store";

interface PocketbaseInstanceFormProps {
  instanceKey: UsePoscketBaseInstance["instanceKey"];
}

export function PocketbaseInstanceForm({
  instanceKey,
}: PocketbaseInstanceFormProps) {
  const instances = useInstanceStore((state) => state.instance);
  const updateInstance = useInstanceStore((state) => state.updateInstance);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateInstance(instanceKey, e.target.value);
  }
  return (
    <form className="w-full  rounded px-5">
      <PbTheTextInput
        field_key={"url"}
        field_name={`${instanceKey} pocketbase url`}
        val={instances[instanceKey].url}
        onChange={handleChange}
      />
    </form>
  );
}
