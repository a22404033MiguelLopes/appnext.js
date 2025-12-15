import Projeto from "@/components/MagiaDoJSX/Projeto";

export default function DescricaoProjetos() {
  return (
    <section className="space-y-4">
      <p>
        Ao longo desta disciplina, desenvolvi vários projetos usando HTML, CSS,
        JavaScript, React e Next.js. Aqui estão alguns deles:
      </p>

      <ul className="list-disc list-inside">
        <Projeto
          nome="Primeiro site com HTML e CSS"
          url="https://a22404033miguellopes.github.io/lab3/index.html"
        />
        <Projeto
          nome="Site Interativo JS"
          url="https://a22404033miguellopes.github.io/lab4/index.html"
        />
        <Projeto
          nome="Loja de Produtos"
          url="https://a22404033miguellopes.github.io/lab7/index.html"
        />
      </ul>
    </section>
  );
}
