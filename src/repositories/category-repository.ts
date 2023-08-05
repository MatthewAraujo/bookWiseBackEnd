import { Category, Prisma } from '@prisma/client'

export interface CategorysRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findByName(name: string): Promise<Category | null>
}
