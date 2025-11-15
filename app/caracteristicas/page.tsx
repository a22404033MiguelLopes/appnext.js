'use client';

export default function Page() {
  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];

  return (
    <>
      <h2>Características do React e Next.js</h2>

      <ul>
        {caracteristicas.map((caracteristica, i) => {
          return <li key={i}>{caracteristica}</li>;
        })}
      </ul>

      <button  className="m-5 p-3 rounded-2xl bg-blue-500 text-white  hover:bg-blue-600" onClick={() => alert("REact e Next.js são incriveis")}> Clique aqui </button>
    </>
  );
}
