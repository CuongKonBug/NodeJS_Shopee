const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://NodeJS_Shopee:CuongKon1712@cluster0.irbi0.mongodb.net/Shopee",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connect successfully!!");
  } catch (error) {
    console.log("Connect failure!!");
  }
}
module.exports = { connect };
