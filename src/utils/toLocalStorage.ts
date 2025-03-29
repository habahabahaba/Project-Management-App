export default function toLocalStorage<T extends object>(
  key: string,
  data: T,
): string | false {
  if (!key) return false; // for empty string;
  const serializedData = JSON.stringify(data);
  if (!serializedData || typeof serializedData !== "string") return false;

  localStorage.setItem(key, serializedData);

  console.log(`[toLocalStorage] key: ${key}
data: ${serializedData}`);

  return key;
}
