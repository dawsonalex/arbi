/*
* Code generation function for blocks in the IO category.
*
*/

'use strict';

goog.provide('Blockly.Arduino.io');

goog.require('Blockly.Arduino');

Blockly.Arduino['io_pinmode'] = function (block) {
  var pinNumber = Blockly.Arduino.valueToCode(block, 'pin_number', Blockly.Arduino.ORDER_NONE) || 0;
  var pinMode = block.getFieldValue('MODE');
  return 'pinMode(' + pinNumber + ', ' + pinMode + ');\n';
};

Blockly.Arduino['io_digital_write'] = function (block) {
  var pinNumber = Blockly.Arduino.valueToCode(block, 'pin_number', Blockly.Arduino.ORDER_NONE) || 0;
  var pinState = block.getFieldValue('pin_state');
  return 'digitalWrite(' + pinNumber + ', ' + pinState + ');\n';
};

Blockly.Arduino['io_digital_read'] = function (block) {
  var pinNumber = Blockly.Arduino.valueToCode(block, 'pin_number', Blockly.Arduino.ORDER_NONE) || 0;
  return ['digitalRead(' + pinNumber + ')', Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['io_analog_write'] = function (block) {
  var pinNumber = Blockly.Arduino.valueToCode(block, 'pin_number', Blockly.Arduino.ORDER_NONE) || 0;
  var pinValue = Blockly.Arduino.valueToCode(block, 'analog_val', Blockly.Arduino.ORDER_NONE) || 0;
  return 'analogWrite(' + pinNumber + ', ' + pinValue + ');\n';
};

Blockly.Arduino['io_analog_read'] = function (block) {
  var pinNumber = Blockly.Arduino.valueToCode(block, 'pin_number', Blockly.Arduino.ORDER_NONE) || 0;
  return ['analogRead(' + pinNumber + ')', Blockly.Arduino.ORDER_FUNCTION_CALL];
};
