const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function (email, password, done) {

    console.log("\n<<< Passport.js >>>\n");
    db.Users.find({
      where: { email: email }
    })
      .then((user) => {

        console.log("\nPassport.js >>> user info: ", user);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });

        // Upon successful login, return user info
        return done(null, {
          id: user.id,
          name: user.name,
          title: user.title,
          photo: user.userImageUrl,
          email: user.email
        });

      });
  }));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;