var fs = require('fs'),
	  JSONStream = require('JSONStream'),
    parser = JSONStream.parse('*');

module.exports = function(file, cb) {
  var stream = fs.createReadStream(file, {encoding: 'utf8'});
  var reader = stream.pipe(parser);

  var files = {};
  reader.on('data', function (data) {
    files[data.print_info.files.input] = '';
  });

  reader.on('end', function () {
  	cb(Object.keys(files));
  });
}
