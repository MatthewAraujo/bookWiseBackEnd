import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepository } from '../prisma/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
