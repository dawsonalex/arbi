/**
 * @fileoverview Main IDE application functionality
 */

 'use strict' ;

/**
 * Top level namespace for the IDE
 * @namespace Ide
 */
goog.provide('Ide');

goog.require('Blockly.Msg.en');

goog.require('Blockly');
goog.require('Blockly.Arduino');
goog.require('Ide.Toolbox.Const');
goog.require('Ide.Toolbox.VariableFlyout');
goog.require('Ide.Bind');
goog.require('Ide.Client');

/** custom block colours for pre-defined blocks */
goog.require('Blockly.Msg.customColours');

//blocks
goog.require('Blockly.Constants.Colour');
goog.require('Blockly.Constants.control');
goog.require('Blockly.Constants.io');
goog.require('Blockly.Constants.Lists');
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.Constants.Math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.Constants.Serial');
goog.require('Blockly.Constants.Text');
goog.require('Blockly.Constants.TypedVariables');
goog.require('Blockly.Constants.VariablesDynamic');
goog.require('Blockly.Constants.Variables');

goog.require('Blockly.Arduino.control');
goog.require('Blockly.Arduino.io');
goog.require('Blockly.Arduino.Logic');
goog.require('Blockly.Arduino.Loops');
goog.require('Blockly.Arduino.Math');
goog.require('Blockly.Arduino.procedures');
goog.require('Blockly.Arduino.Serial');
goog.require('Blockly.Arduino.TypedVariables');
//goog.require('Blockly.Arduino.Lists'); to be added
//goog.require('Blockly.Arduino.Text'); to be added
//goog.require('Blockly.Arduino.Colour'); to be added
//goog.require('Blockly.Arduino.VariablesDynamic'); to be added
//goog.require('Blockly.Arduino.Variables'); to be added

window.Ide = Ide;

Ide.DEFAULT_SKETCH_NAME = 'project_name';

Ide.INITIAL_WORKSPACE_XML = '<xml><block type="setup_control" deletable="false" x="90" y="30"></block>' +
                                '<block type="loop_control" deletable="false" x="210" y="30"></block></xml>';

/**
 * Initialize the IDE
 */
Ide.init = function() {
  var blocklyElement = document.getElementById('blocklyDiv');
  if (blocklyElement === null) {
    alert('The element to inject blockly into does not exist');
    return;
  }
  Ide.injectBlockly(blocklyElement, Ide.Toolbox.Const.XML, 'js/blockly');
  Ide.resetWorkspace();
  Ide.Bind.ButtonActions();
  Ide.Bind.SketchNameActions();
  Ide.workspace.addChangeListener(Blockly.Events.disableOrphans);
  Ide.workspace.addChangeListener(Ide.handleBlockUpdate);
  Ide.setSketchName(Ide.DEFAULT_SKETCH_NAME);

  //Connect to Arduino create agent
  Ide.Client.discoverPort();
};

/**
 * Inject blockly into to IDE
 * @param  {!Element} element     Element to inject Blockly into
 * @param  {!string} toolboxXml  string containing toolbox xml
 * @param  {!string} blocklyPath Path to the Blockly directory
 */
Ide.injectBlockly = function(element, toolboxXml, blocklyPath) {
  Blockly.HSV_SATURATION = 0.75;
  Blockly.HSV_VALUE = 0.80;

  Ide.toolboxDom = Blockly.Xml.textToDom(toolboxXml);
  Ide.workspace = Blockly.inject(element, {
    toolbox: Ide.toolboxDom,
    trashcan:true,
    scrollbars:true,
    media: blocklyPath + '/media/',
    grid:
    {spacing: 20,
     length: 5,
     colour: '#ccc',
     snap: true},
    sounds:true,
    zoom:
     {controls: true,
      wheel: false,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2}
  });
  Ide.Toolbox.registerButtonCallbacks(Ide.workspace);
};

/**
 * Callback function to be used with workspace change listener
 * @param  {!Blockly.Events.Abstract} event The event fired by the change listener
 */
Ide.handleBlockUpdate = function(event) {
  //only update generated code if a block has been moved
  // and the user is not dragging a block.
  if (event.type !== Blockly.Events.MOVE && event.type !== Blockly.Events.CHANGE) {
    return;
  }
  Ide.disableInvalidBlocks();
  var code = Ide.generateArduinCode();
  Ide.injectCode(code, 'codeFormatArea');
};

/**
 * Disable any orphan blocks that shouldn't be orphans
 */
