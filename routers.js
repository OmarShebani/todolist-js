const express = require('express');
const logger = require('morgan');

const ListManager = require('./list-manager.js');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const CustomLogFormat = ':remote-addr - :method :url :status :response-time ms';

app.use(logger(CustomLogFormat));

app.get(['/', '/Home'], function(req, res) {
    res.render('home');
});

app.get('/ListEntries', async function(req, res) {
    try {
        const ListEntries = await ListManager.ListEntries();
        res.render('list-entries', { ListEntries });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Status Code 500: Internal Server Error");
    }
});

app.post('/Add', function(req, res) {
    try {
        ListManager.AddEntry(req.body.addEntry);
        res.render('list-entries');

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Status Code 500: Internal Server Error");
    }
});

app.post('/Delete', function(req, res) {
    try {
        ListManager.DeleteEntry(req.body.deleteEntry);
        res.render('list-entries');
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Status Code 500: Internal Server Error");
    }

});

app.listen(3000, function() {
    console.log("Server has been started.");
});