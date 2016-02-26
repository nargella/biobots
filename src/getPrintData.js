var fs = require('fs'),
	  JSONStream = require('JSONStream');

module.exports = function (file, filter, cb) {
  var stream = fs.createReadStream(file, {encoding: 'utf8'});
	var parser = JSONStream.parse('*');
  var layerCount = 0, sumLayerHeights = 0, extruder1PressureDictionary = {}, extruder2PressureDictionary = {};

  var reader = stream.pipe(parser);
  reader.on('data', function (data) {
  	if (data.print_info.files.input === filter) {
  		layerCount = Math.max(layerCount, data.print_info.resolution.layerNum);
  		sumLayerHeights = sumLayerHeights + data.print_info.resolution.layerHeight;
  		extruder1PressureDictionary[data.print_info.resolution.layerNum] = data.print_info.pressure.extruder1;
  		extruder2PressureDictionary[data.print_info.resolution.layerNum] = data.print_info.pressure.extruder2;
  	}
  });

  reader.on('end', function () {
    var labels = Object.keys(extruder1PressureDictionary);
    cb({
      'Total layers': layerCount,
      'Total height': sumLayerHeights,
      'Average layer height': sumLayerHeights/layerCount,
      'Pressure chart': {
    		labels: labels,
    		series: [
    			labels.map(function (obj) {
    				return extruder1PressureDictionary[obj];
    			}),
    			labels.map(function (obj) {
    				return extruder2PressureDictionary[obj];
    			})
    		]
    	}
    })
  })
}
