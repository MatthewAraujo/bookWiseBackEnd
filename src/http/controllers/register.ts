import { RegisterUseCase } from '@/use-cases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string().min(3).max(255),
    avatar_url: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6).max(255),
  })

  const { name, avatar_url, email, password } = userBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute({
      name,
      avatar_url,
      email,
      password,
    })
  } catch (error) {
    return reply.code(409).send(error)
  }

  return reply.code(201).send()
}
