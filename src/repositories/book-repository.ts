import { Book, Prisma } from "@prisma/client";

export interface BookRepository {
  create(data: Prisma.BookCreateInput): Promise<Book>
  findBookByName(id: string): Promise<Book | null>
}