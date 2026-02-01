import { NextResponse } from "next/server";
import { getAllBooks, createBook } from "@/services/books.service";

export async function GET() {
  const books = await getAllBooks();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createBook(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
