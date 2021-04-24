const mongo = require('../mongodb.js');
const dbMsg=require('../dbMsg.json');

module.exports = async (ctx, next) => {
  //只有登陆(/admin/login)不需要token，其他api都需要
  if(ctx.path.startsWith('/admin')){
    let token=ctx.request.headers["x-api-token"];
    let adminCollection=await mongo(dbMsg.col_admin);
    let isAdminToken= await adminCollection.findOne({"token":token});
    if(!isAdminToken){
      //不执行下游next()
      ctx.body='TokenERROR';
      return;
    }else{
      await next();
      return;
    }
  }else{
    await next();
    return;
  }
}