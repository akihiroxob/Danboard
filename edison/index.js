var express = require('express');
var bodyParser = require('body-parser');
var edison = require('./models/Edison');
var talk = require('./models/Talk');


var app = express();
app.use(bodyParser.json());
/**
 * {
 *    server: "",
 *    alert:  ""
 * }
 */
app.post('/alert', function (req, res) {
    var server = req.body.server;
    var alert = req.body.alert;
    var text = [
        "アラートですよ。",
        "大変ですよ、",
        "対応して下さい。"
    ];

    talk.talk(text.join(''))
    setTimeout(function() {
        edison.happy();
    }, 2000)
    res.send('OK');
});
app.listen(3000);
