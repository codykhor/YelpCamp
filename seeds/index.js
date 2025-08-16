const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random].city}, ${cities[random].state}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      price,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium assumenda consequatur culpa deserunt dolore et facilis illum minima molestiae molestias optio placeat porro quae quo, repudiandae sed sit ut.',
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
