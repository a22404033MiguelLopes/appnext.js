"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [agora, setAgora] = useState<string>("");

  useEffect(() => {
    const atualizar = () => {
      const data = new Date();
      setAgora(data.toLocaleTimeString("pt-PT"));
    };

    atualizar(); 
    const id = setInterval(atualizar, 1000); 

    return () => clearInterval(id); 
  }, []);

  return (
    <span className="font-mono text-sm text-gray-700">
      {agora}
    </span>
  );
}
