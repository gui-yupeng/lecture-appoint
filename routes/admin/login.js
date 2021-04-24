const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

exports.route={

    //身份认证，只有index(获取当前全部讲座信息)不需要token，其余api均需要token
    async post() {
        let adminData=this.params;
        let cardNum=adminData.cardNum;
        let pwd=adminData.password;
        //MD5加密
        password=crypto.MD5(pwd).toString();
        //token
        let tokenObj={Num:cardNum,Pwd:password};
        console.log(tokenObj);
        let token=jwt.sign(tokenObj, 'ThanksForLLY');
        console.log(token);
        let adminCollection=await mongo(dbMsg.col_admin);
        let admin= await adminCollection.findOne({"cardNum":cardNum});
        if(!admin){
            //不是管理员
            return {"result":"noCardNum"};
        }
        if(admin.password!=password){
            //密码不对
            return {"result":"wrongPassword"};
        }
        return {"result":"ok","token":token};
        
    }

};