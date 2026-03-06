const mongoose = require("mongoose");
const Listing = require("../../models/listing.js");
const initData = require("./sampleData.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("69287287c56e332e31268438"),
  }));

  await Listing.insertMany(initData.data);

  console.log("Data was initialized");
};
