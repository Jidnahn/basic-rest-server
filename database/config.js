const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => console.log(error)
    );

    console.log("Database online");
  } catch (error) {
    throw new Error("Error at database connection");
  }
};

module.exports = {
  dbConnection,
};
