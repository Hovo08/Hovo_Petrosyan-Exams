const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/db.mysql.js");
const authRoutes = require("./routes/user.js");
const eventRoutes = require("./routes/events.js"); 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/auth", authRoutes);
app.use("/api", eventRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const startServer = async () => {
  try {
    await sequelize.sync(); 
    app.listen(3008, () => {
      console.log("Сервер запущен на порту 3008");
    });
  } catch (err) {
    console.error("Ошибка подключения к базе данных:", err);
  }
};

startServer();
