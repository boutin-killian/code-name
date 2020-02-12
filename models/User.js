const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullname: mongoose.Schema.Types.String,
    mail: mongoose.Schema.Types.String,
    pwd: mongoose.Schema.Types.String
});

module.exports = mongoose.model("User", UserSchema);