const mongo = require('../mongodb.js');
const dbMsg=require('../../dbMsg.json');

module.exports = async (ctx, next) => {
  let path=ctx.path;
  //只有登陆(/admin/login)不需要token，其他api都需要
  if(path==='/admin'&&path==='/admin/details'&&path==='/admin/details/appointList'){
    let token=ctx.request.headers["x-api-token"];
    let adminCollection=await mongo(dbMsg.col_admin);
    let admin= await adminCollection.findOne({"token":token});
    if(!admin){
      //不执行下游next()
      ctx.body='noToken';
      return;
    }else{
      await next();
    }
  }
}