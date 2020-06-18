import { RouterMiddleware } from "../helpers/dependencies.ts"
import { AppState } from "../server.ts"

type Params = { id: string }

export const retrieveBook: RouterMiddleware<Params, AppState> = async (ctx, next) => {
    const paramId = Number(ctx.params.id)
    const book = ctx.state.books.find((book) => book.id == paramId)
    
    if (!book) {
        ctx.response.status = 404
        ctx.response.body = { message: 'book could not be found' }
    } else {
        (ctx.request as any).data = { book }
        next()
    }
}

export const createBook: RouterMiddleware<{}, AppState> = async (ctx) => {
    const body = await ctx.request.body()
    const book = Object.assign({}, body.value, { id: ctx.state.bookIndex++ })
    ctx.state.books.push(book)
    ctx.response.body = book
}

export const getAllBooks: RouterMiddleware<{}, AppState> = async (ctx) => {
    ctx.response.body = ctx.state.books
}

export const getOneBook: RouterMiddleware<Params, AppState> = async (ctx) => {
    ctx.response.body = (ctx.request as any).data.book
}

export const updateBook: RouterMiddleware<Params, AppState> = async (ctx) => {
    const book = (ctx.request as any).data.book
    const body = await ctx.request.body()
    Object.assign(book, body.value)
    ctx.response.body = book
}
export const deleteBook: RouterMiddleware<Params, AppState> = async (ctx) => {
    const book = (ctx.request as any).data.book
    const index = ctx.state.books.indexOf(book)
    ctx.state.books.splice(index, 1)
    ctx.response.body = book
}