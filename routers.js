const express = require('express');
const logger = require('morgan');

const ListManager = require('./list-manager.js');

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
    ListManager.AddEntry(req.body.addEntry);
    res.render('list-entries');
})

app.post('/Delete', function(req, res) {
    ListManager.DeleteEntry(req.body.deleteEntry);
    res.render('list-entries', { ListEntries: ListManager.ListEntries });
})

app.listen(3000, function() {
    console.log("Server has been started.");
});