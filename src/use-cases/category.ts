import { CategoryRepository } from '@/repositories/category-repository'
import { CategoryAlreadyExists } from './errors/category-already-exists'

interface CategoryUseCaseRequest {
  name: string,
  id: string
}
export class CategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    name,
    id
    
  }: CategoryUseCaseRequest) {

    const categoryWithSameName = await this.categoryRepository.findByName(name)

    if(categoryWithSameName){
      throw new CategoryAlreadyExists()
    }


    await this.categoryRepository.create({
      name,
      id
    })
  }
}
