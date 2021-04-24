const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');
let mongodb=require('mongodb');
exports.route={
    async get(){
        //GET参数lectureID
        let lectureID=this.params.lectureID;
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureDetail=await lectureCollection.findOne({"_id":mongodb.ObjectId(lectureID)});
        return lectureDetail;
    },
    //普通用户在查询lecture细节后，进行预约
    async post(){
        //POST参数personData,数据库中AUDIENCE数据类型为：
        /* "studentNum":"06019305"
        "class":"060193"
        "grade":"2019"
        "studentName":"GYP"
        "targetLecture":"如何成为一名好后端"
        "requestTime":1619092806
        "sex":"男" */
        let personData=this.params;
        let targetLecture=personData.targetLecture;
        let stuNum=null;
        let result=null;
        if(personData.studentNum){
            stuNum = personData.studentNum;
        }else{
            this.throw(401,'请求参数不全');
        }
        //学号匹配
        let isTargetStu=false;
        if(/^06017[0-9][0-9][0-9]/.test(stuNum)){
            isTargetStu=true;
        }
        if(/^06018[0-9][0-9][0-9]/.test(stuNum)){
            isTargetStu=true;
        }
        if(/^06019[0-9][0-9][0-9]/.test(stuNum)){
            isTargetStu=true;
        }
        if(/^D1220[0-9][0-9][0-9]/.test(stuNum)){
            isTargetStu=true;
        }
        if(/^D2220[0-9][0-9][0-9]/.test(stuNum)){
            isTargetStu=true;
        }
        if(!isTargetStu){
            //只面向电子学院本科生
            return 'notOurStudent'
        }
        const auCollection=await mongo(dbMsg.col_audience);
        let isRepeat=await auCollection.findOne({"studentNum":stuNum,"targetLecture":targetLecture});
        if(isRepeat){
            //this.throw(401,'已经预约成功，无法重复预约');
            return 'repeat';
        }else{
            result=await auCollection.insertOne(personData);
        }
        let insertID=result.insertedId;
        result=await auCollection.findOne({"_id":mongodb.ObjectId(insertID)});
        //插入成功就返回数据库信息
        //非电子学院本科生返回'notOurStudent'
        //重复预约返回'repeat'
        return result;
    }

};
