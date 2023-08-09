const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose')
// used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
     src: './assests/scss',
     dest: './assests/css',
     debug: true,
     outputStyle: 'extended',
     prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assests'));
app.use(expressLayout);





// extract style and script from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store session cookie in db
app.use(session({
    name: 'codeial',
    //TODO change secret before deploying to production
    secret: 'something',
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: (1000 * 60 * 100 )
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// routes

app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server is running: ${port}`)
})