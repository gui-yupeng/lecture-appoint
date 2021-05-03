const mongo = require('../../mongodb.js');
const dbMsg = require('../../dbMsg.json');
const mongodb = require('mongodb');

exports.route = {
    //GET获得预约信息
    async get() {
        let schoolNum = this.params.schoolNum;
        let studentName = this.params.studentName;
        let lectureCollection = await mongo(dbMsg.col_lectureMsg);
        let auCollection = await mongo(dbMsg.col_audience);
        let myAppointList = await auCollection.find({ "studentName": studentName, "schoolNum": schoolNum }).toArray();
        //通过targetID查看是否该讲座已经被删除，并过滤掉
        //map映射实现异步查库，filter的异步查库没整明白，呜呜呜
        let del = await Promise.all(myAppointList.map(async (item)=> {
            let lecture =await lectureCollection.findOne({ "_id": mongodb.ObjectId(item.targetID) });
            let isDeleted=lecture.isDeleted;
            if (isDeleted) {
                return 0;
            } else {
                return 1;
            }
        }))
        let ListFilter=myAppointList.filter((item,index)=>{
            return del[index];
        })
        if (ListFilter.length == 0) {
            throw '没有您的讲座预约信息，请检查学号姓名是否正确';
        }
        console.log(ListFilter);
        //按请求时间排序
        let ListSort = ListFilter.sort(function(x, y) {
            xTime = parseInt(x.requestTime);
            yTime = parseInt(y.requestTime);
            if (xTime > yTime) {
                return -1;
            }
            if (xTime < yTime) {
                return 1;
            }
            return 0;
        })
        return ListSort;
    }
        //取消预约，暂时废弃取消预约功能
        /*async delete(){
            //获得数据
            let personData=this.params;
            let schoolNum=personData.schoolNum;
            let studentName=personData.studentName;
            let targetLecture=personData.targetLecture;
            let audienceCollection=await mongo(dbMsg.col_audience);
            let result=await audienceCollection.findOne({"schoolNum":schoolNum,"studentName":studentName,"targetLecture":targetLecture});
            if(!result){
                return 'noData';
            }else{
                let res=await audienceCollection.deleteOne({"schoolNum":schoolNum,"studentName":studentName,"targetLecture":targetLecture});
                console.log(res);
                return 'ok';
            }


        }*/

};