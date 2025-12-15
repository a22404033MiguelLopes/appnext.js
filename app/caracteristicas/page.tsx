import Caracteristica from "@/components/MagiaDoJSX/Caracteristica";

export default function Page() {
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

  return (
    <div className="rounded-2xl bg-zinc-800 p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">
          Características do React e Next.js
        </h2>
        <p className="text-white">
          Clica numa característica para veres o detalhe.
        </p>
      </div>

      <ul className="space-y-3">
        {caracteristicas.map((c, i) => (
          <li key={i}>
            <Caracteristica caracteristica={c} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
