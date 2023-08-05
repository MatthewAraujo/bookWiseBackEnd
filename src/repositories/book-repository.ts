import { Book, Prisma } from '@prisma/client'

export interface BooksRepository {
  create(data: Prisma.BookCreateInput): Promise<Book>
  findBookByName(name: string): Promise<Book | null>
}
