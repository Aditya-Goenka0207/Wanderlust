const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ===== Specific routes FIRST =====

// New Listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Optional: Search route (if you implement search)
router.get("/search", wrapAsync(listingController.searchListings));

// ===== Index & Create =====
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("image"),
    wrapAsync(listingController.createListing),
  );

// ===== Dynamic routes (:id) =====
router
  .route("/:id")
  // Show route
  .get(wrapAsync(listingController.showListing))
  // Update route
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    upload.single("image"),
    wrapAsync(listingController.updateListing),
  )
  // Delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit route (after :id)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;