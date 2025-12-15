"use client";

import Link from "next/link";
import useSWR from "swr";
import { useParams } from "next/navigation";
import type { Product } from "@/models/interfaces";
import { fetcher } from "@/lib/fetcher";
import ProdutoDetalhe from "@/components/MagiaDoJSX/ProdutoDetalhe";

const API_DOMAIN = "https://deisishop.pythonanywhere.com";

function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const id = params?.id?.toString();

  const apiUrl = id ? `${API_DOMAIN}/products/${id}` : null;

  const { data, error, isLoading } = useSWR<Product>(
    apiUrl,
    (url: string) => fetcher<Product>(url)
  );

  if (!id) {
    return (
      <div className="space-y-4">
        <p>ID inválido.</p>
        <Link href="/produtos" className="underline">
          Voltar à lista
        </Link>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          <h2 className="text-xl font-bold">Erro a carregar produto</h2>
          <p className="mt-2 text-sm opacity-80">{(error as Error).message}</p>
        </div>

        <Link href="/produtos" className="underline">
          Voltar à lista
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <p>Produto não encontrado.</p>
        <Link href="/produtos" className="underline">
          Voltar à lista
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/produtos" className="underline">
        ← Voltar à lista de produtos
      </Link>

      <ProdutoDetalhe produto={data} />
    </div>
  );
}
