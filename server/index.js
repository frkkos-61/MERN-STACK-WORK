const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const authRouther = require("./routers/auth.js");
const postRouter = require("./routers/post.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/", authRouther);
app.use("/", postRouter);

const PORT = 5454;

// Veritabanı bağlantısını başlatıyoruz
database();

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
