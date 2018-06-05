/*
* Code generation function for blocks in the control category.
*
*/

'use strict';

goog.provide('Blockly.Arduino.control');

goog.require('Blockly.Arduino');

Blockly.Arduino['setup_control'] = function (block) {
  //setup function for Arduino framework
  var branch = Blockly.Arduino.statementToCode(block, 'setup_statements');
  return 'void setup() {\n ' + branch + '}\n';
};

Blockly.Arduino['loop_control'] = function (block) {
  // loop function for Arduino framework
  var branch = Blockly.Arduino.statementToCode(block, 'loop_statements');
  return 'void loop() {\n' + branch + '}\n';
};

Blockly.Arduino['if_statement'] = function (block) {
  var condition = Blockly.Arduino.valueToCode(block, 'condition', Blockly.Arduino.ORDER_NONE);
  var innerStatements = Blockly.Arduino.statementToCode(block, 'IF');
  return 'if (' + condition + ') {\n ' + innerStatements + '}\n';
};

Blockly.Arduino['while_statement'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'condition', Blockly.Arduino.ORDER_NONE) || 'false';
  var innerStatements = Blockly.Arduino.statementToCode(block, 'DO');
  innerStatements = Blockly.Arduino.addLoopTrap(innerStatements, block.id);
  return 'while (' + argument0 + ') {\n' + innerStatements +'}\n';
};

Blockly.Arduino['do_while_statement'] = function (block) {
  var condition = Blockly.Arduino.valueToCode(block, 'condition', Blockly.Arduino.ORDER_NONE) || 'false';
  var innerStatements = Blockly.Arduino.statementToCode(block, 'DO');
  return 'do {\n' + innerStatements + '} while (' + condition + ');\n';
};

Blockly.Arduino['wait_control'] = function (block) {
  var waitTimeMillis = block.getFieldValue('wait_time');
  return 'delay(' + waitTimeMillis + ');\n';
};
