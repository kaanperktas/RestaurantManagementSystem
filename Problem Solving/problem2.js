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

    const restaurantCollection = db.collection("Restaurants");

    const nearestRestaurants = await restaurantCollection
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [39.93, 32.85]
            },
            $maxDistance: 5000  
          }
        },
        menu: /lahmacun/i  
      })
      .limit(5) 
      .toArray();

    console.log("En yakın 5 restoran:", nearestRestaurants);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
