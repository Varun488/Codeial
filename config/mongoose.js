const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_Development');

const db = mongoose.connection;

db.on('error',console.error.bind(console, "error connecting to mongodb"));

db.once('open', function(){
    console.log("connected to database :: MongoDB");
});

module.exports = db;