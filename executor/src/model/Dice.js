/**
 * Dice module.
 *
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

var _ = require('../../thirdparty/underscore-1.7.0-min.js');

/** @const {int} How many sides per die. */
var NUM_SIDES = 10;

/**
 * Roll holds the results of a roll of multiple dice.
 * @param {number} numDice How many dice to roll. 
 * @param {object=} opt_randProvider An object that provides random numbers. Must have a method
 *     called random(). Defaults to Math. 
 */
var Roll = function(numDice, opt_randProvider) {  
  if (!_.isNumber(numDice)) {
    throw new TypeError('numDice must be of type number.');
  }

  if (!_.isNumber(numDice)) {
    throw new TypeError('numDice must be a number.');
  }

  if (numDice !== Math.floor(numDice)) {
    throw new Error('numDice must be an integer.');
  }

  if (numDice <= 0) {
    throw new Error('numDice must be positive.');
  }

  if (!opt_randProvider) {
    opt_randProvider = Math;
  } else if (!_.isFunction(opt_randProvider.random)) {
    throw new Error('opt_randProvider must have a function called random().');
  }
  
  var self = this;
  
  var rolls = [];

  var numSuccesses = 0;
  var numFails = 0;
  
  _.times(numDice, function() {
    var thisRoll = Math.floor(opt_randProvider.random() * NUM_SIDES) + 1;
    rolls.push(thisRoll);

    if (thisRoll === NUM_SIDES) {
      numSuccesses++;
    } else if (thisRoll === 1) {
      numFails++;
    }
  });

  /** @return {Array.<number>} The values of the dice rolls. */
  this.rolls = function() {
    return _.clone(rolls);
  };

  /** @return {number} How many dice were rolled. */
  this.count = function () {
    return numDice;
  }
  
  /** @return {number} How many dice came up as successes (highest value). */
  this.successCount = function() {
    return numSuccesses;
  }

  /** @return {number} How many dice came up as failures (lowest value). */
  this.failCount = function() {
    return numFails;
  }
  
  /** @return {boolean} True iff any of the dice rolls were the maximum. */
  this.isAnySuccess = function() {
    return numSuccesses > 0;
  };

  /** @return {boolean} True iff all of the dice rolls were the maximum. */
  this.isCriticalSuccess = function() {
    return numSuccesses === numDice;
  };

  /** @return {boolean} True iff any of the dice rolls were the minimum. */
  this.isAnyFail = function() {
    return numFails > 0;
  };

  /** @return {boolean} True iff all of the dice rolls were the minimum. */
  this.isCriticalFail = function() {
    return numFails === numDice;
  };
  
};

exports.Roll = Roll;
exports.NUM_SIDES = NUM_SIDES;

