const mongo=require('../../mongodb.js');
const dbMsg=require('../../dbMsg.json');

exports.route={
    //GET全部讲座信息
    async get() {
        let lectureCollection=await mongo(dbMsg.col_lectureMsg);
        let lectureList= await lectureCollection.find().toArray();
        //获取当前时间戳
        let nowDate= new Date().getTime();
        //过滤过期讲座
        let ListFilter=lectureList.filter((function(item){
            endTime=parseInt(item.endTime);
            if(endTime<nowDate){
                return false;
            }else{
                return true;
            }
        }))
        return ListFilter;
    }
    
};