import { Middleware } from "./dependencies.ts"

const assertJSON: Middleware = async (ctx, next) => {
  if (!ctx.request.hasBody) return next()

  const body = await ctx.request.body()
  if (body.type !== 'json') {
    ctx.response.status = 400
    ctx.response.body = { message: 'Only json requests are accepted' }
  } else {
    next()
  }

}

const requiresBody: Middleware = async (ctx, next) => {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400
    ctx.response.body = { message: 'Expected body content but got empty body' }
  } else {
    next()
  }
}

const setHeaders: Middleware = (ctx, next) => {
  ctx.response.headers.set(
    'content-type', 'application/json'
  )
  next()
}

const handle404: Middleware = (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = {
    message: 'Resource could not be found'
  }
  next()
}

export { assertJSON, setHeaders, handle404, requiresBody }