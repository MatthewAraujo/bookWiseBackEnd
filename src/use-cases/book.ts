import { Book } from '@prisma/client'
import { BookAlreadyExistsError } from './errors/book-already-exists-error'
import { BooksRepository } from '@/repositories/book-repository'

interface BookUseCaseRequest {
  name: string
  author: string
  summary: string
  coverUrl: string
  totalPages: number
  categories: { id: string }[]
}

interface BookUseCaseResponse {
  book: Book
}
export class BookUseCase {
  constructor(private bookRepository: BooksRepository) {}

  async execute({
    name,
    author,
    summary,
    coverUrl,
    totalPages,
    categories,
  }: BookUseCaseRequest): Promise<BookUseCaseResponse> {
    const bookWithSameName = await this.bookRepository.findBookByName(name)

    if (bookWithSameName) {
      throw new BookAlreadyExistsError()
    }

    const book = await this.bookRepository.create({
      name,
      author,
      summary,
      cover_url: coverUrl,
      total_pages: totalPages,
      categories: {
        create: categories.map((category) => ({
          category: { connect: { id: category.id } },
        })),
      },
    })

    return {
      book,
    }
  }
}
