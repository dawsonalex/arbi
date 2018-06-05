/**
 * @fileoverview binding for various UI elements to IDE functions
 */

'use strict';

goog.provide('Ide.Bind');

/**
 * Bind actions for the sketch name input elements
 */
Ide.Bind.SketchNameActions = function() {
  var sketchNameInput = document.getElementById('fileNameField');
  sketchNameInput.addEventListener('focus', function() {
    sketchNameInput.setSelectionRange(0, sketchNameInput.value.length);
    var keypressHandler = function(event) {
      if (event.keyCode === 13) {
        sketchNameInput.blur();
      }
    };
    sketchNameInput.addEventListener('keypress', keypressHandler);
  });

  sketchNameInput.addEventListener('blur', function() {
    Ide.setSketchName(sketchNameInput.value);
    sketchNameInput.removeEventListener('keypress', this);
  });
};

/**
 * Bind button clicks to IDE functions
 */
Ide.Bind.ButtonActions = function() {
  Ide.Bind.Click('saveButton', Ide.saveWorkspaceXml);
  Ide.Bind.Click('loadButton', Ide.loadWorkspaceXml);
  Ide.Bind.Click('clearWorkspaceButton', Ide.resetWorkspace);
};

/**
 * Bind an element's click event to a function.
 * @param  {!string|Element}   element  The element of elementId of the element to bind to.
 * @param  {Function} callback The function to bind
 */
Ide.Bind.Click = function(element, callback) {
    if (typeof element === 'string') {
      element = document.getElementById(element);
    }
    var propograteOnce = function(e) {
      e.stopPropagation();
      e.preventDefault();
      callback();
    };
    element.addEventListener('click', propograteOnce);
    element.addEventListener('ontouchend', propograteOnce);
};
