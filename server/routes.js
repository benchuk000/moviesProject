const express  = require('express');
const router   = express.Router();

router.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

router.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'));
router.get('/', (req, res) => res.sendFile(__dirname + '/dist/registration.html'));

module.exports = router;
