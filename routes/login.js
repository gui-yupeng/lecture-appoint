const mongo=require('../mongodb.js');
const dbMsg=require('../dbMsg.json');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

exports.route={
    async post() {
        let adminData=this.params;
        let cardNum=adminData.cardNum;
        let pwd=adminData.password;
        //MD5加密
        password=crypto.MD5(pwd).toString();
        //token
        let tokenObj={Num:cardNum,Pwd:password};
        let token=jwt.sign(tokenObj, 'ThanksForLLY');
        let adminCollection=await mongo(dbMsg.col_admin);
        let admin= await adminCollection.findOne({"cardNum":cardNum});
        if(!admin){
            //不是管理员
            throw '您的一卡通身份不是管理员';
        }
        if(admin.password!=password){
            //密码不对
            throw '密码错误';
        }
        adminCollection.update({"cardNum":cardNum},{$set:{"token":token}});
        return {"result":"ok","token":token};
        
    }

};