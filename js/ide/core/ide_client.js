/**
 * @fileoverview functions to facilitate connection between the IDE and Arduino Create
 */

'use strict';

goog.provide('Ide.Client');

/**
 * Search for the port that create-agent is open on
 */
Ide.Client.discoverPort = function() {

  var stateChange = function() {
    //console.log('got: ' + this.responseText);
    //console.log(this);
    /*if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }*/
  };

  //scan list of known ports create operates on
  for (var portNum = 8990; portNum <= 9000; portNum++) {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = stateChange;

    var url = 'http://localhost:' + portNum + '/info';
    //console.log('testing: ' + url);
    xhttp.open("GET", url, true);
    xhttp.send();
  }
};
