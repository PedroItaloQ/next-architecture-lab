import { db } from "../index";
import { books } from "../schema";

export function findAllBooks() {
  return db.select().from(books);
}

export function insertBook(data: { title: string; author: string }) {
  return db.insert(books).values(data);
}
