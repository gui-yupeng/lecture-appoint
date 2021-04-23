const MongoClient = require('mongodb').MongoClient;
const dbMsg=require('./dbMsg.json');

// Connection URL 开发测试用本地数据库URL
// 用户信息：db.createUser( {user: "test",pwd: "123456",roles: [ { role: "readwrite", db: "koa" } ]})
const url = dbMsg.dburl;

// Database Name  开发测试用本地数据库koa
const dbName = dbMsg.dbName;

let mongodb=null;

const getCollection = async(col) => {
    if (mongodb) {
        return mongodb.collection(col);
    } else {
        mongodb = await MongoClient.connect(url,{ useUnifiedTopology: true } );
        //开发测试用本地数据库koa,上线修改
        mongodb = mongodb.db(dbName);
        return mongodb.collection(col);
    }
}
module.exports=getCollection;
