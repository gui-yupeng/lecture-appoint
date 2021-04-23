const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');
let mongodb=require('mongodb');
exports.route={
    async get(){
        //GET参数lectureID
        let lectureID=this.params.lectureID;
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureDetail=await lectureCollection.findOne({"_id":mongodb.ObjectId(lectureID)});
        console.log(lectureDetail);
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
        let stuNum=null;
        let result=null;
        if(personData.studentNum){
            stuNum = personData.studentNum;
        }else{
            console.log('请求参数中学号项为空');
            //this.throw(401,'请求参数不全');
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
            this.throw(401,'很抱歉，您不在允许预约的学生名单中，请与管理员联系');
        }
        const auCollection=await mongo(dbMsg.col_audience);
        let isRepeat=await auCollection.findOne({"studentNum":stuNum});
        if(isRepeat){
            this.throw(401,'已经预约成功，无法重复预约！');
            console.log('已经预约成功，无法重复预约');
        }else{
            result=await audienceCollection.insertOne(personData);
        }
        console.log(result);
        return result;
    }

};
