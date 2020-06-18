import { Router, Context } from "../helpers/dependencies.ts"
import { requiresBody } from "../helpers/middlewares.ts"
import { createBook, getOneBook, getAllBooks, updateBook, deleteBook, retrieveBook } from "../controllers/book.controller.ts"

// Create the router instance
const router = new Router({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  prefix: '/api'
})

// Define endpoints
.get('/books', getAllBooks)
.get('/books/:id', retrieveBook, getOneBook)
.post('/books', requiresBody, createBook)
.put('/books/:id', requiresBody, retrieveBook, updateBook)
.delete('/books/:id', retrieveBook, deleteBook)

/**
 * Convenience middleware to attach both routes
 * and allowedMethods at the same time
 */
export default (ctx: Context, next: () => Promise<void>) => {
  ctx.app.use(router.routes())
  ctx.app.use(router.allowedMethods())
  next()
}