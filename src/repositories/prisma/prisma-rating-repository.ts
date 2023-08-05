import { Prisma } from '@prisma/client'
import { RatingsRepository } from '../rating-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRatingRepository implements RatingsRepository {
  async create(data: Prisma.RatingCreateInput) {
    const rating = await prisma.rating.create({
      data,
    })

    return rating
  }

  async findUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })
    return user
  }

  async findBookById(id: string) {
    const book = await prisma.book.findFirst({
      where: {
        id,
      },
    })
    return book
  }
}
