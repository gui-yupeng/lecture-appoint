const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');
const mongodb = require('mongodb');

exports.route = {
    async get() {
        //GET参数lectureID
        let lectureID = this.params.lectureID;
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let lectureDetail = await lectureCollection.findOne({ "_id": mongodb.ObjectId(lectureID) });
        return lectureDetail;
    },
    //普通用户在查询lecture细节后，进行预约
    async post() {
        //POST参数personData,数据库中AUDIENCE数据类型为：
        /* "schoolNum":"06019305"
        "class":"060193"
        "grade":"2019"
        "studentName":"GYP"
        "targetLecture":"如何成为一名好后端"
        "targeID":(待预约讲座的ID)
        "requestTime":1619092806 */
        let personData = this.params;
        let targetID = personData.targetID;
        let stuNum = null;
        let result = null;
        if (personData.schoolNum) {
            stuNum = personData.schoolNum;
        } else {
            throw '请求参数学号为空'
        }
        //学号匹配
        let isTargetStu = false;
        //17、18、19级
        if (/^0601[7-9][0-9][0-9][0-9]/.test(stuNum)) {
            isTargetStu = true;
        }
        //20级
        if (/^D[1-2]220[0-9][0-9][0-9]/.test(stuNum)) {
            isTargetStu = true;
        }
        //硕士18级、19级
        if (/^1[8-9][0-9][0-9][0-9][0-9]/.test(stuNum)) {
            isTargetStu = true;
        }
        //硕士20级
        if (/^20[0-9][0-9][0-9][0-9]/.test(stuNum)) {
            isTargetStu = true;
        }
        //教师101******、103******
        if (/^10[13][0-9][0-9][0-9][0-9][0-9][0-9]/.test(stuNum)) {
            isTargetStu = true;
        }
        //stuNum验证结束
        if (!isTargetStu) {
            //只面向电子学院本科生
            throw '您不在允许预约的范围内，请与管理员联系';
        }
        const auCollection = await mongo(dbMsg.col_audience);
        const lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let isLecture = await lectureCollection.findOne({ "_id": mongodb.ObjectId(targetID) });
        //if(!isLecture){
        //这一步是有问题的，根据ID进行检索时，ID错误程序卡在查询那行无反应，但前端发送的ID基本不会错，修复者请看mongodb的相关文档
        //throw '根据讲座ID，未在数据库中查询到该讲座';
        //}
        let isRepeat = await auCollection.findOne({ "schoolNum": stuNum, "targetID": targetID });
        if (isRepeat) {
            throw '已经预约成功,无法重复预约';
        } else {
            result = await auCollection.insertOne(personData);
        }
        let insertID = result.insertedId;
        result = await auCollection.findOne({ "_id": mongodb.ObjectId(insertID) });
        //插入成功就返回数据库信息
        //非电子学院本科生返回'notOurStudent'
        //重复预约返回'repeat'
        return result;
    }

};