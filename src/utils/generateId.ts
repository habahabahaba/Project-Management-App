export default function generateId(): string {
  const now = Date.now().toString().slice(5);
  const rand = Math.random().toFixed(5).toString().slice(2);

  console.log("[generateId]", "now:", now, "rand:", rand);

  return `${now}-${rand}`;
}
