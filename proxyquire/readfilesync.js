var fs = require('fs'); // The code in this file is never executed ...

module.exports = function () {
    return fs.readFileSync('someFile.js', { encoding: 'utf8' });
};