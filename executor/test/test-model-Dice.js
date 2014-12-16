/**
 * Unit tests for the Dice module.
 *
 * Requires nodeunit to have been installed.
 * https://github.com/caolan/nodeunit
 * npm install nodeunit -g
 * 
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

var _ = require('../thirdparty/underscore-1.7.0-min.js');
var Dice = require('../src/model/Dice.js');

// Construction safety.

exports.testDiceErrorNeedsArg = function(test){
  test.throws(function() {
    var roll = new Dice.Roll();
  }, 'should complain if no argument provided to Roll.');
  test.done();
};

exports.testDiceErrorNeedsNumber = function(test){
  test.throws(function() {
    var roll = new Dice.Roll('abc');
  }, 'should complain if argument provided to Roll is not a number.');
  test.done();
};

exports.testDiceErrorNeedsInteger = function(test){
  test.throws(function() {
    var roll = new Dice.Roll(5.2);
  }, 'should complain if argument provided to Roll is not an integer.');
  test.done();
};

exports.testDiceErrorNeedsPositive = function(test){
  test.throws(function() {
    var roll = new Dice.Roll(-5);
  }, 'should complain if argument provided to Roll is not positive.');
  test.done();
};

exports.testDiceErrorNeedsNonZero = function(test){
  test.throws(function() {
    var roll = new Dice.Roll(0);
  }, 'should complain if argument provided to Roll is zero.');
  test.done();
};

// Data correctness.

exports.testDiceNumber = function(test){
  var roll = new Dice.Roll(5);
  test.ok(roll.count() == 5, 'should have rolled 5 dice.');
  test.ok(roll.rolls().length == 5, 'should have 5 records of dice rolled.');
  
  roll = new Dice.Roll(7);
  test.ok(roll.count() == 7, 'should have rolled 7 dice.');
  test.ok(roll.rolls().length == 7, 'should have 7 records of dice rolled.');

  test.done();
};

exports.testDiceValueInRange = function(test){
  var n = 10000;
  var roll = new Dice.Roll(n);
  test.ok(roll.count() == n, 'should have rolled ' + n + ' dice.');
  test.ok(roll.rolls().length == n, 'should have ' + n + ' records of dice rolled.');

  _.each(roll.rolls(), function(rollValue) {
    test.ok(rollValue >= 1 && rollValue <= Dice.NUM_SIDES,
        'should never roll dice outside the range [1, ' + Dice.NUM_SIDES + '].');
  });
  
  test.done();
};

/**
 * An object with a random() function that outputs a value of 1.0
 * exactly nSuccesses times, then outputs 0.
 * @param {number} nSuccesses How many successes to produce. -1 is a special
 *     value meaning, "Always produce successes."
 */
var RandProvider = function(nSuccesses) {
  var i = 0;

  this.random = function() {
    var retval = i < nSuccesses || nSuccesses === -1 ? .99999 : 0;
    i++;
    return retval;
  }; 
};

exports.testCriticalFail = function(test){
  var rp = new RandProvider(0);
  var roll = new Dice.Roll(10, rp);
  
  test.ok(roll.failCount() == 10,
      'should have 10 fails, found ' + roll.failCount() + '.');
  test.ok(roll.isAnyFail(),
      'should know that any failed.');
  test.ok(roll.isCriticalFail(),
      'should know that a critical failure happened.');
  
  test.ok(roll.successCount() == 0,
      'should have 0 successes, found ' + roll.successCount() + '.');
  test.ok(!roll.isAnySuccess(),
      'should know that none succeeded.');
  test.ok(!roll.isCriticalSuccess(), 
      'should know that no critical success happened.');
  
  test.done();
};

exports.testCriticalSuccess = function(test){
  var rp = new RandProvider(10);
  var roll = new Dice.Roll(10, rp);
    
  test.ok(roll.failCount() == 0,
      'should have 0 fails, found ' + roll.failCount() + '.');
  test.ok(!roll.isAnyFail(),
      'should know that none failed.');
  test.ok(!roll.isCriticalFail(),
      'should know that no critical failure happened.');
  
  test.ok(roll.successCount() == 10,
      'should have 10 successes, found ' + roll.successCount() + '.');
  test.ok(roll.isAnySuccess(),
      'should know that any succeeded.');
  test.ok(roll.isCriticalSuccess(), 
      'should know that a critical success happened.');
  
  test.done();
};

exports.testNonCritical = function(test){
  var rp = new RandProvider(4);
  var roll = new Dice.Roll(10, rp);
    
  test.ok(roll.failCount() == 6,
      'should have 6 fails, found ' + roll.failCount() + '.');
  test.ok(roll.isAnyFail(),
      'should know that some failed.');
  test.ok(!roll.isCriticalFail(),
      'should know that no critical failure happened.');
  
  test.ok(roll.successCount() == 4,
      'should have 4 successes, found ' + roll.successCount() + '.');
  test.ok(roll.isAnySuccess(),
      'should know that some succeeded.');
  test.ok(!roll.isCriticalSuccess(), 
      'should know that no critical success happened.');
  
  test.done();
};

