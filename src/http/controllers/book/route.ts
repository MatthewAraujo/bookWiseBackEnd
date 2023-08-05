import { FastifyInstance } from 'fastify'
import { book } from './book'

export async function bookRoutes(app: FastifyInstance) {
  app.post('/book', book)
}
