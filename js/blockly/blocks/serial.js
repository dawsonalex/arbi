/*
* JSON definitions for blocks in the serial category
*/
'use strict';

goog.provide('Blockly.Constants.Serial');

Blockly.defineBlocksWithJsonArray([{
  "type": "serial_begin",
  "message0": "begin serial at %1 baud",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "BAUD",
      "options": [
        [
          "300",
          "ARG0"
        ],
        [
          "600",
          "ARG1"
        ],
        [
          "1200",
          "ARG2"
        ],
        [
          "2400",
          "ARG3"
        ],
        [
          "4800",
          "ARG4"
        ],
        [
          "9600",
          "ARG5"
        ],
        [
          "14400",
          "ARG6"
        ],
        [
          "19200",
          "ARG7"
        ],
        [
          "28800",
          "ARG8"
        ],
        [
          "38400",
          "ARG9"
        ],
        [
          "57600",
          "ARG10"
        ],
        [
          "115200",
          "ARG11"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "Start the serial port at one of the predefined baud rates. (normally 9600 is fine.)",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/communication/serial/"
},
{
  "type": "serial_end",
  "message0": "end serial connection",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "End serial communication to use the pins for general IO.",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/communication/serial/end/"
},
{
  "type": "serial_print",
  "message0": "print %1 to serial port",
  "args0": [
    {
      "type": "field_input",
      "name": "PRINT",
      "text": "Hello, World"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 360,
  "tooltip": "Print some text to the serial port.",
  "helpUrl": "https://www.arduino.cc/reference/en/language/functions/communication/serial/print/"
}]);
