/**
 * @module isAuthenticated
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @description
 * Routes module for api requests.
 *
 * ```
 *  if (req.user) {
 *     return next();
 * }
 *
 * return res.redirect("/");
 * ```
 */

// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function (req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};
