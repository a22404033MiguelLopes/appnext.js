export default function Page() {
  return (
    <div className="rounded-2xl bg-zinc-800 p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Interfaces Modernos
      </h2>

      <p className="text-white">
        Bem vindo à minha app em React e Next.js.
      </p>

      <div className="rounded-xl bg-zinc-700 p-6 space-y-4">
        <p className="text-white">
          Este é o meu componente <strong>MagiaDoJSX</strong>.
        </p>

        <p className="text-white">
          Um componente é uma função que retorna JSX –{" "}
          <strong>HTML dentro de JavaScript!</strong>
        </p>

        <p className="text-white">
          Os componentes são usados em React e Next.js.
        </p>
      </div>
    </div>
  );
}
