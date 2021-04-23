const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

//admin首页，已经login，能看到全部lecture信息，能新增讲座信息
exports.route={

    //GET全部讲座信息
    async get() {
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureList= await lectureCollection.find().toArray();
        return lectureList;
    },
    
    async post() {
        
    }
};