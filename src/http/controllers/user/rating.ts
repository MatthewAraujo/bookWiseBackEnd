import { MakeRatingUseCase } from '@/repositories/factories/make-rating-use-case'
import { BookNotFoundError } from '@/use-cases/errors/book-not-found-error'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function rating(request: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    rate: z.number().int().min(1).max(5),
    description: z.string().min(1).max(255),
    book_id: z.string().uuid(),
    user_id: z.string().uuid(),
  })

  const { rate, description, book_id, user_id } = userBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = MakeRatingUseCase()
    await registerUseCase.execute({
      rate,
      description,
      book: { connect: { id: book_id } },
      user: { connect: { id: user_id } },
    })
  } catch (error) {
    if (
      error instanceof BookNotFoundError ||
      error instanceof UserNotFoundError
    ) {
      return reply.code(409).send({ message: error.message })
    }
  }

  return reply.code(201).send()
}
