import { PrismaBookRepository } from '@/repositories/prisma/prisma-book-repository'
import { BookUseCase } from '@/use-cases/book'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export async function book(request: FastifyRequest, reply: FastifyReply) {
  

  const bookBodySchema = z.object({
    name: z.string().min(3).max(255),    
    author: z.string().min(3).max(255),
    summary: z.string().min(3).max(355),
    coverUrl: z.string().url(),
    totalPages: z.number().min(1),
    categories: z.array(z.object({
      id: z.string().uuid()
    }))
  })

  const { name, author, categories, coverUrl, summary, totalPages } = bookBodySchema.parse(
    request.body,
  )

  try {
    const booksRepository = new PrismaBookRepository()
    const bookUseCase = new BookUseCase(booksRepository)


    await bookUseCase.execute({
      name,
      author,
      categories,
      coverUrl,
      summary,
      totalPages
    })
  } catch (error) {
    return reply.code(409).send(error)
  }

  return reply.code(201).send()
}
