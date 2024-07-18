import express from "express";
import cors from "cors";
import path from "path";
import { engine } from "express-handlebars";

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

app.use("/", (req, res) => {
  res.status(404).render("notFound");
});

app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
