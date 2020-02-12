const mongoose = require("mongoose");

const DbManager = async () => {
  return await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = DbManager;
