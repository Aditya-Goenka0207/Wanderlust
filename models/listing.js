const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: {
      type: String,

      default: "https://res.cloudinary.com/demo/image/upload/v1/sample.jpg",
    },
    filename: String,
  },

  price: {
    type: Number,

    min: 0,
  },

  location: String,

  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",

    required: true,
  },

  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'

      required: false,
    },

    coordinates: {
      type: [Number],

      required: false,
    },
  },

  // category : {
  //   type : String,
  //   enum : ["mountains" ,"arctic","farms","deserts"],
  // },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing && listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
