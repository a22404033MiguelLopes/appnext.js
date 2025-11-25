type ProjetoProps = {
  nome: string;
  url: string;
};

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <li className="mb-2">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 font-semibold underline hover:text-blue-900"
      >
        {nome}
      </a>
    </li>
  );
}
