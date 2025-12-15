"use client";

import { useState } from "react";

type Tarefa = {
  id: number;
  texto: string;
  categoria: string;
};

const tecnologias = ["HTML", "CSS", "JavaScript", "React", "Next.js"];

export default function InputPage() {
  const [textoSimples, setTextoSimples] = useState("");
  const [categoria, setCategoria] = useState(tecnologias[0]);
  const [textoTarefa, setTextoTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  function adicionarTarefa() {
    if (!textoTarefa.trim()) return;

    const nova: Tarefa = {
      id: Date.now(),
      texto: textoTarefa.trim(),
      categoria,
    };

    setTarefas((prev) => [...prev, nova]);
    setTextoTarefa("");
  }

  function apagarTarefa(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function editarTarefa(id: number) {
    const atual = tarefas.find((t) => t.id === id);
    if (!atual) return;

    const novoTexto = prompt("Novo texto da tarefa:", atual.texto);
    if (!novoTexto || !novoTexto.trim()) return;

    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, texto: novoTexto.trim() } : t
      )
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-2">Página de Input</h2>

      <section className="space-y-2">
        <h3 className="font-semibold">Input de texto</h3>
        <input
          type="text"
          value={textoSimples}
          onChange={(e) => setTextoSimples(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Escreve qualquer coisa..."
        />
        <p className="mt-1 text-sm text-zinc-400">
          Texto digitado: <span className="font-semibold">{textoSimples}</span>
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Selecionar tecnologia / categoria</h3>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border bg-zinc-800 rounded px-3 py-2"
        >
          {tecnologias.map((tec) => (
            <option key={tec} value={tec}>
              {tec}
            </option>
          ))}
        </select>
        <p className="text-sm text-zinc-400">
          Categoria selecionada:{" "}
          <span className="font-semibold">{categoria}</span>
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-semibold">Lista de tarefas</h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={textoTarefa}
            onChange={(e) => setTextoTarefa(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Nova tarefa..."
          />
          <button
            onClick={adicionarTarefa}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Inserir
          </button>
        </div>

        <ul className="space-y-2 mt-2">
          {tarefas.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between border rounded px-3 py-2 bg-white"
            >
              <div>
                <p className="font-medium text-gray-500">{t.texto}</p>
                <p className="text-xs text-gray-500">
                  Categoria: {t.categoria}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editarTarefa(t.id)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => apagarTarefa(t.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
