/**
 * @fileoverview Generator file for arduino code variables
 */

'use strict';

goog.provide('Blockly.Arduino.TypedVariables');

goog.require('Blockly.Arduino');

Blockly.Arduino['number_variable_get'] = function (block) {
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino['string_variable_get'] = Blockly.Arduino['number_variable_get'];
Blockly.Arduino['bool_variable_get'] = Blockly.Arduino['number_variable_get'];

Blockly.Arduino['number_variable_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VAL',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
Blockly.Arduino['string_variable_set'] = Blockly.Arduino['number_variable_set'];
Blockly.Arduino['bool_variable_set'] = Blockly.Arduino['number_variable_set'];
