import { Category } from '@prisma/client'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'
import { CategorysRepository } from '@/repositories/category-repository'

interface CategoryUseCaseRequest {
  name: string
  id: string
}

interface CategoryUseCaseResponse {
  category: Category
}
export class CategoryUseCase {
  constructor(private categoryRepository: CategorysRepository) {}

  async execute({
    name,
    id,
  }: CategoryUseCaseRequest): Promise<CategoryUseCaseResponse> {
    const categoryWithSameName = await this.categoryRepository.findByName(name)

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoryRepository.create({
      name,
      id,
    })
    return {
      category,
    }
  }
}
