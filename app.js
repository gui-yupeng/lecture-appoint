const Koa = require('koa');
const kf = require('kf-router');
const bp=require('koa-bodyparser');
const paramStandard=require('./middleware/params.js');
const returnStandard=require('./middleware/return.js');

const app = new Koa();

app.use(bp());
app.use(paramStandard);
app.use(returnStandard);





app.use(kf());
app.listen(3030);