const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const bodyParser = require("koa-bodyparser"); //对传入的请求体进行解析
// const cors = require("koa2-cors");//跨域

app.use(bodyParser());




//引入路由
let user = require("./API/UserAPI.js");

//装载所有子路由
let router = new Router();
router.use('/user', user.routes());

//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


app.use(async (ctx) => {
    ctx.body = '<h1>Hello Bruce1G</h1>'
});

app.listen(3000, () => {
    console.log('*********[Service] starting at port 3000 ***********');
})