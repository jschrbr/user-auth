// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model

module.exports = function (sequelize, DataTypes) {
  /**
   * A module representing a user.
   * @exports user
   */
  const User = sequelize.define("User", {
    /**
     * @name email
     * @prop {object} type - Expects email to be type string
     * @prop {bool} allowNull - Refuses to create entry without email parameter
     * @prop {bool} unique - Refuses to create duplicate entry of email address
     * @prop {bool} validate - Refuses to create entry that does not match email format.
     */
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    /**
     * @name password
     * @prop {object} type - Expects password to be type string
     * @prop {bool} allowNull - Refuses to create entry without email parameter
     */
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  /** Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
   * @param {string} password - The password entered during the sign-in attempt.
   * @returns {bool} - Returns the boolean of whether the entered password matches the Users hashed password.
   */

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  /**Hook will automagically hash the password before a User is created.
   * @method addHook
   * @param {String} beforeCreate - Method runs before a User is created
   * @param {function} hashPassword - Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
   */
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
