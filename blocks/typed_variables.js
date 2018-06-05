/**
* JSON definitions for blocks in the control category.
*
*
*
*/
'use strict';

goog.provide('Blockly.Constants.TypedVariables');

goog.require('Blockly');

var numberVariableGetJson = {
"type": "number_variable_get",
"message0": "",
"args0": [

],
"output": "Number",
"colour": "%{BKY_VAR_NUMBER_HUE}",
"tooltip": "%{BKY_VARIABLES_GET_HELPURL}",
"helpUrl": "%{BKY_VARIABLES_GET_TOOLTIP}",
"extensions": ["contextMenu_variableSetterGetter"]
};

var stringVariableGetJson = {
    "type": "string_variable_get",
    "message0": "",
    "args0": [
    ],
    "output": "String",
    "colour": "%{BKY_VAR_STRING_HUE}",
    "tooltip": "%{BKY_VARIABLES_GET_HELPURL}",
    "helpUrl": "%{BKY_VARIABLES_GET_TOOLTIP}"
};

var boolVariableGetJson = {
    "type": "bool_variable_get",
    "message0": "",
    "args0": [
    ],
    "output": "Boolean",
    "colour": "%{BKY_VAR_BOOL_HUE}",
    "tooltip": "%{BKY_VARIABLES_GET_HELPURL}",
    "helpUrl": "%{BKY_VARIABLES_GET_TOOLTIP}"
};


Blockly.Blocks['number_variable_get'] = {
  init: function () {
    this.jsonInit(numberVariableGetJson);
    var thisBlock = this;
    this.appendDummyInput().appendField(new Blockly.FieldVariable("i", null, ["Number"], "Number"), "VAR");
  }
};

Blockly.Blocks['number_variable_set'] = {
  init: function () {
    this.appendValueInput('VAL')
        .appendField("set ")
        .appendField(new Blockly.FieldVariable("i", null, ["Number"], "Number"), "VAR")
        .appendField(" as ")
        .setCheck('Number');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set the number value of the variable");
    this.setColour(Blockly.Msg.VAR_NUMBER_HUE);
  }
};

Blockly.Blocks['string_variable_get'] = {
  init: function () {
    this.jsonInit(stringVariableGetJson);
    var thisBlock = this;
    this.appendDummyInput().appendField(new Blockly.FieldVariable("s", null, ["String"], "String"), "VAR");
  }
};

Blockly.Blocks['string_variable_set'] = {
  init: function () {
    this.appendValueInput('VAL')
        .appendField("set ")
        .appendField(new Blockly.FieldVariable("s", null, ["String"], "String"), "VAR")
        .appendField(" as ")
        .setCheck('String');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set the text value of the variable");
    this.setColour(Blockly.Msg.VAR_STRING_HUE);
  }
};

Blockly.Blocks['bool_variable_get'] = {
  init: function () {
    this.jsonInit(boolVariableGetJson);
    var thisBlock = this;
    this.appendDummyInput().appendField(new Blockly.FieldVariable("b", null, ["Boolean"], "Boolean"), "VAR");
  }
};

Blockly.Blocks['bool_variable_set'] = {
  init: function () {
    this.appendValueInput('VAL')
        .appendField("set ")
        .appendField(new Blockly.FieldVariable("b", null, ["Boolean"], "Boolean"), "VAR")
        .appendField(" as ")
        .setCheck('Boolean');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Set the boolean value of the variable");
    this.setColour(Blockly.Msg.VAR_BOOL_HUE);
  }
};
