const model = require("../model");
const Router = require("koa-router");
let router = new Router();

let User = model.User;

router.get('/', async (ctx) => {
    let html = `
            <h1>Hello,Koa2! request POST</h1>
            <form method="POST"  action="/user/login">
                <p>username:</p>
                <input name="username" /> <br/>
                <p>password:</p>
                <input name="password" /> <br/>
                <button type="submit">submit</button>
            </form>
        `;
    ctx.body = html;
});
//登录
router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body;
    //数据库查询
    await User.findOne({
            where: {
                username: loginUser.username,
            }
        })
        //查询值传入
        .then(async (result) => {
            //判断密码是否一致
            if (result && (result.password === loginUser.password)) {
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                };
            } else {
                ctx.body = {
                    code: 500,
                    message: '用户名不存在',
                };
            }
        })
        .catch(err => {
            //findOne行为发生错误时
            ctx.body = {
                code: 500,
                message: '登录出错！',
                data: err
            };
        })

});

/* (async () => {
    let result = await User.findOne({
        username: 'jack',
    });
    console.log('*******************查找成功**********************');
    console.log(JSON.parse(JSON.stringify(result)));

    // return result;
})(); */


module.exports = router;