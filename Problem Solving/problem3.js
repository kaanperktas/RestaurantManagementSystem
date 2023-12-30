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
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const db = client.db("RestaurantManagement");

      const menuCollection = db.collection("Restaurants");

      await menuCollection.deleteMany({});

      const newMenuItems = [
        { name: "Küçük boy peynirli pizza", price: 50 },
        { name: "Orta boy mantarlı pizza", price: 100 },
        { name: "Hamburger", price: 120 }
      ];

      await menuCollection.insertMany(newMenuItems);

      console.log("Menü başarıyla eklendi.");
    });
  } finally {
    await session.endSession();
    await client.close();
  }
}

run().catch(console.dir);
