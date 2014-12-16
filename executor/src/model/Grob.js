/**
 * Grob module.
 *
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

var _ = require('../thirdparty/underscore-1.7.0-min.js');
var Dice = require('../src/model/Dice.js');
var Coordinates = require('../src/model/Coordinates.js').Coordinates;


/**
 * A Grob is a Grid Object. It holds a position on the Grid.
 * @param {GrobId} id The ID of the new Grob. 
 * @param {Grid} grid The Grid on which this object exists. 
 * @param {Coordinates} position The position on this Grid at which this object is situated. 
 */
var Grob = function(id, grid, position) {  
  this.Id = id;
  this.Grid = grid;
  this.Level = 1;
  this.Position = position;
};

/**
 * The type of Grob that this is.
 * @return {?string}
 */
Grob.prototype.getType = function() {
  return null;
};

/**
 * Callback for when a Grob gains or loses a Level. Meant to be overridden.
 * @param {number} dLevel Integer to indicate shift in level.
 */
Grob.prototype.onLevelChange = function(dLevel) {};


exports.Grob = Grob;
