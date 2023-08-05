import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/repositories/factories/make-register-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists'
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(255),
    avatar_url: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { name, avatar_url, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      avatar_url,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.code(409).send({ message: error.message })
    }
  }

  return reply.code(201).send()
}
