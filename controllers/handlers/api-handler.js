/**
 * Handlers module for api requests.
 * @module api-handlers
 */

module.exports = {
  /**
   * Blend two colors together.
   * @param {object} req - The first color, in hexadecimal format.
   * @param {object} res - The second color, in hexadecimal format.
   * @return {object} The blended color.
   */
  userLogin: (req, res) => {
    return res.json(req.user);
  },
  userSignUp: (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },
  userLogout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
  userData: (req, res) => {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  },
};
