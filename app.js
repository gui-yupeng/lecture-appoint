const Koa = require('koa');
const kf = require('kf-router');
const paramStandard=require('./middleware/params.js');
const returnStandard=require('./middleware/return.js');
//const check=require('./middleware/check.js')

const app = new Koa();


app.use(paramStandard);
app.use(returnStandard);
//app.use(check);




app.use(kf());
app.listen(3030);