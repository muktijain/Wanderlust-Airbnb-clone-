const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { reviewSchema } = require("./review.js");
const { number } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
    price: Number,
    location: String,
    country: String,
    reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      'Trending', 
      'Rooms', 
      'Iconic cities', 
      'Beach', 
      'Amazing pools', 
      'Lakefront', 
      'Camping', 
      'Farms', 
      'Activities'
    ],
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;