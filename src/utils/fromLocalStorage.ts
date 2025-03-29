export default function fromLocalStorage<T>(key: string): T | false {
  const serializedData = localStorage.getItem(key);
  if (!serializedData) return false;

  const data = JSON.parse(serializedData) as T;
  if (!data) return false;

  console.log(`[fromLocalStorage] key: ${key}
    data: ${serializedData}`);

  return data;
}
