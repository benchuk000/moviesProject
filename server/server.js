const express    = require('express');
const app        = express();
const path       = require('path');
const config     = require('./config');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());

app.use(require('./routes'));

mongoose.connect(config.MONGO_URI);

app.listen(config.PORT, () => {
    console.log(`Live at Port ${config.PORT}`);
});
