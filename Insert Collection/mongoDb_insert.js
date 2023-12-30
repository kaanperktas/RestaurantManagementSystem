const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://kaan:<password>.@cluster0.5l3kqsz.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//problem1
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("RestaurantManagement");

    const usersCollection = db.collection("Users");

    const restaurantsCollection = db.collection("Restaurants");

    const ordersCollection = db.collection("Orders");


    const newOrders = [
        {
            addresses : [
                {
                    city: "İstanbul",
                    fullAddress: "Beyoğlu"
                }
            ],
            restaurantName:"Voco_Fast_Food",
            comment : "Yediğim en iyi hamburgerdi",
            rating : 8,
            commentDate : "2023-01-02",
            orderItems : [
                {
                    itemName : "Hamburger",
                    quantity : 2
                }
            ]
        },
        {
            addresses : [
                {
                    city: "Kahramanmaras",
                    fullAddress: "Elbistan"
                }
            ],
            restaurantName:"Kucukler",
            comment : "Bu kadar iyi kebapı nasıl yapabildiniz...",
            rating : 9,
            commentDate : "2023-01-02",
            orderItems : [
                {
                    itemName : "Adana",
                    quantity : 4
                }
            ]
        }
        
    ]

    const newRestaurants = [
        {
            name : "Voco_Fast_Food",
            description : "Hizli ve hemen ye",
            logo : "Voco_url",
            address : {
                city : "İstanbul",
                district : "Avrupa",
                fullAddress: "Beyoğlu",
                location : {
                    type : "Point",
                    coordinates : [41.0369, 28.9858]
                }
            },
            branches : [
                {
                    city: "İstanbul",
                    district : "Avrupa",
                    fullAddress : "Bebek",
                    location : {
                        type : "Point",
                        coordinates : [40.05604, 34.7664]
                    }
                },
                {
                    city: "İstanbul",
                    district : "Anadolu",
                    fullAddress : "Caddebostan",
                    location : {
                        type : "Point",
                        coordinates : [40.968468, 29.065510]
                    }
                }
            ],
            menu : [
                {
                    name : "Hamburger",
                    price : 90,
                    ingredients : ["kofte","marul","domates"],
                    coverImage : "hamburger_url"
                }
            ],
            restaurantTypes : ["Fast Food"]
        },
        {
            name : "Kucukler",
            description : "Lahmacun-Kebap",
            logo : "Kucukler_url",
            address : {
                city : "Kahramanmaras",
                district : "Akdeniz",
                fullAddress: "Elbistan",
                location : {
                    type : "Point",
                    coordinates : [37.0369, 26.9858]
                }
            },
            branches : [
                {
                    city: "Kahramanmaras",
                    district : "Akdeniz",
                    fullAddress : "Afsin",
                    location : {
                        type : "Point",
                        coordinates : [37.25604, 26.9664]
                    }
                },
                {
                    city: "Ankara",
                    district : "İç Anadolu",
                    fullAddress : "Kızılay",
                    location : {
                        type : "Point",
                        coordinates : [36.968468, 27.065510]
                    }
                }
            ],
            menu : [
                {
                    name : "Lahmacun",
                    price : 90,
                    ingredients : ["kıyma","soğan","domates"],
                    coverImage : "lahmacun_url"
                }
            ],
            restaurantTypes : ["Lahmacun&Kebap"]
        },
    ];
    
    const newUsers = [
        {
          name: "Kaan",
          password: "kaan2",
          email: "kaan@example.com",
          age: 22,
          gender: "male",
          addresses: [
            {
              street: "Kizilay",
              city: "Ankara",
              country: "Türkiye",
            }
          ]
        },
        {
          name: "Ayşe",
          password: "ayse2",
          email: "ayse@example.com",
          age: 23,
          gender: "female",
          addresses: [
            {
              street: "Kadikoy",
              city: "Istanbul",
              country: "Türkiye",
            }
          ]
        },
        {
            name: "Ahmet",
            password: "ahmet2",
            email: "ahmet@example.com",
            age: 24,
            gender: "male",
            addresses: [
              {
                street: "Ceyhan",
                city: "Adana",
                country: "Türkiye",
              }
            ]
          },
      ];

    
    const result = await usersCollection.insertMany(newUsers);
    console.log(`${result.insertedCount} user successfully added.`);

    const resultRestaurant = await restaurantsCollection.insertMany(newRestaurants);
    console.log(`${resultRestaurant.insertedCount} restaurant successfully added.`);

    const resultOrders = await ordersCollection.insertMany(newOrders);
    console.log(`${resultOrders.insertedCount} orders successfully added.`)

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
