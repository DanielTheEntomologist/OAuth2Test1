import express from "express";
const router = express.Router();

const isAuthenticatedUserMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/user/no-permission");
  }
  next();
};

const createUserDataMiddleware = (req, res, next) => {
  const userData = {
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.emails[0].value,
    photo: req.user.photos[0].value,
  };
  req.user = userData;

  next();
};

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

// Set up authentication middleware
router.use(isAuthenticatedUserMiddleware);
// Beyond this point, only authenticated users can access the routes

router.use(createUserDataMiddleware);

router.get("/logged", (req, res) => {
  res.render("logged", { user: req.user });
});

router.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

router.get("/settings", (req, res) => {
  res.render("settings", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Redirect or handle the logout success
    res.redirect("/");
  });
});
export default router;
