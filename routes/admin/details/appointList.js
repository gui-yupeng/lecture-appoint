const mongo = require('../../../mongodb.js');
const dbMsg = require('../../../dbMsg.json');
const mongodb = require('mongodb');

exports.route = {
    async get() {
        let targetID = this.params.targetID;
        let auCollection = await mongo(dbMsg.col_audience);
        let appointList = await auCollection.find({ "targetID": targetID }).toArray();
        if (appointList.length == 0) {
            throw '暂未有人预约该讲座';
        } else {
            //按请求时间排序
            let ListSort = appointList.sort(function(x, y) {
                xTime = parseInt(x.requestTime);
                yTime = parseInt(y.requestTime);
                if (xTime > yTime) {
                    return 1;
                }
                if (xTime < yTime) {
                    return - 1;
                }
                return 0;
            })
            return ListSort;
        }
    }
}