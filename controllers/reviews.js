const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!req.body.review) {
    req.flash("error", "Review cannot be empty!");
    return res.redirect(`/listings/${req.params.id}`);
  }

  let newReview = new Review(req.body.review);

  if (!req.user) {
    req.flash("error", "You must be logged in to add review!");
    return res.redirect("/login");
  }

  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
  let { id, reviewId } = req.params;

  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  let deletedReview = await Review.findByIdAndDelete(reviewId);
  if (!deletedReview) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
