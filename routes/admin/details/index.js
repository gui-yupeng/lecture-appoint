const mongo = require('../../../mongodb.js');
const dbMsg = require('../../../dbMsg.json');

const  mongodb=require('mongodb');

exports.route={
    async get(){
        //GET参数lectureID
        let lectureID=this.params.targetID;
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureDetail=await lectureCollection.findOne({"_id":mongodb.ObjectId(lectureID)});
        return lectureDetail;
    }
}