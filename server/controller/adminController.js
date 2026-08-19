const { prisma } = require("../utils/dbConnector");

exports.viewAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).send({
      status: true,
      data: users,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin account cannot be deleted"
            });
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.log("DELETE USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

exports.addMovie = async (req, res) => {
  try {

    const {
      title,
      desc,
      year,
      url,
      movieUrl,
      bannerUrl,
      rating,
      genreId
    } = req.body;


    const movie = await prisma.movies.create({

      data: {

        title,
        desc,
        year,

        // Trailer URL
        url,

        // Actual Movie URL
        movieUrl,

        // Banner URL
        bannerUrl,

        rating,

        genre: {
          connect: {
            id: genreId,
          },
        },

      },

      include: {
        genre: true,
      },

    });


    res.status(201).json({

      success: true,

      message: "Movie added successfully",

      movie,

    });


  } catch (err) {

    console.log("Add Movie Error:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }
};

exports.addGenre = async (req, res) => {
  try {
    const { name } = req.body;

    const genre = await prisma.genre.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      success: true,
      message: "Genre created successfully",
      genre,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.viewGenre = async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({});

    res.status(200).json({
      status: true,
      data: genres,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Error retrieving genres",
    });
  }
};

exports.viewMovies = async (req, res) => {
  try {
    const movies = await prisma.movies.findMany({
      include: {
        genre: true,
      },
    });

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.editMovie = async (req, res) => {
  try {

    const {
      id,
      title,
      desc,
      year,
      url,
      movieUrl,
      bannerUrl,
      rating,
      genreId,
    } = req.body;


    const movie = await prisma.movies.update({

      where: {
        id,
      },

      data: {

        title,

        desc,

        year,

        // Trailer URL
        url,

        // Actual Movie URL
        movieUrl,

        bannerUrl,

        rating,

        genre: genreId
          ? {
              connect: {
                id: genreId,
              },
            }
          : undefined,
      },

      include: {
        genre: true,
      },

    });


    res.status(200).json({

      success: true,

      message: "Movie updated successfully",

      movie,

    });

  } catch (err) {

    console.log("Edit Movie Error:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }
};
exports.deleteMovie = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedMovie = await prisma.movies.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: deletedMovie,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedGenre = await prisma.genre.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Genre deleted successfully",
      data: deletedGenre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.MovieByGenre = async (req, res) => {
  try {

    const { id } = req.params;

    const movies = await prisma.movies.findMany({
      where: {
        genreId: id,
      },
      include: {
        genre: true,
      },
    });

    res.status(200).json(movies);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });

  }
};