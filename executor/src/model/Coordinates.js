/**
 * Coordinates module.
 *
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

/**
 * Coordinates are 2D.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 */
var Coordinates = function(x, y) {
  this.X = x;
  this.Y = y;
};

Coordinates.prototype.toString = function () {
  return '(' + this.X + ',' + this.Y + ')';
};

exports.Coordinates = Coordinates;

