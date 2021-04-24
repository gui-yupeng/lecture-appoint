const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={
    //GET全部讲座信息
    async get() {
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureList= await lectureCollection.find().toArray();
        return lectureList;
    }
    
};