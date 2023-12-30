
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://kaan:<password>.@cluster0.5l3kqsz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("RestaurantManagement");

    await db.createCollection("Users");
    await db.createCollection("Restaurants");
    await db.createCollection("Orders");
    console.log("Collection created successfully!");

  } finally {
    await client.close();
  }
}

run().catch(console.dir);

