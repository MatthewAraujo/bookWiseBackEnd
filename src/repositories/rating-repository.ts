import { Book, Prisma, Rating, User } from '@prisma/client'

export interface RatingsRepository {
  create(data: Prisma.RatingCreateInput): Promise<Rating>
  findBookById(id: string): Promise<Book | null>
  findUserById(id: string): Promise<User | null>
}
