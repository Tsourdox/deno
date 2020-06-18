import { Application } from "./helpers/dependencies.ts";
import { assertJSON, setHeaders, handle404 } from "./helpers/middlewares.ts";
import bookRouter from "./routers/book.router.ts";

interface Book {
  id: number
  title: string
  author: string
  rating: number
}

export type AppState = Record<string, any> & {
  books: Book[]
  bookIndex: number
}

// Create application
const app = new Application<AppState>({
  state: {
    bookIndex: 1,
    books: []
  }
})

// Add middlewares
app.use(assertJSON)
app.use(setHeaders)
app.use(bookRouter)
app.use(handle404)

// Start application server
const port = Number(Deno.env.get('PORT')) || 4000
console.log(`Server running at http://localhost:${port}/`);
await app.listen({ port })