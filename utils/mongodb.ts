import { MongoClientOptions } from "mongodb";
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

// [CANNOT WORK] import "../server/models/demoModel";

const uri = process.env.DATABASE_URL!;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

let client;
let clientPromise;

if (!process.env.DATABASE_URL) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  // todo global._mongoClientPromise
  //@ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise as Promise<MongoClient>;