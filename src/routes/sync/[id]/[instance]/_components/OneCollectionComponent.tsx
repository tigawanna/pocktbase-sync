import { useDynamicPoscketBaseInstance } from "@/routes/sync/_components/utils/use-pocketbase";
import { useInstanceStore } from "@/stores/instance-store";
import { Suspense } from "react";
import { OneCollectionDetails } from "./OneCollectionDetails";

interface OneCollectionComponentProps {
	collectionName: string;
	instance: "primary" | "secondary";
}

export function OneCollectionComponent({
	instance,
	collectionName,
}: OneCollectionComponentProps) {
	const instances = useInstanceStore((state) => state.instance);
	const { primaryPB, secondaryPB } = useDynamicPoscketBaseInstance(
		instances[instance],
	);
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-3">
			<h2 className="text-5xl">{collectionName}</h2>
			<Suspense
				fallback={<div className="h-[200px] w-full bg-base-300 skeleton" />}
			>
				<OneCollectionDetails
					instance={instance}
					primaryPB={primaryPB}
					secondaryPB={secondaryPB}
					collectionName={collectionName}
				/>
			</Suspense>
		</div>
	);
}
