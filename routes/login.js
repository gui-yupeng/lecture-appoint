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
            throw '您的身份不是管理员';
        }
        if(admin.password!=password){
            //密码不对
            throw '密码错误';
        }
        await adminCollection.updateOne({"cardNum":cardNum},{$set:{"token":token}});
        return {"result":"ok","token":token};
    },
    //注册功能，由于拿不到学校的数据库，无法对管理员身份进行安全校验
    //注册前向表中手动添加cardNum,注册时只会查询ADMIN表中是否含有注册人的cardNum
    //ADMIN表中有该cardNum就可以注册
    //如果加入一个cardNum,需尽快提醒该管理员进行注册，将密码加入数据库，防止其他人盗用cardNum进行注册
    async put() {
        //数据库中字段名
        //cardNum:"..."
        //adminName:"..."
        //tel:"..."
        //password:"..."
        let registerData=this.params;
        let cardNum=registerData.cardNum;
        let adminName=registerData.adminName;
        let tel=registerData.tel;
        let pwd=registerData.password;
        password=crypto.MD5(pwd).toString();
        let adminCollection=await mongo(dbMsg.col_admin);
        let admin= await adminCollection.findOne({"cardNum":cardNum});
        if(!admin){
            //不是管理员
            throw '您的身份不是管理员';
        }
        if(admin.password){
            throw '该账号已经被注册，请正常进行登陆';
        }
        await adminCollection.updateOne({"cardNum":cardNum},{$set:{"adminName":adminName,"tel":tel,"password":password}});
        return 'ok';
    }
};