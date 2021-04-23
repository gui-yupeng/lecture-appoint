const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={

    //身份认证，管理员是否在数据库中
    async post() {
        let adminData=this.params;
        let cardNum=adminData.cardNum;
        let password=adminData.password;
        let adminCollection=await mongo(dbMsg.col_admin);
        let admin= await adminCollection.findOne({"cardNum":cardNum});
        if(admin){
            if(password!=admin.password){
                this.throw(401,'密码错误！');
            }
        }else{
            this.throw(401,'您没有管理员权限！')
        }
        return 'OK';
    }

};