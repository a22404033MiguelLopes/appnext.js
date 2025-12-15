import Link from "next/link";
import { notFound } from "next/navigation";

const caracteristicas = [
  "JSX, sintaxe que mistura HTML e JS.",
  "Componentes, funções que retornam JSX.",
  "Componentes Reutilizáveis e Modulares.",
  "Roteamento Automático e APIs.",
  "Hooks: useState, useEffect e useSWR.",
  "Renderização Rápida e SEO Friendly.",
  "TypeScript Seguro e Escalável.",
  "Comunidade Ativa e Popularidade.",
];

export default async function CaracteristicaPage({
  params,
}: {
  params: Promise<{ caracteristica: string }>;
}) {
  const { caracteristica } = await params;
  const idx = Number(caracteristica);

  if (!Number.isInteger(idx) || idx < 0 || idx >= caracteristicas.length) {
    notFound();
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
      <h2 className="text-3xl font-bold">{caracteristicas[idx]}</h2>

      <Link
        href="/caracteristicas"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Voltar
      </Link>
    </div>
  );
}
