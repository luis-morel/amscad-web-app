// Importing 'bcrypt-nodejs' for password hashing\security.
var bcrypt = require("bcrypt-nodejs");

// Users model
module.exports = function (sequelize, DataTypes) {

  // Users table definition
  var Users = sequelize.define("Users", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userImageUrl: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }); // End of Users table definition

  // User password validation
  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Hash-encrypt password for new user accounts
  Users.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return Users;

}; // End of Users model
