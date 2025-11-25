import Link from "next/link";

export default function CaracteristicaPage({ params }: { params: { id: string } }) {
  const caracteristicas = [
    "JSX, sintaxe que mistura HTML e JS.",
    "Componentes, funções que retornam JSX.",
    "Componentes Reutilizáveis e Modulares.",
    "Roteamento Automático e APIs.",
    "Hooks: useState, useEffect e useSWR.",
    "Renderização Rápida e SEO Friendly.",
    "TypeScript Seguro e Escalável.",
    "Comunidade Ativa e Popularidade."
  ];

  const id = parseInt(params.id);

  const caracteristica = caracteristicas[id];

  if (!caracteristica) {
    return <p>Característica não encontrada.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-2xl font-bold">Detalhes da Característica</h2>

      <p className="text-lg text-center bg-white p-6 rounded-xl shadow max-w-md">
        {caracteristica}
      </p>

      <Link
        href="/caracteristicas"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Voltar às características
      </Link>
    </div>
  );
}
