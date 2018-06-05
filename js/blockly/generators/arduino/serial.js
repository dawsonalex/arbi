/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.Arduino.Serial');

goog.require('Blockly.Arduino');

Blockly.Arduino['serial_begin'] = function (block) {
  var BAUD_RATES = {
      "ARG0" : "300",
      "ARG1" : "600",
      "ARG2" : "1200",
      "ARG3" : "2400",
      "ARG4" : "4800",
      "ARG5" : "9600",
      "ARG6" : "14400",
      "ARG7"  : "19200",
      "ARG8" : "28800",
      "ARG9" : "38400",
      "ARG10" : "57600",
      "ARG11" : "115200"
  };
  var baudRate = BAUD_RATES[block.getFieldValue('BAUD')];
  var code = 'Serial.begin(' + baudRate + ');\n';
  return code;
};

Blockly.Arduino['serial_end'] = function (block) {
  return 'Serial.end();\n'
};

Blockly.Arduino['serial_print'] = function (block) {
  var textArg = block.getFieldValue('PRINT');
  return 'Serial.println(F("' + textArg + '"));\n';
};
