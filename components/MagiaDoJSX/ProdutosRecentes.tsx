import { useEffect, useState } from "react";

function readRecents(): string[] {
  const guardado = localStorage.getItem("recent_products_v1");
  return guardado ? JSON.parse(guardado) : [];
}

export function useProdutosRecentes() {
  const [recentes, setRecentes] = useState<string[]>([]);

  useEffect(() => {
    setRecentes(readRecents());
  }, []);

  const adicionarProduto = (produtoId: string) => {
    const atuais = readRecents();
    const novos = [produtoId, ...atuais.filter((id) => id !== produtoId)].slice(0, 5);
    localStorage.setItem("recent_products_v1", JSON.stringify(novos));
    setRecentes(novos);
  };

  return { recentes, adicionarProduto };
}