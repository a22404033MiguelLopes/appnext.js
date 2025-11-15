import Image from 'next/image';
import tecnologiasJson from '@/app/data/tecnologias.json';

export default function Page() {
  const tecnologias = JSON.parse(JSON.stringify(tecnologiasJson));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tecnologias Exploradas</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {tecnologias.map((tec: any) => (
          <div key={tec.title} className="border rounded-2xl p-4 shadow-sm flex flex-col items-center gap-3">

            <Image
              src={`/tecnologias/${tec.image}`}
              alt={`Logotipo de ${tec.title}`}
              width={200}
              height={200}
            />

            <h3 className="text-lg font-semibold">{tec.title}</h3>

            <p className="text-sm text-center text-gray-700">{tec.description}</p>

            <p className="text-yellow-500 font-semibold">Rating: {tec.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
