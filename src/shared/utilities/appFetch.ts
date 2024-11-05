export async function appFetch<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);
  const json = await response.json();
  if (!response.ok) throw new Error(json.error.message);
  return json.data;
}
