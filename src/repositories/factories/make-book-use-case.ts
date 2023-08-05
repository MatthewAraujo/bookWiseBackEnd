import { BookUseCase } from '@/use-cases/book'
import { PrismaBookRepository } from '../prisma/prisma-book-repository'

export function MakeBookUseCase() {
  const booksRepository = new PrismaBookRepository()
  const bookUseCase = new BookUseCase(booksRepository)

  return bookUseCase
}
