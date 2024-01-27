const express = require['express'];
const ejs = require['ejs'];
const logger = require['morgan'];

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const customLogFormat = ':remote-addr - :method :url :status :response-time ms - :res[content-length]';

app.use(logger(customLogFormat));

app.get(['/', '/home'], function(req, res) {
    res.render('home');
});

app.get('/list-entries', function(req, res) {
    res.render('list-entries');
})

app.listen(3000, function() {

});