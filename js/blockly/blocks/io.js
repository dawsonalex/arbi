/*
* JSON definitions for blocks in the io category
*/
'use strict';

goog.provide('Blockly.Constants.io');

Blockly.defineBlocksWithJsonArray([{
  "type": "io_pinmode",
  "message0": "set pin %1 as %2",
  "args0": [
    {
      "type": "input_value",
      "name": "pin_number",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        [
          "input",
          "INPUT"
        ],
        [
          "input pullup",
          "INPUT_PULLUP"
        ],
        [
          "output",
          "OUTPUT"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "Set a pin to input or output",
  "helpUrl": ""
},
{
  "type": "io_digital_write",
  "message0": "digital write pin  %1 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "pin_number",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "pin_state",
      "options": [
        [
          "high",
          "HIGH"
        ],
        [
          "low",
          "LOW"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "Set a digital pin high or low",
  "helpUrl": ""
},
{
  "type": "io_digital_read",
  "message0": "digital read pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin_number",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 290,
  "tooltip": "Read the digital value of a pin",
  "helpUrl": ""
},
{
  "type": "io_analog_write",
  "message0": "analog write  %1 to pin %2",
  "args0": [
    {
      "type": "input_value",
      "name": "analog_val",
      "check":"Number"
    },
    {
      "type": "input_value",
      "name": "pin_number",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "Write an analog value to a pin",
  "helpUrl": ""
},
{
  "type": "io_analog_read",
  "message0": "analog read pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin_number",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": 290,
  "tooltip": "Read an analog value from the pin",
  "helpUrl": ""
}]);
