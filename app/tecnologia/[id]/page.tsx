import Link from "next/link";
import { notFound } from "next/navigation";
import tecnologiasJson from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/MagiaDoJSX/TecnologiaDetailsCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idx = Number(id);

  const tecnologias = tecnologiasJson as any[];

  if (!Number.isInteger(idx) || idx < 0 || idx >= tecnologias.length) {
    notFound();
  }

  const tecnologia = tecnologias[idx];

  return (
    <div className="space-y-6">
      <TecnologiaDetailsCard tecnologia={tecnologia} />

      <Link href="/tecnologias" className="underline">
        Voltar
      </Link>
    </div>
  );
}
