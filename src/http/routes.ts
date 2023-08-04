import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { category } from './controllers/category'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/category', category)
}
