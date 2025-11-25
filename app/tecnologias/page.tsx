import Link from "next/link";
import TecnologiaCard from "@/components/MagiaDoJSX/TecnologiaCard";
import tecnologiasJson from "@/app/data/tecnologias.json";

export default function Page() {
  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tecnologias Exploradas</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {tecnologias.map((tec: any, index: number) => (
          <Link
            href={`/tecnologia/${index}`}
            key={tec.title}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition flex flex-col items-center"
          >
            <TecnologiaCard title={tec.title} image={tec.image} />

            <p className="text-sm text-center text-gray-700 mt-3">
              {tec.description}
            </p>

            <p className="text-yellow-500 font-semibold">
              Rating: {tec.rating}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
