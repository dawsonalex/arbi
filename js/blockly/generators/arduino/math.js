/*
* Code generation for math category
*
*/

'use strict';

goog.provide('Blockly.Arduino.Math');

goog.require('Blockly.Arduino');

Blockly.Arduino['math_arithmetic'] = function (block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Arduino.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.Arduino.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
    'POWER': [null, Blockly.Arduino.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code;
  // Arduino lib provides the pow() function to calculate values to an exponent
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Arduino['math_constrain'] = function (block) {
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_COMMA) || 0;
  var lowVal = Blockly.Arduino.valueToCode(block, 'LOW', Blockly.Arduino.ORDER_COMMA) || 0;
  var highVal = Blockly.Arduino.valueToCode(block, 'HIGH', Blockly.Arduino.ORDER_COMMA) || 0;

  var code = 'map(' + value + ', ' + lowVal + ', ' + highVal + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['math_random_int'] = function (block) {
  var fromVal = Blockly.Arduino.valueToCode(block, 'FROM', Blockly.Arduino.ORDER_COMMA) || 0;
  var toVal = Blockly.Arduino.valueToCode(block, 'TO', Blockly.Arduino.ORDER_COMMA) || 0;
  var code = 'random(' + fromVal + ', ' + toVal + ')';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['math_number'] = function (block) {
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
