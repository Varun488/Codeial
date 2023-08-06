const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose')
app.use(express.static('./assests'));
app.use(expressLayout);


app.use(express.urlencoded());
app.use(cookieParser());

// extract style and script from sub pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/',require('./routes'));

app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server is running: ${port}`)
})