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
          nome="Loja de Produtos"
          url="https://teu-username.github.io/nome-do-projeto"
        />
        <Projeto
          nome="Site Interativo JS"
          url="https://teu-username.github.io/outro-projeto"
        />
        <Projeto
          nome="GitHub Pages"
          url="https://teu-username.github.io"
        />
      </ul>
    </section>
  );
}
