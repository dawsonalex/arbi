#!/usr/bin/python2.7
# Compress the core blockly files and the arduino generator files
import subprocess
import sys
import shlex
import os

COMPILER_PATH = "closure-compiler.jar"
DEP_MODE_STRICT = "STRICT"
DEP_MODE_LOOSE = "LOOSE"

def addDep(code):
    depName = "fakeDependecies.js"
    f = open(depName, "w+")
    f.write(code)
    f.close()
    return depName

def compileBlocks():
    print "\nCompiling Blocks"
    params = ["--generate_exports"]

    depName = addDep("goog.provide('Blockly');goog.provide('Blockly.Blocks');goog.provide('Blockly.Msg')")
    inputFiles = ['blocks/**.js',
                  depName,
                  'msg/js/en.js',]
    remove = ["var Blockly={Blocks:{}};", "var Blockly={Blocks:{},Msg:{}};"]

    compile(params, "blocks_compressed.js", inputFiles, remove)
    os.remove(depName)



def compileBlocklyCore():
    print "\nCompiling blockly core libs"
    params = ["--generate_exports",
              "--dependency_mode=" + DEP_MODE_STRICT,
              "--entry_point=Blockly"]

    outputFilename = "blockly_compressed.js"

    files = ['core/**.js',
            '../closure-library/closure/goog/**.js',
            '../closure-library/third_party/closure/goog/**.js']
    compile(params, outputFilename, files)

def compiledArduinoGenerator():
    print "\nCompiling Arduino Generator files"
    params = ["--generate_exports",
              "--compilation_level=SIMPLE_OPTIMIZATIONS"]

    outputFilename = "arduino_compressed.js"

    depFile = addDep("goog.provide('Blockly.Generator');")
    files = [depFile,
            'generators/arduino.js',
            'generators/arduino/**.js']
    remove = ["var Blockly={Generator:{}};"]

    compile(params, outputFilename, files, remove)
    os.remove(depFile)

def compile(params=[], outputFilename="output.js", inputFiles=[], remove=[]):
    command = "java -jar " + COMPILER_PATH

    for filename in inputFiles:
        command += " --js=" + filename

    for param in params:
        command += " " + param

    command += " --js_output_file " + outputFilename
    command += " --output_manifest " + outputFilename.replace(".js", ".MF")

    print "Executing: " + command

    args = shlex.split(command)
    print "\nIndividual args are: "
    for arg in args:
        print arg

    process = subprocess.Popen(args, stdout=subprocess.PIPE)
    for c in iter(lambda: process.stdout.read(1), ''):
        sys.stdout.write(c)


    if remove:
        try:
            with open(outputFilename, "r") as file:
                code = file.read()
            for strToRemove in remove:
                code = code.replace(strToRemove, "")

            with open(outputFilename, "w") as file:
                file.write(code)

        except IOError:
            print "The file " + outputFilename + " doesn't exist"
            return

if __name__ == "__main__":
    compileBlocklyCore()
    compileBlocks()
    compiledArduinoGenerator()
