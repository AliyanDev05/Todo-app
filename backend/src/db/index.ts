import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    const MongoUri = process.env.MONGO_URI;

    if (!MongoUri) {
      throw new Error("MongoUri is not defined in .env");
    }
    await mongoose.connect(MongoUri);
    console.log("DB connection successfull ✔");
  } catch (error) {
    console.error(error, "connection Failed ❌");
    throw error;
  }
};

export default ConnectDb;
