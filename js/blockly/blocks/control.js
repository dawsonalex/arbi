/**
* JSON definitions for blocks in the control category.
*
*
*
*/
'use strict';

goog.provide('Blockly.Constants.control');

Blockly.defineBlocksWithJsonArray([{
  "type": "wait_control",
  "message0": "wait %1",
  "args0": [
    {
      "type": "field_number",
      "name": "wait_time",
      "value": 0
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 35,
  "tooltip": "Pause the code for a number of milliseconds.",
  "helpUrl": ""
},
{
  "type": "setup_control",
  "message0": "setup %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "setup_statements"
    }
  ],
  "colour": 18,
  "tooltip": "Code in here will run once when the Arduino starts.",
  "helpUrl": ""
},
{
  "type": "loop_control",
  "message0": "loop %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "loop_statements"
    }
  ],
  "colour": 18,
  "tooltip": "Code in here will run forever unless the reset button on the Arduino is pressed.",
  "helpUrl": ""
}]);
