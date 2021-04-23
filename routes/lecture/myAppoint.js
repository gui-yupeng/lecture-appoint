const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={
    //GET获得预约信息
    async get() {
        let studentNum=this.params.studentNum;
        let lectureCollection=await mongo(dbMsg.col_audience);
        let myAppointList= await lectureCollection.find({"studentNum":studentNum}).toArray();
        return myAppointList;
    }

};