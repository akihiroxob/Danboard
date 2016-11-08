// servo max:2500 min:500
//      1500 - 2000 are better
// led max: 1, min: 0
var Edison = function() {
    var SERVO_CH = 0;
    var LED_Ch   = 5;
    var SERVO_INIT = 1500;
    var LED_INIT   =    0;

    var i2cBus = require('i2c-bus');
    var Pca9685Driver = require('pca9685').Pca9685Driver;
    var Promise = require('bluebird');
    var co      = require(co);

    var pwm = new Pca9685Driver(options, function(err) {
        if (err) { pwm = null; return; }
        console.info('PCA9685 was initialized.');
    });

    var that = {};

    var options = {
        i2c: i2cBus.openSync(1),
        address: 0x40,
        frequency: 50,
        debug: debug
    };

    process.on('SIGINT', function() {
        console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
        pwm && pwm.allChannelsOff();
    });

    var initialized = function() {
        pwm.setPulseLength(SERVO_CH, 0);
        pwm.setDutyCycle(LED_Ch, 0);
        return that;
    }

    var sleep = function(msec) {
        return new Promise (function(resolve) {
            setTimeout(resolve, msec);
        });
    };

    var moveTo = function(range) {
        if (range > 100) { range = 100; }
        if (range <   0) { range =   0; }

        var pulseLength = range * 5 + 1500;
        pwm.setPulseLength(SERVO_CH, 0);


    }

    var ledOn = function() {
        pwm.setDutyCycle(LED_Ch, .8);
    }

    var ledOff = function() {
        pwm.setDutyCycle(LED_Ch, .0);
    }

    that.close = function() {
        pwm.allChannelsOff();
    }

    that.happy = function() {
        co(function *(){
            ledOn();
            moveTo(100);
            yield sleep(1000);
            moveTo(90);
            yield sleep(300);
            moveTo(100);
            yield sleep(300);
            moveTo(90);
            yield sleep(300);
            moveTo(100);
            yield sleep(300);
            moveTo(0);
            ledOff();
        });
    }
    that.angry = function() {}
    that.enjoy = function() {}

    return initialized();
}

module.exports = Edison();
