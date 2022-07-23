import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import dashboardRoutes from "./routes/dashboardRoutes.mjs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

// Connecting to db
const mongodb = "mongodb://localhost/elibDB";
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("I'm ready, boss...");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
