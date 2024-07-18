import express from "express";
import cors from "cors";
import path from "path";
import { engine } from "express-handlebars";

import passport from "./config/passport.mjs";
import session from "express-session";

import userRoutes from "./routes/user.routes.mjs";
import authRoutes from "./routes/auth.routes.mjs";

// initialize express
const app = express();

const __dirname = path.resolve();

// set rendering engine
app.engine(
  "hbs",
  engine({ extname: "hbs", layoutsDir: "./layouts", defaultLayout: "main" })
);
app.set("view engine", ".hbs");

// set up generic middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

// set up session  and passport middlewares
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/", (req, res) => {
  res.status(404).render("notFound");
});

// start listening to port
app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
