"use client";

import { useEffect, useState } from "react";

interface ContadorPersonalizadoProps {
  title: string; 
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const storageKey = `likes_${title}`;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      const parsed = parseInt(stored);
      if (!Number.isNaN(parsed)) setLikes(parsed);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, String(likes));
  }, [likes, storageKey]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();   // impede o Link
    e.stopPropagation(); // impede o bubbling
    setLikes((prev) => prev + 1);
  };


  return (
    <button
      onClick={handleClick}
      className="mt-2 px-4 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition"
    >
      ❤️ Likes: {likes}
    </button>
  );
}
