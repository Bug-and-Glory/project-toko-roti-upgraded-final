export const index = async (req, res, next) => {
  try {
    res.render("user/index", {
      title: "Home",
      user: req.session.user || null,
    });
  } catch (error) {
    next(error);
  }
};