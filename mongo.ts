import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb+srv://emmadal:ANyXsStOSwhFvlZP@cluster0.ikkhm.mongodb.net/Deno?retryWrites=true&w=majority");
const db = client.database("Deno");

export default db;