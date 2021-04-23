const bodyparser = require('koa-bodyparser')({
    enableTypes: ['json', 'form', 'text']
  })
  
  module.exports = async (ctx, next) => {
    await bodyparser(ctx, async () => {
      if (/^get|delete$/i.test(ctx.method)) {
        ctx.params = ctx.query
      } else {
        ctx.params = ctx.request.body
      }
    }).catch(e => {
      ctx.params = e.body
    })
    await next()
  }