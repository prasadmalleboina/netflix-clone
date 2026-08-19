const { prisma } = require("../utils/dbConnector");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.viewAllMovies = async (req, res) => {
  try {

    const movies = await prisma.movies.findMany({
      include: {
        genre: true,
      },
    });

    res.status(200).send({
      status: true,
      data: movies,
    });

  } catch (err) {

    console.log("VIEW ALL MOVIES ERROR:", err);

    res.status(500).send({
      status: false,
      message: err.message,
    });

  }
};
exports.searchMovies = async (req, res) => {
  try {

    const { search } = req.query;

    const movies = await prisma.movies.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        genre: true,
      },
    });

    res.status(200).send({
      status: true,
      data: movies,
    });

  } catch (err) {

    res.status(500).send({
      status: false,
      message: err.message,
    });

  }
};


exports.viewAllGenres = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      // include: {
      //   movies: true
      // }
    });
    res.status(200).send({ genres });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving genres' });
  }
};

exports.moviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;               // pass the genre name in the url for testing..!!
    const genreData = await prisma.genre.findFirst({
      where: { name: genre },
      include: { movies: true }
    });
    if (!genreData) return res.status(404).send({ message: "Genre not found" });
    res.send({ genre: genreData.name, movies: genreData.movies });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


exports.viewMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await prisma.movies.findUnique({
      where: { id },
      include: { genre: true }
    });
    if (!movie) return res.status(404).send({ message: "Movie not found" });
    res.send({ movie });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


exports.giveRating = async (req, res) => {
    try {

        const { id } = req.params;
        const { score } = req.body;

        if (!score || score < 1 || score > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        const movie = await prisma.movies.findUnique({
            where: {
                id,
            },
        });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }

        const updatedMovie = await prisma.movies.update({
            where: {
                id,
            },
            data: {
                rating: Number(score),
            },
            include: {
                genre: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "Rating submitted successfully",
            movie: updatedMovie,
        });

    } catch (err) {

        console.log("Rating Error:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};
// ================= ADD MOVIE TO MY LIST =================

exports.addToMyList = async (req, res) => {
  try {

    const { movieId } = req.params;

    // User ID from login/auth middleware
    const userId = req.user.id;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Movie ID is required",
      });
    }


    // Check movie exists

    const movie = await prisma.movies.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }


    // Check if already in My List

    const existing = await prisma.myList.findFirst({
      where: {
        userId,
        movieId,
      },
    });


    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Movie already in My List",
      });
    }


    // Add movie

    const myList = await prisma.myList.create({
      data: {
        userId,
        movieId,
      },

      include: {
        movie: {
          include: {
            genre: true,
          },
        },
      },
    });


    res.status(201).json({
      success: true,
      message: "Movie added to My List",
      myList,
    });


  } catch (err) {

    console.log("Add My List Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};



// ================= REMOVE FROM MY LIST =================

exports.removeFromMyList = async (req, res) => {
  try {

    const { movieId } = req.params;

    const userId = req.user.id;


    const existing = await prisma.myList.findFirst({
      where: {
        userId,
        movieId,
      },
    });


    if (!existing) {

      return res.status(404).json({
        success: false,
        message: "Movie is not in My List",
      });

    }


    await prisma.myList.delete({
      where: {
        id: existing.id,
      },
    });


    res.status(200).json({
      success: true,
      message: "Movie removed from My List",
    });


  } catch (err) {

    console.log("Remove My List Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};



// ================= VIEW MY LIST =================

exports.viewMyList = async (req, res) => {
  try {

    const userId = req.user.id;


    const myList = await prisma.myList.findMany({

      where: {
        userId,
      },

      include: {
        movie: {
          include: {
            genre: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

    });


    res.status(200).json({
      success: true,
      data: myList,
    });


  } catch (err) {

    console.log("View My List Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
exports.checkMyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.params;

        const existing = await prisma.myList.findFirst({
            where: {
                userId,
                movieId,
            },
        });

        res.status(200).json({
            success: true,
            inMyList: !!existing,
        });

    } catch (err) {
        console.log("Check My List Error:", err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.getProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            myList: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        myListCount: user._count.myList,
      },
    });

  } catch (err) {

    console.log("Profile Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// ================= ADD / UPDATE CONTINUE WATCHING =================

exports.addContinueWatching = async (req, res) => {
  try {

    const userId = req.user.id;
    const { movieId } = req.params;

    const {
      progress = 0,
      duration = 0
    } = req.body;

    const movie = await prisma.movies.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const existing = await prisma.continueWatching.findFirst({
      where: {
        userId,
        movieId,
      },
    });

    let item;

    if (existing) {

      item = await prisma.continueWatching.update({
        where: {
          id: existing.id,
        },
        data: {
          progress: Number(progress),
          duration: Number(duration),
          watchedAt: new Date(),
        },
      });

    } else {

      item = await prisma.continueWatching.create({
        data: {
          userId,
          movieId,
          progress: Number(progress),
          duration: Number(duration),
        },
      });

    }

    res.status(200).json({
      success: true,
      message: "Continue Watching updated",
      item,
    });

  } catch (err) {

    console.log("Continue Watching Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ================= VIEW CONTINUE WATCHING =================

exports.viewContinueWatching = async (req, res) => {
  try {

    const userId = req.user.id;

    const items = await prisma.continueWatching.findMany({
      where: {
        userId,
      },

      include: {
        movie: {
          include: {
            genre: true,
          },
        },
      },

      orderBy: {
        watchedAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: items,
    });

  } catch (err) {

    console.log("View Continue Watching Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
