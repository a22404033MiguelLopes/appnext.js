import Link from "next/link";

export default function Caracteristica({
  caracteristica,
  index,
}: {
  caracteristica: string;
  index: number;
}) {
  return (
    <Link
      href={`/caracteristicas/${index}`}
      className="block rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 hover:bg-zinc-700 transition"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold">{caracteristica}</span>
        <span className="text-sm opacity-70">Ver →</span>
      </div>
    </Link>
  );
}
