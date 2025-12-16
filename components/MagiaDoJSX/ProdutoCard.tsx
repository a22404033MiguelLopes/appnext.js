import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/models/interfaces";

const API_DOMAIN = "https://deisishop.pythonanywhere.com";

type Props = {
  produto: Product;
  onAddToCart?: (p: Product) => void;
  onRemoveFromCart?: (p: Product) => void;
  onInfo?: (p: Product) => void;
};

export default function ProdutoCard({ produto, onAddToCart, onRemoveFromCart, onInfo }: Props) {
  const imageUrl = produto.image?.startsWith("http")
    ? produto.image
    : `${API_DOMAIN}${produto.image}`;

  return (
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={produto.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain"
        />
      </div>

      <h3 className="mt-3 font-semibold line-clamp-2">{produto.title}</h3>
      <p className="mt-1 text-sm opacity-80">
        {Number(produto.price).toFixed(2)} €
      </p>  

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/produtos/${produto.id}`}
          onClick={() => onInfo?.(produto)}
          className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-zinc-600 transition"
        >
          +info
        </Link>


        {onAddToCart && (
          <button
            onClick={() => onAddToCart(produto)}
            className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-zinc-600 transition"
          >
            Adicionar
          </button>
        )}

        {onRemoveFromCart && (
          <button
            onClick={() => onRemoveFromCart(produto)}
            className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-zinc-600 transition"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}
