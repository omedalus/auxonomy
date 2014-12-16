/**
 * Unit tests for the Dice module.
 *
 * Requires nodeunit to have been installed.
 * https://github.com/caolan/nodeunit
 * npm install nodeunit -g
 * 
 * Auxonomy. Copyright (C) 2015 Mikhail Voloshin. All rights reserved.
 */

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
  test.ok(roll.count() == 7, 'should have rolled 5 dice.');
  test.ok(roll.rolls().length == 7, 'should have 5 records of dice rolled.');

  test.done();
};



