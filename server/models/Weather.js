var Weather = function() {
    var Promise = require('bluebird');
    var request = require('superagent');
    var qs = require('querystring');
    var APIKEY = '3b026ca4d073196b37adbc1991561eac';
    var URL = 'http://api.openweathermap.org/data/2.5/weather';
    var that = {};

    var lat = 35.677795;
    var lon = 139.741713;

    var f2c = function(f) {
        return (5/9)*(f-32);
    }
    var k2c = function(k) { return Math.floor((k - 273)*10)/10; }
    that.getTodaysWeather = function() {
        return new Promise(function(resolve, reject) {
            var params = {
                lat: lat,
                lon: lon,
                appid: APIKEY
            };

            var url = URL+"?"+qs.encode(params);
            request.get(url)
                .end(function(err, res){
                    if (err) {
                        resolve(err);
                    } else {
                        var result = {
                            weather: res.body.weather[0].main,
                            desc: res.body.weather[0].description,
                            temp: k2c(res.body.main.temp),
                            temp_min: k2c(res.body.main.temp_min),
                            temp_max: k2c(res.body.main.temp_max)
                        };
                        resolve(result);
                    }
                });
        });
    }

    return that;
}

module.exports = Weather();
