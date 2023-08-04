import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CategoryRepository } from '../category-repository'

export class PrismaCategoryRepository implements CategoryRepository{
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    })

    return category
  }

  async findByName(name: string){
    const category = await prisma.category.findFirst({
      where:{
        name,
      }
    })

    return category
  }

}
