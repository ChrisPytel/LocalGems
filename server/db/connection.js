import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("\nPinged your deployment. You successfully connected to MongoDB! 🍃");
} catch(err) {
  console.log("\nOops, unable to establish connection to MongoDB! 🍂");
  console.error(err);
}

let db = client.db("LocalGems");

export default db;