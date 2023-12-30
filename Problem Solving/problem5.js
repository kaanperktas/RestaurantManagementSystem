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

    const ratingsCollection = db.collection("Comments");


    const restaurantCollectionCollection = db.collection("Restaurants");


    const highRatedRestaurants = await ratingsCollection
      .aggregate([
        {
          $match: { rating: { $gte: 4 } }
        },
        {
          $lookup: {
            from: "Restaurants",
            localField: "restaurantId",
            foreignField: "_id",
            as: "restaurantInfo"
          }
        },
        {
          $match: {
            $or: [
              { "restaurantInfo.name": "Fast Food" },
              { "restaurantInfo.name": "Ev Yemekleri" },
              { description: /fast/i }
            ]
          }
        },
        {
          $project: { name: 1, restaurant: "$restaurantInfo.name", description: 1 }
        }
      ])
      .toArray();

    console.log("4 puan üstü ve belirli kriterlere uyan restoranlar:", highRatedRestaurants);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
