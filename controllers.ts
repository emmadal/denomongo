import db from "./mongo.ts";

const dbCollection = db.collection("employee");

export const Controllers = {
  allUsers: async (ctx: any) => {
    const data = await dbCollection.find();
    if (data) {
      ctx.response.body = data;
      return;
    }
  },
  oneUser: async (ctx: any) => {
    const user = await dbCollection.findOne({ _id: { $oid: ctx.params.id } });
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Unable to find this user" };
      return;
    }
    const data = await dbCollection.findOne(user);
    ctx.response.body = data;
  },
  createUser: async (ctx: any) => {
    if (!ctx.request.hasBody) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Please provide the required data" };
      return;
    }
    const value = await (await ctx.request.body()).value;
    if (!value?.name || !value?.email || !value?.job || !value?.age) {
      ctx.response.status = 404;
      ctx.response.body = { error: "name, email, job and age are required" };
      return;
    }
    const data = await dbCollection.insertOne(value);
    ctx.response.body = data;
  },
  deleteUser: async (ctx: any) => {
    const user = await dbCollection.findOne({ _id: { $oid: ctx.params.id } });
    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User doesn't exit to delete!" };
      return;
    }
    await dbCollection.deleteOne(user);
    ctx.response.body = { message: "User was deleted" };
  },
  updateUser: async (ctx: any) => {
    const value = await(await ctx.request.body()).value;
    if (!ctx.request.hasBody) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Please fill all fields before to update" };
      return;
    }
    if (!value?.name || !value?.email || !value?.job || !value?.age) {
      ctx.response.status = 404;
      ctx.response.body = { error: "name, email, job and age are required to update" };
      return;
    }
    const data = await dbCollection.updateOne(
      { _id: { $oid: ctx.params.id } },
      { $set: { ...value } }
    );
    ctx.response.body = { message: "user updated", value };
  },
};
