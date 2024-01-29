const express = require('express');
const logger = require('morgan');
require('ejs');

const DatabaseChecker = require('check-database.js');
const ListManager = require('list-manager.js');

if (!DatabaseChecker()) {
    console.log("An error occurred while checking the database");
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const CustomLogFormat = ':remote-addr - :method :url :status :response-time ms - :res[content-length]';

app.use(logger(CustomLogFormat));

app.get(['/', '/Home'], function(req, res) {
    res.render('home');
});

app.get('/ListEntries', function(req, res) {
    res.render('list-entries');
})

app.post('/Add', function(req, res) {
    ListManager.addEntry(req.body.addEntry);
    res.render('list-entries');
})

app.post('/Delete', function(req, res) {
    ListManager.addEntry(req.body.deleteEntry);
    res.render('list-entries');
})

app.listen(3000, function() {

});