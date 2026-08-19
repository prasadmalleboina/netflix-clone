const express = require("express");

const {
    userRegister,
    userLogin
} = require("../controller/authController");


const {
    viewAllMovies,
    viewAllGenres,
    moviesByGenre,
    viewMovie,
    giveRating,
    searchMovies,
    addToMyList,
    removeFromMyList,
    viewMyList,
    checkMyList,
    getProfile,
    addContinueWatching,
    viewContinueWatching

    

} = require("../controller/userController");


const {
    verifyToken
} = require("../middleware/authenticateMiddleware");


const router = express.Router();


// ================= AUTH =================

router.post("/register", userRegister);

router.post("/login", userLogin);


// ================= MOVIES =================

router.get("/viewAllMovies", viewAllMovies);

router.get("/viewAllGenres", viewAllGenres);

router.get("/moviesByGenre/:genre", moviesByGenre);

router.get("/viewMovie/:id", viewMovie);

router.get("/searchMovies", searchMovies);

router.post('/mylist/:movieId', verifyToken, addToMyList);


// ================= RATING =================

router.post("/rating/:id", verifyToken, giveRating);


// ================= MY LIST =================

// Add movie to My List
router.post(
    "/addToMyList",
    verifyToken,
    addToMyList
);


// Remove movie from My List
router.delete(
    "/removeFromMyList/:movieId",
    verifyToken,
    removeFromMyList
);


// View logged-in user's My List
router.get(
    "/myList",
    verifyToken,
    viewMyList
);

router.get(
    "/mylist/check/:movieId",
    verifyToken,
    checkMyList
);
router.get("/profile", verifyToken, getProfile);
router.post(
  "/continue-watching/:movieId",
  verifyToken,
  addContinueWatching
);

router.get(
  "/continue-watching",
  verifyToken,
  viewContinueWatching
);

module.exports = router;