const fakeKoa = require('./index');
const fs = require('fs');
const app = new fakeKoa();

app.use(async (ctx, next) => {
  console.log('middlare 1 start');
  ctx.url = '/index';
  await next(ctx);
  console.log('middlare 1 end');
});
app.use(async (ctx, next) => {
  console.log('middlare 2 start');
  if (ctx.req.url === '/') {
    //* 读取html文件
    const file = await new Promise(resolve => {
      fs.readFile('./src/index.html', async function(err, file) {
        if (err) return console.log('err', err);
        resolve(file);
      });
    });
    ctx.res.setHeader('content-type', `text/html;charset='utf-8'`);
    ctx.body = file;
    await next(ctx);
  } else {
    ctx.body = 'nothing';
    await next(ctx);
  }
  console.log('middlare 2 end');
});

app.listen('3000');
