import express from "express";
const router = express.Router();

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

router.get("/logged", (req, res) => {
  res.render("logged");
});

export default router;
