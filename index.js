require('dotenv').config();
var weather = require('./models/Weather');
var CHANNEL = 'C1X0FQHRB';
var Botkit = require('botkit');
var controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
    //log: false
});

// connect the bot to a stream of messages
var bot = controller.spawn({
    token: process.env.SLACK_APIKEY
})
// start Real Time message
var channelsWhilteList = ['bottest'];
bot.startRTM(function(err, bot, payload) {
    //payload.channels.forEach((channel) => {
    //    if (channelsWhilteList.indexOf(channel.name) != -1) {
    //        CHANNEL = channel.id;
    //    }
    //});
    //bot.say({
    //    text: 'I am activated.',
    //    channel: CHANNEL
    //});
});

controller.on('ambient', function(bot, message) {
    //bot.reply(message, 'Are you talking with who?');
})

controller.hears('^.*天気.*教えて.*$', ['direct_mention', 'mention'], function(bot, messages) {
    weather.getTodaysWeather()
        .then(function(data) {
            var info = [
                "今日の天気は"+data.weather,
                "今の気温は"+data.temp+"度",
                "最高気温は"+data.temp_max+"度",
                "最低気温は"+data.temp_min+"度です"
            ];
            bot.reply(messages, info.join('\n'));
        })
        .catch(function(err) {
            console.error(err);
            bot.reply(messages, '知らんがな(´・ω・')
        });
});


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
    bot.say({
        text: text.join('\n'),
        channel: CHANNEL
    });
    res.send('OK');
});
app.listen(3000);
