import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExists } from './errors/email-alredy-exists'

interface RegisterUseCaseRequest {
  name: string
  avatar_url: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    name,
    avatar_url,
    email,
    password,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExists()
    }


    await this.userRepository.create({
      name,
      avatar_url,
      email,
      password: password_hash,
      
    })
  }
}
