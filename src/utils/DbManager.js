

const mongoose = require("mongoose");


console.log(process.env.MONGO_SRV);
const DbManager = async () => {
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
     console.log("db connected: ", db);
  return db;
};

module.exports = DbManager;
