const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const todoRoutes = require("./routes/todo.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// app.use("api/auth")
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

module.exports = app;
