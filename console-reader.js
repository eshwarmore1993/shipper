module.exports = class ConsoleReader {

    readLine(message) {
        console.log(message + ':    ');

        let input;
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        const util = require('util');
        process.stdin.on('data', function (text) {
            process.stdin.pause();
            input = util.inspect(text);
        });
        while (input === undefined) {
            require('deasync').runLoopOnce();
        }
        return input;
    }
}