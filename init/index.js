const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
    console.log("connected to DB");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoUrl);
};

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "6902214bc80c0e4a81f90e2f",
        }
    ));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDb();

