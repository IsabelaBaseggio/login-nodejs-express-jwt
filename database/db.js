const mongoose = require("mongoose");

const connectDB = async () => {
  try { 
    const conn = await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas Connected");
} catch(err) {
  console.log(err);
}
}

module.exports = connectDB;
