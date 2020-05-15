/**
 * Routes module for api requests.
 * @module html-routes
 */
/** Requiring our custom middleware for checking if a user is logged in*/
const isAuthenticated = require("../../config/middleware/isAuthenticated");

const { getSignup, getLogin, getMembers } = require("../handlers/html-handler");

/**
 * Blend two colors together.
 * @param {object} app - The first color, in hexadecimal format.
 * @return {object} The blended color.
 */
module.exports = function (app) {
  app.get("/", getSignup);
  app.get("/login", getLogin);
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, getMembers);
};
