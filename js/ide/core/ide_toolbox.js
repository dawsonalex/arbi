/**
 * @fileoverview Utilities for the Ide relating to setting up and modifiying the Blockly Toolbox
 *
 */

'use strict'

goog.provide('Ide.Toolbox.VariableFlyout');

goog.require('Blockly.Xml');

/**
 * Set up callbacks for variable buttons in the toolbox
 */
Ide.Toolbox.registerButtonCallbacks = function (workspace) {
  workspace.registerButtonCallback('numberVariableCreate',
    Ide.Toolbox.createNumberVariableCallback);

  workspace.registerButtonCallback('boolVariableCreate',
    Ide.Toolbox.createBoolVariableCallback);

  workspace.registerToolboxCategoryCallback(
    'TYPED_VARIABLES', Ide.Toolbox.variablesFlyoutCallback);
};

/**
 * Set the callback for the variable flyout
 * @param  {!Blockly.Workspace} workspace The blockly workspace associated with the toolbox
 */
Ide.Toolbox.variablesFlyoutCallback = function (workspace) {
  var xmlList = [];
  var numberButtonXml = '<xml><button text="Create Number Variable" callbackKey="numberVariableCreate"></button></xml>';
  var numberButton = Blockly.Xml.textToDom(numberButtonXml).firstChild;
  xmlList.push(numberButton);
  var numTypeVars = workspace.getVariablesOfType('Number');
  if (numTypeVars.length > 0) {
    var getBlockXml = '<xml><block type="number_variable_get"></block></xml>';
    var setBlockXml = '<xml><block type="number_variable_set"></block></xml>';
    var getBlock = Blockly.Xml.textToDom(getBlockXml).firstChild;
    var setBlock = Blockly.Xml.textToDom(setBlockXml).firstChild;
    xmlList.push(getBlock);
    xmlList.push(setBlock);
  }

  var boolButtonXml = '<xml><button text="Create Bool Variable" callbackKey="boolVariableCreate"></button></xml>';
  var boolButton = Blockly.Xml.textToDom(boolButtonXml).firstChild;
  xmlList.push(boolButton);
  if (workspace.getVariablesOfType('Boolean').length > 0) {
    var getBlockXml = '<xml><block type="bool_variable_get"></block></xml>';
    var setBlockXml = '<xml><block type="bool_variable_set"></block></xml>';
    var getBlock = Blockly.Xml.textToDom(getBlockXml).firstChild;
    var setBlock = Blockly.Xml.textToDom(setBlockXml).firstChild;
    xmlList.push(getBlock);
    xmlList.push(setBlock);
  }
  return xmlList;
};

/**
 * The callback for the 'create number variable button'
 * @param  {!Blockly.FlyoutButton} button The button associated with the callback
 */
Ide.Toolbox.createNumberVariableCallback = function (button) {
  Blockly.Variables.createVariable(button.getTargetWorkspace(), null, 'Number');
};

/**
 * The callback for the 'create boolean variable' button
 * @param  {!Blockly.FlyoutButton} button The button associated with the callback
 */
Ide.Toolbox.createBoolVariableCallback = function (button) {
  Blockly.Variables.createVariable(button.getTargetWorkspace(), null, 'Boolean');
};
