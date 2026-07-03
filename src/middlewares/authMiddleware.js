export const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect(
      `/login?message=${encodeURIComponent("Silakan login terlebih dahulu untuk melakukan pemesanan.")}`
    );
  }

  next();
};