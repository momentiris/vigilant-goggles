const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'views/home')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home/index.pug'));
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () =>
    console.log(`Client listening on port ${PORT}`)
);
