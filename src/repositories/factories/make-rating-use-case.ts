import { RatingUseCase } from '@/use-cases/rating'
import { PrismaRatingRepository } from '../prisma/prisma-rating-repository'

export function MakeRatingUseCase() {
  const ratingsRepository = new PrismaRatingRepository()
  const ratingUseCase = new RatingUseCase(ratingsRepository)

  return ratingUseCase
}
