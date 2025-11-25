import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/MagiaDoJSX/TecnologiaDetailsCard";
import Link from "next/link";

export default function TecnologiaPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson));

  const tecnologia = tecnologias[id];

  if (!tecnologia) {
    return <p>Tecnologia não encontrada.</p>;
  }

  return (
    <div className="space-y-6">
      <TecnologiaDetailsCard tecnologia={tecnologia} />

      <Link
        href="/tecnologias"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        ← Voltar às tecnologias
      </Link>
    </div>
  );
}
