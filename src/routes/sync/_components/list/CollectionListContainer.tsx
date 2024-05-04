import { SearchBox } from "@/components/search/SearchBox";
import { useDebouncedSearchWithhParams } from "@/utils/hooks/search";
import { useCustomSearchParams } from "@/utils/hooks/use-custom-search-params";
import { Suspense } from "react";
import { CollectionsListSuspenseFallback, CollectionsList } from "./CollectionsList";
import type Client from "pocketbase";
import type { UsePoscketBaseInstance } from "../type";

interface CollectionListContainerProps {
  primaryPB: Client;
  secondaryPB: Client;
  instance: UsePoscketBaseInstance;
}

export function CollectionListContainer({instance,primaryPB,secondaryPB}: CollectionListContainerProps) {
	const searchParamKey = "cool";
	const { isDebouncing, debouncedValue, setKeyword, keyword } =
		useDebouncedSearchWithhParams({ default_search_query: "" });
	const { searchParam } = useCustomSearchParams({
		key: searchParamKey,
		defaultValue: "1",
	});
	return (
    <div className="w-full h-full flex flex-col gap-2 ">
      <div className="px-3 flex flex-col md:flex-row justify-between gap-3 pr-5">
        <SearchBox
          inputProps={{
            placeholder: "Search through projects",
          }}
          debouncedValue={debouncedValue}
          isDebouncing={isDebouncing}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </div>
      <div className="w-full o">
        <Suspense fallback={<CollectionsListSuspenseFallback />}>
          <CollectionsList
            instance={instance}
            primaryPB={primaryPB}
            secondaryPB={secondaryPB}
            searchParamKey={searchParamKey}
            debouncedValue={debouncedValue}
            searchParam={searchParam}
          />
        </Suspense>
      </div>
    </div>
  );
}
