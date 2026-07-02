export const index = async (req, res, next) => {
  try {
    res.render("user/index", {
      title: "Home",
    });
  } catch (error) {
    next(error);
  }
};