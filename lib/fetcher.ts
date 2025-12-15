export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    let extra = "";
    try {
      const data = await res.json();
      extra = data?.detail ? ` - ${data.detail}` : "";
    } catch {
    }
    throw new Error(`Erro ${res.status} ao pedir ${url}${extra}`);
  }

  return res.json() as Promise<T>;
}
