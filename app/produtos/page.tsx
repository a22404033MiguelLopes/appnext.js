"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import type { Product } from "@/models/interfaces";
import { fetcher } from "@/lib/fetcher";
import ProdutoCard from "@/components/MagiaDoJSX/ProdutoCard";
import { useProdutosRecentes } from "@/components/MagiaDoJSX/ProdutosRecentes";

const API_URL = "https://deisishop.pythonanywhere.com/products/";
const CART_KEY = "cart";

function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
    </div>
  );
}

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const [cart, setCart] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [student, setStudent] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [buying, setBuying] = useState(false);
  const [buyResponse, setBuyResponse] = useState<any>(null);
  const [buyError, setBuyError] = useState<string | null>(null);

  const { recentes, adicionarProduto } = useProdutosRecentes();

  const handleInfo = (p: Product) => {
    adicionarProduto(String(p.id));
  };

  const recentesProdutos = useMemo(() => {
    if (!data) return [];
    return recentes.map((id) => data.find((p) => String(p.id) === String(id))).filter(Boolean) as Product[];
  }, [recentes, data]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!data) return;

    const normalizedSearch = search.toLowerCase();

    let filtered = data.filter((p) =>
      p.title.toLowerCase().includes(normalizedSearch)
    );

    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }

    setFilteredData(filtered);
  }, [search, sortOption, data]);

  const addToCart = (p: Product) => {
    setCart((prev) => [...prev, p]);
  };

  const removeFromCart = (p: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  const total = useMemo(() => {
    return cart.reduce((sum, p) => sum + Number(p.price), 0);
  }, [cart]);

  const buy = async () => {
    setBuying(true);
    setBuyError(null);
    setBuyResponse(null);

    if (!name.trim()) {
      setBuyError("Por favor, introduz o teu nome.");
      setBuying(false);
      return;
    }

    const usedName = name.trim();
    setBuyerName(usedName);

    try {
      const res = await fetch("/api/deisishop/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart.map((p) => p.id),
          name: usedName,
          student: student,
          coupon: coupon,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || res.statusText);
      }

      const json = await res.json();
      setBuyResponse(json);
      setCart([]);
      setCoupon("");
      setStudent(false);
      setName("");
    } catch (e) {
      setBuyError((e as Error).message);
    } finally {
      setBuying(false);
    }
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="rounded-xl border p-4">
        <h2 className="text-xl font-bold">Erro a carregar produtos</h2>
        <p className="mt-2 text-sm opacity-80">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Produtos</h2>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome..."
            className="w-full sm:w-64 rounded-lg border px-3 py-2 outline-none focus:ring bg-zinc-900 border-zinc-600 text-white placeholder:text-zinc-400"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-56 bg-zinc-900 border-zinc-600 text-white rounded-lg border px-3 py-2"
          >
            <option value="name-asc">Nome (A → Z)</option>
            <option value="name-desc">Nome (Z → A)</option>
            <option value="price-asc">Preço (crescente)</option>
            <option value="price-desc">Preço (decrescente)</option>
          </select>
        </div>
      </div>

      {recentesProdutos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Produtos recentemente vistos</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentesProdutos.map((produto) => (
              <div key={produto.id} className="w-48">
                <ProdutoCard
                  produto={produto}
                  onAddToCart={addToCart}
                  onInfo={handleInfo}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <p className="text-sm text-zinc-300">
            A mostrar {filteredData.length} de {data?.length ?? 0}
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {filteredData.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={produto}
                onAddToCart={addToCart}
                onInfo={handleInfo}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 space-y-2">
            <h3 className="text-xl font-bold">Carrinho</h3>
            <p className="text-sm text-zinc-300">Itens: {cart.length}</p>

            <div className="flex items-center justify-between border-t border-zinc-700 pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">{total.toFixed(2)} €</span>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-sm text-zinc-300">
              Ainda não adicionaste produtos.
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((produto, idx) => (
                <ProdutoCard
                  key={`${produto.id}-${idx}`}
                  produto={produto}
                  onRemoveFromCart={removeFromCart}
                />
              ))}
            </div>
          )}

          <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 space-y-3">
            <h4 className="font-semibold">Finalizar compra</h4>

            <label className="flex items-center gap-2 text-sm text-zinc-200">
              <input
                type="checkbox"
                checked={student}
                onChange={(e) => setStudent(e.target.checked)}
              />
              Estudante DEISI
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O teu nome"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-400"
            />

            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Cupão de desconto"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-400"
            />

            <button
              onClick={buy}
              disabled={buying || cart.length === 0}
              className="w-full rounded-lg border border-zinc-600 px-3 py-2 text-sm hover:bg-zinc-700 transition disabled:opacity-50"
            >
              {buying ? "A comprar..." : "Comprar"}
            </button>

            {buyError && (
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm">
                <p className="font-semibold text-red-400">Erro</p>
                <p className="text-zinc-300">{buyError}</p>
              </div>
            )}

            {buyResponse && !buyError && (
              <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 space-y-2 text-sm">
                <p className="font-semibold text-green-400">
                  ✅ Compra realizada com sucesso!
                </p>
                <p className="text-zinc-300">
                  Obrigado,{" "}
                  <span className="font-semibold text-white">{buyerName}</span>.
                </p>

                {buyResponse?.reference && (
                  <p className="text-zinc-300">
                    <span className="text-zinc-400">Referência:</span>{" "}
                    <span className="font-mono">{buyResponse.reference}</span>
                  </p>
                )}

                {buyResponse?.totalCost !== undefined && (
                  <p className="text-zinc-300">
                    <span className="text-zinc-400">Total pago:</span>{" "}
                    <span className="font-semibold text-white">
                      {Number(buyResponse.totalCost).toFixed(2)} €
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
