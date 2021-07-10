const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');

exports.route = {
    //GET全部讲座信息
    async get() {
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let lectureList = await lectureCollection.find().toArray();
        //过滤删除掉的讲座
        let ListFilter1 = lectureList.filter(function(item) {
                if (item.isDeleted) {
                    return false;
                } else {
                    return true;
                }
            })
        //过滤过期讲座
        let nowDate = new Date().getTime();
        let ListFilter2 = ListFilter1.filter(function(item) {
            endTime = parseInt(item.endTime);
            if (endTime < nowDate) {
                return false;
            } else {
                return true;
            }
        })
        return ListFilter2;
    }
};