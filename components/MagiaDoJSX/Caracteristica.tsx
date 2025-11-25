import Link from "next/link";

interface CaracteristicaProps {
  text: string;
  index: number;
}

export default function Caracteristica({ text, index }: CaracteristicaProps) {
  return (
    <li className="text-blue-700 underline hover:text-blue-900">
      <Link href={`/caracteristica/${index}`}>
        {text}
      </Link>
    </li>
  );
}
