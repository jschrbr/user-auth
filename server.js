require("dotenv").config();
/** Requiring express */
const express = require("express");
/** Requiring express-session for use with passport library */
const session = require("express-session");
/** Requiring passport as we've configured it */
const passport = require("./config/passport");
/** Requiring swagger-ui-express server for API documentation. */
const swaggerUi = require("swagger-ui-express");
/** Requiring swaggwer config. for API documentation. */
const swaggerDocument = require("./swagger.json");

/** Setting up port. */
const PORT = process.env.PORT || 8080;
/** Requiring models for syncing. */
const db = require("./models");

/** Creating express app and configuring middleware needed for authentication */
const app = express();

//Setup the express app for parsing json through post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Setup the express app static public folder for web app
app.use(express.static("public"));
//Setup the express app static out folder for documentation
app.use("/docs", express.static("out"));
//Setup the express session for use with passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
//Setup passport session
app.use(passport.initialize());
app.use(passport.session());

//Setup the express app for swagger api docs.
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup({ host: `localhost:${PORT}`, ...swaggerDocument })
);

/** Requiring our routes */
require("./controllers/routes/html-routes.js")(app);
require("./controllers/routes/api-routes.js")(app);

/** Syncing our database and logging a message to the user upon success */
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
