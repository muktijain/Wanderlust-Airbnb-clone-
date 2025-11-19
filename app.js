if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require ("express-session");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


const  listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.json());
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"public")));

const sessionOptions = {
    secret: "myCoOkies0503@code%",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    //Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

let mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then( () => {
    console.log("connected to DB");
    })
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect(mongoUrl);
};

    //Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

    //Express 5 middleware
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page not Found."));
});

app.use((err, req, res, next) => {
    let { statusCode=500 } = err;
    if (!err.message) {
        err.message = "Something went wrong!"
    };
    res.status(statusCode).render("error.ejs",{ err });
});

app.get("/", (req, res) => {
    console.log("This is root");
    res.send("Welcome to Wanderlust!");
});

app.listen(8080, () => {
    console.log("Server is listening ");
});