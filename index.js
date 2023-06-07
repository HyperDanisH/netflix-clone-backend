const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const authRoute = require('./routes/auth');
const app = express();
let Port = 5000;
dotenv.config();
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/lists", require("./routes/lists"));
// app.use("/api/auth",authRoute);

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected Successfully");
}).catch((err) => {
    console.log(err);
});



app.listen(Port, () => {
    console.log(`Backend Server Is Running On ${Port}`)
})