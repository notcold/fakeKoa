const http = require('http');
const compose = require('./compose');
// 简化版koa尝试
class fakeKoa {
  constructor() {
    this.middlewares = [];
  }
  //添加中间件
  use(fn) {
    this.middlewares.push(fn);
    return this;
  }
  listen(...params) {
    const server = http.createServer(this.callback());
    return server.listen(...params);
  }
  //应用中间件
  callback() {
    const fn = compose(this.middlewares);
    return (req, res) => {
      return this.handleRequest(
        {
          req,
          res,
          app: this,
        },
        fn
      );
    };
  }

  handleRequest(ctx, fnMiddleware) {
    //! error catch
    const onerror = err => {
      ctx.res.end(err.msg??'12')
    };
    // apply middleware
    return fnMiddleware(ctx)
      .then(res => res.end(ctx.body))
      .catch(onerror);
  }
}

module.exports = fakeKoa;
