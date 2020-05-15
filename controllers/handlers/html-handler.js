/**
 * Handlers module for api requests.
 * @module html-handlers
 */

/** Requiring path to so we can use relative routes to our HTML files*/
const path = require("path");

module.exports = {
  /**
   * Blend two colors together.
   * @param {object} req - The first color, in hexadecimal format.
   * @param {object} res - The second color, in hexadecimal format.
   * @return {object} The blended color.
   */
  getSignup: (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../../public/signup.html"));
  },
  getLogin: (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../../public/login.html"));
  },
  getMembers: (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/members.html"));
  },
};
