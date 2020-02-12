const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: mongoose.Schema.Types.String,
    year: mongoose.Schema.Types.Number,
    price: mongoose.Schema.Types.Number,
    type: mongoose.Schema.Types.String,
    image: mongoose.Schema.Types.String,
    user: mongoose.Schema.Types.String,
    nbSell: mongoose.Schema.Types.Number,
    nbStock: mongoose.Schema.Types.Number
})

module.exports = mongoose.model("Article", ArticleSchema);