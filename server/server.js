const express    = require('express');
const app        = express();
const path       = require('path');

app.use(express.static(path.join('../dist')));

app.use(require('./routes'));

app.listen(3000, () => {
    console.log(`Live at Port ${3000}`);
});
