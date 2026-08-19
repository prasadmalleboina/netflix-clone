const express = require('express');
const { addMovie, addGenre, viewMovies, editMovie, viewAllUsers, viewGenre, deleteMovie, deleteGenre, viewMovieByGenre, MovieByGenre,deleteUser } = require('../controller/adminController');
const { verifyAdmin } = require('../middleware/authenticateMiddleware');
const { adminRegister, adminLogin, adminChangePass } = require('../controller/authController');
const router = express.Router();

router.post('/register',adminRegister);
router.post('/login', adminLogin);  
router.get('/viewAllUsers',verifyAdmin,viewAllUsers);      // middleware passed 
router.post('/addMovie',verifyAdmin, addMovie); 
router.patch('/deleteMovie/:id',verifyAdmin,deleteMovie);
router.post('/addGenre', addGenre);
router.get('/viewGenre',viewGenre);
router.patch('/deleteGenre',verifyAdmin,deleteGenre)
router.patch('/adminChangePass',verifyAdmin, adminChangePass);                      // need to verify this and try it
router.get('/viewMovies',viewMovies); 
router.get('/MovieByGenre/:id',MovieByGenre)    
router.put('/editMovie',verifyAdmin, editMovie);   
router.delete("/deleteUser/:id",verifyAdmin,deleteUser);    // need to verify this and try it

module.exports = router;