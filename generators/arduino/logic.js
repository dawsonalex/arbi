/*
* Code generation for logic category
* Largely based on the JavaScript code generation file
* blockly/generators/javascript/logic.js
*
*/

'use strict';

goog.provide('Blockly.Arduino.Logic');

goog.require('Blockly.Arduino');

/*
* Taken from blockly/generators/javascript/logic.js
* and modified to generate C++ code.
*/
Blockly.Arduino['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Arduino.valueToCode(block, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    branchCode = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Arduino['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino['logic_negate'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Arduino['logic_boolean'] = function(block) {
  var value = block.getFieldValue('BOOL');
  if (value == "TRUE") {
    return ["true", Blockly.Arduino.ORDER_ATOMIC];
  } else {
    return ["false", Blockly.Arduino.ORDER_ATOMIC];
  }
};
