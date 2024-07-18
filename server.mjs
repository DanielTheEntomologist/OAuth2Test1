import express from "express";
import cors from "cors";
import path from "path";
import { engine } from "express-handlebars";

import passport from "./config/passport.mjs";
// import Strategy from "passport-google-oauth20";
import session from "express-session";

const app = express();

const __dirname = path.resolve();

app.engine(
  "hbs",
  engine({ extname: "hbs", layoutsDir: "./layouts", defaultLayout: "main" })
);
app.set("view engine", ".hbs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/logged", (req, res) => {
  res.render("logged");
});

app.get("/user/no-permission", (req, res) => {
  res.render("noPermission");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/no-permission" }),
  (req, res) => {
    res.redirect("/user/logged");
  }
);

app.use("/", (req, res) => {
  res.status(404).render("notFound");
});

app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
