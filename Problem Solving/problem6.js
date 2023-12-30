const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB bağlantı dizesi, kendi bağlantı dizenize göre güncelleyin
const mongoURI = 'mongodb://kaan:<password>.@cluster0.5l3kqsz.mongodb.net/RestaurantManagement';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Restoran şeması
const restaurantSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  // Diğer alanlar...
});

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

// Middleware'ler
app.use(cors());
app.use(bodyParser.json());

// Pagination ve puan ortalamasına göre sıralama endpoint'i
app.get('/restaurants', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Restoranları puan ortalamasına göre sırala
    const restaurants = await Restaurant.find({})
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sunucu başlatma
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
