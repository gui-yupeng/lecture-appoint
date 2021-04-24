const mongo = require('../../../mongodb.js');
const dbMsg = require('../../../dbMsg.json');
const mongodb=require('mongodb');

exports.route={
    async get() {
        let targetID=this.params.targetID;
        let auCollection=await mongo(dbMsg.col_audience);
        let appointList=await auCollection.find({"targetID":targetID}).toArray();
        if(appointList.length==0){
            throw '暂未有人预约该讲座';
        }else{
            return appointList;
        }
    }
}