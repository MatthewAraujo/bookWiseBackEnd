import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-category-repository'
import { CategoryUseCase } from '@/use-cases/category'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function category(request: FastifyRequest, reply: FastifyReply) {
  const categoryBodySchema = z.object({
    name: z.string().min(3).max(255),
  })

  const { name } = categoryBodySchema.parse(
    request.body,
  )

  try {
    const categorysRepository = new PrismaCategoryRepository()
    const categoryUseCase = new CategoryUseCase(categorysRepository)
    await categoryUseCase.execute({
      name,
      id: randomUUID()
    })
  } catch (error) {
    return reply.code(409).send(error)
  }

  return reply.code(201).send()
}
