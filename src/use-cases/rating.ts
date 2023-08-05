import { RatingsRepository } from '@/repositories/rating-repository'
import { Rating } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found'
import { BookNotFoundError } from './errors/book-not-found-error'

interface RatingUseCaseRequest {
  rate: number
  description: string
  book: {
    connect: {
      id: string
    }
  }
  user: {
    connect: {
      id: string
    }
  }
}

interface RatingUseCaseResponse {
  rating: Rating
}
export class RatingUseCase {
  constructor(private ratingRepository: RatingsRepository) {}

  async execute({
    rate,
    description,
    book,
    user,
  }: RatingUseCaseRequest): Promise<RatingUseCaseResponse> {
    const doesBookExists = await this.ratingRepository.findBookById(
      book.connect.id,
    )

    if (!doesBookExists) {
      throw new BookNotFoundError()
    }

    const doesUserExists = await this.ratingRepository.findUserById(
      user.connect.id,
    )

    if (!doesUserExists) {
      throw new UserNotFoundError()
    }

    const rating = await this.ratingRepository.create({
      rate,
      description,
      book,
      user,
    })
    return {
      rating,
    }
  }
}
