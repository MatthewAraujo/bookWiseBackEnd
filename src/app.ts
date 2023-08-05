import fastify from 'fastify'
import { ZodError } from 'zod'
import { bookRoutes } from './http/controllers/book/route'
import { userRoutes } from './http/controllers/user/routes'
import { categoryRoutes } from './http/controllers/category/route'
export const app = fastify()

app.register(userRoutes)
app.register(categoryRoutes)
app.register(bookRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }
})
