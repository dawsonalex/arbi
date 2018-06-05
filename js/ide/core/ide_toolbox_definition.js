/**
 * @fileoverview A Blockly XML Toolbox as a JS String
 *
 */

'use strict'

goog.provide('Ide.Toolbox.Const');

/**
 * XML to use as the blockly toolbox
 * @type {string}
 * @public
 */
Ide.Toolbox.Const.XML =
'<xml id="toolbox" style="display: none">' +
 '<category name="Control" colour="35">' +
   '<block type="controls_repeat_ext">' +
     '<value name="TIMES">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="controls_whileUntil">' +
     '<value name="BOOL">' +
       '<shadow type="logic_boolean">' +
         '<field name="BOOL">TRUE</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="wait_control"></block>' +
 '</category>' +
 '<sep></sep>' +

 '<category name="Logic" colour="140">' +
   '<block type="controls_if">' +
     '<value name="IF0">' +
       '<shadow type="logic_boolean">' +
         '<field name="BOOL">TRUE</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="32"></sep>' +
   '<block type="logic_compare">' +
     '<value name="A">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="B">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="logic_operation">' +
     '<value name="A">' +
       '<shadow type="logic_boolean">' +
         '<field name="BOOL">TRUE</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="B">' +
       '<shadow type="logic_boolean">' +
         '<field name="BOOL">TRUE</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="32"></sep>' +
   '<block type="logic_boolean">' +
     '<field name="BOOL">TRUE</field>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="logic_boolean">' +
     '<field name="BOOL">FALSE</field>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="logic_negate"></block>' +
 '</category>' +
 '<sep></sep>' +

 '<category name="math" colour="230">' +
   '<block type="math_number"></block>' +
   '<sep gap="8"></sep>' +
   '<block type="math_arithmetic">' +
     '<value name="A">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="B">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="math_arithmetic">' +
     '<value name="A">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<field name="OP">MULTIPLY</field>' +
     '<value name="B">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="32"></sep>' +
   '<block type="math_constrain">' +
     '<value name="VALUE">' +
       '<block type="number_variable_get"></block>' +
     '</value>' +
     '<value name="LOW">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="HIGH">' +
       '<shadow type="math_number">' +
         '<field name="NUM">10</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="math_random_int">' +
     '<value name="FROM">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="TO">' +
       '<shadow type="math_number">' +
         '<field name="NUM">10</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
 '</category>' +
 '<sep></sep>' +

 '<category name="I/O" colour="290">' +
   '<block type="io_pinmode">' +
     '<value name="pin_number">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="32"></sep>' +
   '<block type="io_digital_read">' +
     '<value name="pin_number">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="io_digital_write">' +
     '<value name="pin_number">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="32"></sep>' +
   '<block type="io_analog_write">' +
     '<value name="pin_number">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
     '<value name="analog_val">' +
       '<shadow type="math_number">' +
         '<field name="NUM">1024</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
   '<sep gap="8"></sep>' +
   '<block type="io_analog_read">' +
     '<value name="pin_number">' +
       '<shadow type="math_number">' +
         '<field name="NUM">0</field>' +
       '</shadow>' +
     '</value>' +
   '</block>' +
 '</category>' +
 '<sep></sep>' +
 '<category name="Serial" colour="360">' +
   '<block type="serial_begin">' +
     '<field name="BAUD">ARG5</field>' +
   '</block>' +
   '<block type="serial_end"></block>' +
   '<block type="serial_print"></block>' +
 '</category>' +
 '<sep></sep>' +

 '<category name="Variables" custom="TYPED_VARIABLES" colour="192">' +
 '</category>' +
 '<sep></sep>' +
 '<category name="Functions" custom="PROCEDURE" colour="15"></category>' +
'</xml>';
