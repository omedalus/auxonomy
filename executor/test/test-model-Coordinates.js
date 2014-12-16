/**
 * Unit tests for the Coordinates module.
 *
 * Requires nodeunit to have been installed.
 * https://github.com/caolan/nodeunit
 * npm install nodeunit -g
 * 
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

var _ = require('../thirdparty/underscore-1.7.0-min.js');
var Coordinates = require('../src/model/Coordinates.js').Coordinates;

// Construction safety.

exports.testCoordinatesToString = function(test){
  var coords = new Coordinates(-5,9);
  test.ok('' + coords == '(-5,9)', 'should convert to coordinate string.');
  test.done();
};
