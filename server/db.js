import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import {MongoClient, ServerApiVersion } from 'mongodb';


// export async function connectDb() {
//     try {
//         const db = await mongoose.connect(MONGODB_URI);
//         console.log('connected to', db.connection.name);
//       } catch (error) {
//         console.log(error);
//       }
// }



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
console.log(MONGODB_URI);
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// connectDb().catch(console.dir);
