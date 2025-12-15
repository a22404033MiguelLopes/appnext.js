import Image from "next/image";
import ContadorPersonalizado from "@/components/MagiaDoJSX/ContadorPersonalizado";

interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={`/tecnologias/${image}`}
        alt={`Logotipo de ${title}`}
        width={140}
        height={140}
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold text-center">{title}</h3>

      <ContadorPersonalizado title={title} />
    </div>
  );
}
