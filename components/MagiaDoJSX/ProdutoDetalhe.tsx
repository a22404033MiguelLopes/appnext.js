import Image from "next/image";
import type { Product } from "@/models/interfaces";

const API_DOMAIN = "https://deisishop.pythonanywhere.com";

export default function ProdutoDetalhe({ produto }: { produto: Product }) {
  const imageUrl = produto.image?.startsWith("http")
    ? produto.image
    : `${API_DOMAIN}${produto.image}`;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative w-full aspect-square bg-white rounded-xl border overflow-hidden">
          <Image
            src={imageUrl}
            alt={produto.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{produto.title}</h2>

          <p className="text-lg font-semibold">{Number(produto.price).toFixed(2)} €</p>

          <p className="text-sm opacity-80">
            <span className="font-medium">Categoria:</span> {produto.category}
          </p>

          <div className="rounded-xl border p-4 space-y-2">
            <p className="font-medium">Descrição</p>
            <p className="text-sm opacity-80">{produto.description}</p>
          </div>

          <div className="rounded-xl border p-4 flex items-center justify-between">
            <p className="font-medium">Rating</p>
            <p className="text-sm opacity-80">
              {produto.rating.rate} / 5 ({produto.rating.count} avaliações)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
