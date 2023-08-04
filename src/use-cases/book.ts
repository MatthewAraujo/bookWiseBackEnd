import { BookRepository } from "@/repositories/book-repository"
import { BookAlreadyExists } from "./errors/book-already-exists"

interface BookUseCaseRequest {
  name: string,
  author: string
  summary: string
  coverUrl:string
  totalPages: number
  categories: [{id:string}]
}
export class BookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({
    name,
    author,
    summary,
    coverUrl,
    totalPages,
    categories
  }: BookUseCaseRequest) {

    const bookWithSameName = await this.bookRepository.findBookByName(name)

    if(bookWithSameName){
      throw new BookAlreadyExists()
    }


    await this.bookRepository.create({
      name,
      author,
      summary,
      cover_url:coverUrl,
      total_pages:totalPages,
      categories: {
        create: categories.map(category => ({
          category: { connect: { id: category.id } }
        }))
      },
    })
  }
}
