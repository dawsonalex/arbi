/**
 * @fileoverview Generate arduino code for procedure blocks
 * @author Alex Dawson
 */

'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');

Blockly.Arduino['procedures_defnoreturn'] = function (block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Arduino.prefixLines(
        Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code = 'void ' + funcName + '() {\n' +
      branch + '}';
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Arduino['procedures_defreturn'] = function (block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  if (Blockly.Arduino.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Arduino.prefixLines(
        Blockly.Arduino.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Arduino.INDENT) + branch;
  }
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }

  var returnType = Blockly.Arduino.Types[this.getReturnType()] || 'void';

  var returnValue = Blockly.Arduino.valueToCode(block, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  returnValue = returnType === 'void' ? '' :
      Blockly.Arduino.INDENT + 'return ' + returnValue + ';\n';

  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Arduino.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Arduino.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Arduino['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += Blockly.Arduino.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.Arduino.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};

Blockly.Arduino['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var code = funcName + '()';
  return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
};

Blockly.Arduino['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var code = funcName + '();\n';
  return code;
};
