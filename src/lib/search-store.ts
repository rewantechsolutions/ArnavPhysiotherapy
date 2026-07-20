// src/lib/search-store.ts
type State = { open: boolean; query: string };
type Listener = (s: State) => void;

let state: State = { open: false, query: "" };
let listeners: Listener[] = [];

function emit() {
  listeners.forEach((l) => l(state));
}

export function getSearchState() {
  return state;
}

/** Opens the global search dialog, optionally pre-filled with a query */
export function openSearch(query = "") {
  state = { open: true, query };
  emit();
}

export function closeSearch() {
  state = { ...state, open: false };
  emit();
}

export function setSearchQuery(query: string) {
  state = { ...state, query };
  emit();
}

export function subscribeSearch(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}