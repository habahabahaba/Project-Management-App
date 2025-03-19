export default function generateId(): string {
  const rand = Math.random().toFixed(5).toString().slice(2);
  const now = Date.now().toString().slice(5);

  console.log('rand: ', rand);
  console.log('now: ', now);

  return `${rand}-${now}`;
}
