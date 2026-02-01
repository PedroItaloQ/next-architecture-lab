import { findAllBooks, insertBook } from "@/db/queries/books";

type CreateBookInput = {
  title: string;
  author: string;
};

export async function getAllBooks() {
  return findAllBooks();
}

export async function createBook(data: CreateBookInput) {
  if (!data.title || !data.author) {
    throw new Error("Título e autor são obrigatórios");
  }

  await insertBook(data);

  return { message: "Livro criado com sucesso" };
}
