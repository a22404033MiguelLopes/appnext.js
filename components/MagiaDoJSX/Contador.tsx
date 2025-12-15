"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carregar valores do localStorage ao iniciar
  useEffect(() => {
    const v = localStorage.getItem("contador");
    const h = localStorage.getItem("historico");

    if (v) setValor(parseInt(v));
    if (h) setHistorico(JSON.parse(h));
  }, []);

  useEffect(() => {
    localStorage.setItem("contador", valor.toString());
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [valor, historico]);

  function alterarValor(delta: number) {
    setValor((prev) => {
      const novo = Math.min(10, Math.max(0, prev + delta)); 

      setHistorico((h) => {
        if (h.length > 0 && h[h.length - 1] === novo) {
          return h;
        }
        return [...h, novo];
      });

      return novo;
    });
  }

  function reset() {
    setValor(0);
    setHistorico((h) => {
      if (h.length > 0 && h[h.length - 1] === 0) {
        return h;
      }
      return [...h, 0];
    });
  }

  const cor =
    valor <= 3
      ? "text-red-600"
      : valor <= 7
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="flex flex-col items-center gap-6">
      <p className={`text-6xl font-bold ${cor}`}>{valor}</p>

      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => alterarValor(1)}
        >
          +1
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => alterarValor(-1)}
        >
          -1
        </button>

        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Histórico de valores</h3>
        <ul className="list-disc list-inside">
          {historico.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
