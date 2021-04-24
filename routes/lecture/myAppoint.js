const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={
    //GET获得预约信息
    async get() {
        let studentNum=this.params.studentNum;
        let studentName=this.params.studentName;
        let lectureCollection=await mongo(dbMsg.col_audience);
        let myAppointList= await lectureCollection.find({"studentNum":studentNum,"studentNum":studentNum}).toArray();
        if(myAppointList.length==0){
            throw '没有您的讲座预约信息，请检查学号姓名是否正确';
        }
        return myAppointList;
    }
    //取消预约，暂时废弃取消预约功能
    /*async delete(){
        //获得数据
        let personData=this.params;
        let studentNum=personData.studentNum;
        let studentName=personData.studentName;
        let targetLecture=personData.targetLecture;
        let audienceCollection=await mongo(dbMsg.col_audience);
        let result=await audienceCollection.findOne({"studentNum":studentNum,"studentName":studentName,"targetLecture":targetLecture});
        if(!result){
            return 'noData';
        }else{
            let res=await audienceCollection.deleteOne({"studentNum":studentNum,"studentName":studentName,"targetLecture":targetLecture});
            console.log(res);
            return 'ok';
        }


    }*/

};