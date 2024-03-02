const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://AdnanMohi:yIww3XXPQQWMYwCZ@cluster0.l9xamgj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });
// Create a schema
const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
});
// Create a model
const Products = mongoose.model('Products', productSchema);




    // Fetch data from API
axios.get(' https://s3.amazonaws.com/roxiler.com/product_transaction.json')
    
.then(response => {
        
    })
    .catch(error => {
        console.log(error);
    });


// Fetch data from API and save to MongoDB
app.get('/api/data', async (req, res) => {
    try {
       const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const products = response.data;
        await Products.insertMany(products);
        res.status(200).json({ message: 'Database initialized successfully',products });
        //console.log('Data fetched and saved to MongoDB');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

// now creating 5 api's as per the assignment

  // Fetch data from MongoDB
app.get('/api/products', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });



app.get('/', (req, res) => {
  res.send('Hello From Server!');
});

app.listen(port, () => {
  console.log(`Server listening at:${port}`);
});
