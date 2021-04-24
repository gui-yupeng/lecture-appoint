const crypto = require('crypto');
const mongo = require('../mongodb.js');
const dbMsg=require('../../dbMsg.json');
const jwt = require('jsonwebtoken');
const { nextTick } = require('process');
const { createContext } = require('vm');

module.exports=async(ctx,next)=>{

  if(ctx.path==='/admin'){

    await next();
  }
  await next();

}