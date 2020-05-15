/**
 * Routes module for api requests.
 * @module api-routes
 */

/** Requiring our models as we've configured it */
const db = require("../../models");
/**
 * Blend two colors together.
 */
const passport = require("../../config/passport");
const {
  userLogin,
  userSignUp,
  userLogout,
  userData,
} = require("../handlers/api-handler");

/**
 * Blend two colors together.
 * @param {object} app - The first color, in hexadecimal format.
 * @return The blended color.
 */
module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), userLogin);
  app.post("/api/signup", userSignUp);
  app.get("/logout", userLogout);
  app.get("/api/user_data", userData);
};
