

import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import dashboardRoutes from './routes/dashboardRoutes.mjs';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import { pass } from './config/passport.mjs';
import { ensureAuthenticated } from './config/auth.mjs';
pass(passport);


const app = express();

// Connecting to db
const mongodb = 'mongodb://localhost/elibDB';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
        console.log("I'm ready, boss...");
    })
    .catch(err => console.log(err));

//connect2db();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('err_msg');
    res.locals.error = req.flash('error');
    next();
});
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/user', userRoutes);
app.use('/dashboard', ensureAuthenticated, dashboardRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});
