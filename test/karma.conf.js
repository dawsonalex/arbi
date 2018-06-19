//jshint ignore: start 
// Karma configuration
// Generated on 2018-06-18

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine', 'closure'
    ],

    // list of files / patterns to load in the browser
    // NOTE: The order of files here matter. Always load closure base.js last
    // to avoid problems with goog.require() function calls
    files: [
      //blockly files
      '../js/blockly/blockly_compressed.js',
      '../js/blockly/blocks_compressed.js',
      '../js/blockly/arduino_compressed.js',

       // ide files
       '../js/ide/core/ide_bindings.js',
       '../js/ide/core/ide_client.js',
       '../js/ide/core/ide_toolbox_definitions.js',
       '../js/ide/core/ide_toolbox.js',
      '../js/ide/core/ide.js',

      //closure base
      '../js/closure-library/closure/goog/base.js',

      //test files
      '../test/spec/**/*.js',

       // external deps
       {pattern: 'js/closure-library/closure/goog/deps.js', included: false, served: false}
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-*'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
