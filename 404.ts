export const NotFound = (ctx: any) => {
  ctx.response.body = {
    error: "cannot find the route to do something",
  };
};
