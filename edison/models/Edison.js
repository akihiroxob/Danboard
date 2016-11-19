// servo max:2500 min:500
//      1500 - 2000 are better
// led max: 1, min: 0
var Edison = function() {
    var SERVO_CH = 0;
    var LED_Ch   = 3;
    var COOLER   = 7;
    var SERVO_HIGH      = 2000;
    var SERVO_MID_HIGH  = 1800;
    var SERVO_MIDDLE    = 1500;
    var SERVO_MID_LOW   = 1200;
    var SERVO_LOW       = 1000;
    var LED_INIT   =    0;

    var i2cBus = require('i2c-bus');
    var Pca9685Driver = require('pca9685').Pca9685Driver;
    var Promise = require('bluebird');
    var co      = require('co');

    var options = {
        i2c: i2cBus.openSync(1),
        address: 0x40,
        frequency: 50,
        debug: true
    };

    var pwm = new Pca9685Driver(options, function(err) {
        if (err) { pwm = null; return; }
        console.info('PCA9685 was initialized.');
    });

    var that = {};
    that.pwm = pwm;


    process.on('SIGINT', function() {
        console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
        pwm && pwm.allChannelsOff();
    });

    var initialized = function() {
        co(function *() {
            pwm.setPulseLength(SERVO_CH, 1500);
            resetAll();
        });
        
        return that;
    }

    var sleep = function(msec) {
        return new Promise (function(resolve) {
            setTimeout(resolve, msec);
        });
    };

    var moveTo = function(range) {
        if (range > SERVO_HIGH) { range = SERVO_HIGH; }
        if (range < SERVO_LOW)  { range = SERVO_LOW;  }

        pwm.setPulseLength(SERVO_CH, range);
    }

    var resetAll = function() {
        pwm.allChannelsOff();
        start();
    };

    var ledOn = function() {
        pwm.setDutyCycle(LED_Ch, 2);
    }

    var ledOff = function() {
        pwm.setDutyCycle(LED_Ch, 5);
    }

    var start = function () {
        pwm.setDutyCycle(COOLER, 1);
    }

    that.close = function() {
        pwm.allChannelsOff();
    }

    that.happy = function() {
        co(function *(){
            ledOn();
            moveTo(SERVO_HIGH);
            yield sleep(500);
            moveTo(SERVO_MID_HIGH);
            yield sleep(300);
            moveTo(SERVO_HIGH);
            yield sleep(300);
            moveTo(SERVO_MID_HIGH);
            yield sleep(300);

            moveTo(SERVO_HIGH);
            yield sleep(300);

            moveTo(SERVO_MIDDLE);
            yield sleep(1000);
            resetAll()
        });
    }
    that.angry = function() {}
    that.enjoy = function() {}

    return initialized();
}

module.exports = Edison();
