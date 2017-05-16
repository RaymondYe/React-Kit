var fs = require('fs');
var path = require('path');
var serverPath = path.join(__dirname, '../../../Rabbitpre2/RP-server/assets/dist/');
var contentPath = path.join(__dirname, '../assets/');
var fileName = 'spa.html';
var sourceFile = contentPath + fileName;
var destFile = serverPath + fileName;

var readStream = fs.createReadStream(sourceFile);
var writeStream = fs.createWriteStream(destFile);
readStream.pipe(writeStream);

console.log('Move Content to Server Done ...');
