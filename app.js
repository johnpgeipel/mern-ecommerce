const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('hello from node');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})