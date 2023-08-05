import { FastifyInstance } from 'fastify'
import { category } from './category'

export async function categoryRoutes(app: FastifyInstance) {
  app.post('/category', category)
}
