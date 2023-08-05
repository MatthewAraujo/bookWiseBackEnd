import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUserRepository } from '../prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)
  return authenticateUseCase
}
