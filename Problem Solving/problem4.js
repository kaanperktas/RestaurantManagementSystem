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

    const reviewsCollection = db.collection("Comments");

    const latestMaleUsers = await reviewsCollection
      .find({ gender: "Male" })
      .sort({ age: 1 })
      .limit(20)
      .toArray();

    console.log("Son yorum yapan 20 erkek kullanıcı yaşa göre sıralı:", latestMaleUsers);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
