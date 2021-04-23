const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={
    //GET全部讲座信息
    async get() {
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureList= await lectureCollection.find().toArray();
        return lectureList;
    },

    //POST进行预约，信息提交到'AUDIENCE'表
    async post(){
        
    },
    //DELETE取消预约，删除'AUDIENCE'表中相关信息
    async delete(){

    }

};