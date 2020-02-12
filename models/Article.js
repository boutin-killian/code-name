const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: mongoose.Schema.Types.String,
    author: mongoose.Schema.Types.DocumentArray,
    publisher: mongoose.Schema.Types.String,
    year: mongoose.Schema.Types.Number,
    price: mongoose.Schema.Types.Decimal128,
    type: mongoose.Schema.Types.String,
    image: mongoose.Schema.Types.String,
    nbSell: mongoose.Schema.Types.Number
})

module.exports = mongoose.model("Article",ArticleSchema);