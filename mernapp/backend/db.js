// getting-started.js
const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://goFood:goFood123@cluster0.rqiipd4.mongodb.net/goFood?retryWrites=true&w=majority`

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database Connected!');
    
    const fetched_data = await mongoose.connection.db.collection("food_items");

    // Corrected code: await the toArray() promise and then log the data.
    global.foodItems = await fetched_data.find({}).toArray();

    const foodcategory = await mongoose.connection.db.collection("food_category");
    global.foodCategory = await foodcategory.find({}).toArray();


    // const data = await fetched_data.find({}).toArray();
    // console.log(data);
    
    // Object.values(data).forEach(val => {
    //   global.foodItems = val;
    //   // console.log(global.foodItems)

    // });


    // fetched_data.find({}).toArray(function (err, data) {
    //   console.log('Rintint gherere');
    //   if (err) console.log(err);
    //   else {
    //     global.food_items = data;
    //     console.log(global.food_items);
    //   }
    // });
  } catch (error) {
    console.log('err: ', error);
  }
};

module.exports = mongoDB();