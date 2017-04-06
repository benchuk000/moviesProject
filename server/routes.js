const express  = require('express');
const router   = express.Router();
const multer   = require('multer')
const upload   = multer({ dest: '../public/music/' });
const path     = require('path');

router.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

const auth = require('./controllers/auth');
router.post('/login', auth.authenticate);

const user = require('./controllers/user');
router.get('/user', user.getUsers);
router.get('/user/:id', user.getUserById);
router.post('/user', upload.any(), user.createUser);
router.put('/user/:id', upload.any(), user.updateUserById);
router.delete('/user/:id', user.deleteUserById);
router.get('/user/search/simple', user.getUsersByCriteria);

const movie = require('./controllers/movie');
router.get('/movie', movie.getMovies);
router.get('/movie/:id', movie.getMovieById);
router.post('/movie', upload.any(), movie.createMovie);
router.put('/movie/:id', upload.any(), movie.updateMovieById);
router.delete('/movie/:id', movie.deleteMovieById);
router.get('/movie/search/simple', movie.getMoviesByCriteria);

module.exports = router;
