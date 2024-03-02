const {Schema, model,mongoose} = require('mongoose')
// Define schema for your MongoDB collection
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Define a model based on the schema
const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel