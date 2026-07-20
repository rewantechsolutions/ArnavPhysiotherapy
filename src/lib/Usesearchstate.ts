import { useSyncExternalStore } from "react";
import { getSearchState, subscribeSearch } from "./search-store";

export function useSearchState() {
  return useSyncExternalStore(subscribeSearch, getSearchState, getSearchState);
}
