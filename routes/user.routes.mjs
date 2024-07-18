import express from "express";
const router = express.Router();

const isAuthenticatedUserMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/user/no-permission");
  }
  next();
};

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

// Set up authentication middleware
router.use(isAuthenticatedUserMiddleware);
// Beyond this point, only authenticated users can access the routes

router.get("/logged", (req, res) => {
  res.render("logged");
});

export default router;
