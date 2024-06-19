const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');



const app = express();
const port = process.env.PORT || 8000;

// routes middleware
app.use(userRoutes);

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});