const mysql = require('../database/mysql.js')

module.exports = async (ctx, next) => {
  ctx.db = await mysql.getConnection()
  try { 
    await next()
  } finally {
    await ctx.db.release()
  }
}