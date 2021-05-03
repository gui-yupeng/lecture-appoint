const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');
const mongodb = require('mongodb');

//admin首页，已经login，能看到全部lecture信息，能新增讲座信息
exports.route = {
    async get() {
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let lectureList = await lectureCollection.find().toArray();
        return lectureList;
    },
    //插入讲座
    async post() {
        let lectureMsg = this.params;
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let result = await lectureCollection.insertOne(lectureMsg);
        let insertID = result.insertedId;
        //同时将isDeleted置为true
        lectureCollection.updateOne({ "_id": mongodb.ObjectId(insertID) }, { $set: { 'isDeleted': false } });
        result = await lectureCollection.findOne({ "_id": mongodb.ObjectId(insertID) });
        return result;
    },
    //本项目前端没有调用这个接口
    //修改讲座信息，请求要有全部参数
    async put() {
        let lectureMsg = this.params;
        let lectureID = lectureMsg.lectureID;
        let startTime = lectureMsg.startTime;
        let endTime = lectureMsg.endTime;
        let lectureTitle = lectureMsg.lectureTitle;
        let speaker = lectureMsg.speaker;
        let introduction = lectureMsg.introduction;
        let targetAudience = lectureMsg.targetAudience;
        let others = lectureMsg.others;
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let result = lectureCollection.findOne({ "_id": mongodb.ObjectId(lectureID) });
        if (!result) {
            throw '数据库中没有该讲座';
        }
        await lectureCollection.update({ "_id": mongodb.ObjectId(lectureID) }, { $set: { 'startTime': startTime, "endTime": endTime, "lectureTitle": lectureTitle, "speaker": speaker, "introduction": introduction, "targetAudience": targetAudience, "others": others } });
        //await lectureCollection.save(lectureMsg);
        result = await lectureCollection.findOne({ "_id": mongodb.ObjectId(lectureID) });
        return result;
    },
    //删除讲座，就两个参数，讲座ID targetID，讲座标题 lectureTitle
    async delete() {
        let lectureMsg = this.params;
        let targetID = lectureMsg.targetID;
        let lectureTitle = lectureMsg.lectureTitle;
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        //删除将isDeleted置为true
        await lectureCollection.updateOne({ "_id": mongodb.ObjectId(targetID) }, { $set: { 'isDeleted': true } });;
        return 'ok';
    }
};