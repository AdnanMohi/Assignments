require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const DataModel = require('./models/data');
const cors = require('cors');

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB is connected successfully');
    insertData(); 
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

function insertData() {
  try {
    const jsonData = fs.readFileSync('jsondata.json', 'utf8');
    const data = JSON.parse(jsonData);

    // Insert data into MongoDB by using Mongoose model
    DataModel.insertMany(data)
      .then((docs) => {
        console.log('Data inserted successfully:');
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
     
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
  }
}

const app = express();
const port = process.env.PORT;

app.use(cors());

// Define a basic route
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
    console.log('API is working');
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
