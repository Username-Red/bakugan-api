const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
dotenv.config();
// cors gave me problems last time, this time I'll make sure it works.
const cors = require('cors'); 
const bakuganRoutes = require('./routes/bakugan');
const classicRoutes = require('./routes/classic');
// adding swagger
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

//Middleware
// app.use(cors()); 
app.use(express.json());
// swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))

  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Z-Key, Authorization"
    )
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    )
    next()
  })
  .use(cors({methods: ["GET","POST","DELETE","UPDATE","PUT","PATCH"]}))
  .use(cors({origin: "*"}))
  .use("/", require("./routes/index.js"))

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'));

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), 
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});


//Routes
// app.get('/', (req, res) => {
//   res.send('Bakugan API is running!');
// });

app.use('/bakugan', bakuganRoutes);
app.use('/classic', classicRoutes);

//Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server started on port ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });
