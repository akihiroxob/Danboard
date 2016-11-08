var Talk = function() {
    var OPEN_JTALK     = '/usr/local/bin/open_jtalk';
    var APLAY   = '/usr/bin/aplay';
    var HTS_VOICE_PATH = '/usr/local/share/open_jtalk/hts_voice/nitech_jp_atr503_m001.htsvoice';
    var OUTPUT_PATH    = '/tmp/out.wav';
    var DIC_PATH       = '/usr/local/share/open_jtalk/open_jtalk_dic_utf';
    var exec = require('child_process').exec;
    var that = {};
    that.talk = function(text) {
        var command = [
            'echo "' + text + '"',
                '|',
            OPEN_JTALK,
                '-m ' + HTS_VOICE_PATH,
                '-ow ' + OUTPUT_PATH,
                '-x '  + DIC_PATH,
                '&&',
            APLAY,
                '-D sysdefault:CARD=Device',
                OUTPUT_PATH
        ];
        console.log(command.join(' '));
        exec(command.join(' '));
    };

    return that;
}

module.exports = Talk();