Ide.disableInvalidBlocks = function() {
  var validRootBlocks = ['setup_control', 'loop_control', 'procedures_defreturn', 'procedures_defnoreturn'];
  var rootBlocks = Ide.workspace.getTopBlocks(false);
  rootBlocks.forEach(function (block) {
    if (!validRootBlocks.includes(block.type)) {
      block.setDisabled(true);
    }
  });
};

/**
 * Wrapper function for generating Arduino code
 * @return {!string} Arduino code generated from the Ide workspace
 */
Ide.generateArduinCode = function() {
  return Blockly.Arduino.workspaceToCode(Ide.workspace);
};

/**
 * Get nicely formatted XML from the workspace
 * @return {!string}  formatted XML from the Ide workspace
 */
Ide.generateXml = function() {
  var xml = Blockly.Xml.workspaceToDom(Ide.workspace);
  return Blockly.Xml.domToPrettyText(xml);
};

/**
 * Inject code into a tag with google-code-prettify highlighting.
 * @param  {!string} code The code to inject.
 * @param  {!string} id   The ID of the element, preferably a <pre> element.
 */
Ide.injectCode = function (code, id) {
  var pre = document.getElementById(id);
  pre.textContent = code;
  code = pre.textContent;
  code = PR.prettyPrintOne(code, 'cpp');
  pre.innerHTML = code;
};

/**
 * Replace all blocks on the workspace with the defined XML
 * @param  {!string} xml The xml string to replace the workspace dom with.
 * @return {boolean}     True if the workspace is updated successfully, otherwise false.
 */
Ide.replaceWorkspaceBlocks = function(xml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(xml);
  } catch (e) {
    console.log(e);
    return false;
  }
  Ide.workspace.clear();
  Blockly.Xml.domToWorkspace(xmlDom, Ide.workspace);
  return true;
};

/**
 * Replace all blocks in the workspace with the default blocks.
 */
Ide.resetWorkspace = function() {
  var blockCount = Ide.workspace.getAllBlocks().length;
  if (blockCount > 2) {
    if (!confirm('Do you really want to remove all blocks form the workspace?')) {
      return;
    }
  }
  Ide.clearCodeContent();
  if (!Ide.replaceWorkspaceBlocks(Ide.INITIAL_WORKSPACE_XML)) {
    alert("The workspace couldn't be cleared");
  }
};

/**
 * Clear the area for displaying Arduino code
 */
Ide.clearCodeContent = function() {
  var codeBox = document.getElementById("codeFormatArea");
  codeBox.innerHTML = "";
};

/**
 * Save a formatted version of the worksapces XML
 */
Ide.saveWorkspaceXml = function() {
  Ide.saveFile(document.getElementById('fileNameField').value + '.xml', Ide.generateXml());
};

/**
 * Save generated Arduino code as a sketch file.
 */
Ide.saveInoFile = function() {
  Ide.saveFile(document.getElementById('fileNameField').value + 'ino', Ide.generateArduinCode());
};

/**
 * Save a file to local storage
 * @param  {!string} filename The filename to save as
 * @param  {!string} content  The content to save in the file
 */
Ide.saveFile = function(filename, content) {
  var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
        window.navigator.msSaveOrOpenBlob(blob, filename);
  } else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
};

/**
 * Load a worksapce xml file from local storage and replace the current workspace with it.
 */
Ide.loadWorkspaceXml = function() {
  var xmlFile = null;
  Ide.openFile(function(fileIn) {
    xmlFile = fileIn.files[0];

    if (xmlFile === null) {
      alert("Failed to open the file");
      return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function() {
      var xmlContent = /** @type {string} */ (fileReader.result);
      if (!Ide.replaceWorkspaceBlocks(xmlContent)) {
        alert("The file couldn't be loaded into the workspace");
      } else {
        Ide.setSketchName(xmlFile.name.replace('.xml', ''));
      }
    };
    fileReader.readAsText(xmlFile);
  });
};

/**
 * Open a file from local storage
 * @param {Function} changeHandler The handler to run when a file is selected
 */
Ide.openFile = function(changeHandler) {
  var fileIn = document.createElement("input");
  fileIn.style.display = 'none';
  fileIn.setAttribute("type", "file");
  fileIn.addEventListener('change', function() {changeHandler(fileIn)});
  document.body.appendChild(fileIn);
  fileIn.click();
  document.body.removeChild(fileIn);
};

/**
 * Set the name of the current sketch
 * @param  {!string} name The string to set the sketch name to.
 */
Ide.setSketchName = function(name) {
  //handle empty name
  if (!name.replace(/\s/g, '').length) {
    name = Ide.DEFAULT_SKETCH_NAME;
  }
  name = name.replace(' ', '_');
  document.getElementById('fileNameField').value = name;
  document.title = name + ' - Blockly Arduino Editor';
};
