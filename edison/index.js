var express = require('express');
var bodyParser = require('body-parser');
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
        "ちょっと大変でっせ",
        server+"でなんかおきましたわ",
        alert+"ってことなんだけど...",
        "がんばって！たのんます！"
    ];
    res.send('OK');
});
app.listen(3000);
