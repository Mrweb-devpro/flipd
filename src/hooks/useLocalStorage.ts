type Key = string;
type Value = unknown;

export function useLocalStorage() {
  const storageGetItem = (key: Key) => localStorage.getItem(key);
  const storageSetItem = (key: Key, value: Value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const storageHasItem = (key: Key) => !!localStorage.getItem(key);

  return { storageGetItem, storageSetItem, storageHasItem };
}
