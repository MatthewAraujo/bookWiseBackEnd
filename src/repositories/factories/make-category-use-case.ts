import { CategoryUseCase } from '@/use-cases/category'
import { PrismaCategoryRepository } from '../prisma/prisma-category-repository'

export function MakeCategoryUseCase() {
  const categorysRepository = new PrismaCategoryRepository()
  const categoryUseCase = new CategoryUseCase(categorysRepository)

  return categoryUseCase
}
