import Image from "next/image";

interface TecnologiaDetailsCardProps {
  tecnologia: {
    title: string;
    image: string;
    description: string;
    rating: number;
  };
}

export default function TecnologiaDetailsCard({ tecnologia }: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-4 max-w-md mx-auto">
      <Image
        src={`/tecnologias/${tecnologia.image}`}
        alt={tecnologia.title}
        width={180}
        height={180}
      />

      <h2 className="text-2xl font-bold">{tecnologia.title}</h2>

      <p className="text-center text-gray-700">{tecnologia.description}</p>

      <p className="text-yellow-500 font-semibold">
        Rating: {tecnologia.rating}
      </p>
    </div>
  );
}
