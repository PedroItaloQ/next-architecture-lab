"use client";

import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchBooks() {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    setTitle("");
    setAuthor("");
    setLoading(false);
    fetchBooks();
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          📚 Biblioteca de Livros
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            className="w-full rounded-lg border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-800"
            placeholder="Título do livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full rounded-lg border border-zinc-300 p-3 focus:outline-none focus:ring-2 focus:ring-zinc-800"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-zinc-900 text-white rounded-lg py-3 font-medium hover:bg-zinc-800 transition disabled:opacity-50"
          >
            {loading ? "Adicionando..." : "Adicionar livro"}
          </button>
        </form>

        {/* Lista */}
        <div className="space-y-4">
          {books.length === 0 && (
            <p className="text-center text-zinc-500">Nenhum livro cadastrado</p>
          )}

          {books.map((book) => (
            <div
              key={book.id}
              className="border border-zinc-200 rounded-xl p-4 hover:shadow-sm transition"
            >
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-zinc-600">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
