//* compose funcs
module.exports = function(funcArr) {
  return [
    async (ctx, next) => {
      await next(ctx);
      // console.log('next', ctx)
      return ctx.res;
    },
    ...funcArr,
  ].reduceRight((callback, fn, i) => {
    return async ctx => {
      await fn(ctx, callback);
      return ctx.res
    };
  }, (next = async (ctx) => {}));
};
