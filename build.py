#!/usr/bin/python2.7
# Compress IDE files using closure COMPILER_PATH
import subprocess
import sys
import shlex
import os

COMPILER_PATH = "js/blockly/closure-compiler.jar"
DEP_MODE_STRICT = "STRICT"
DEP_MODE_LOOSE = "LOOSE"

def addDep(code):
    depName = "fakeDependecies.js"
    f = open(depName, "w+")
    f.write(code)
    f.close()
    return depName

def compileArbi():
    print "======== Compiling ArBI ========"
    params = ["--generate_exports",
              "--externs js/ide/externs/pretty-print-externs.js",
              #"--externs js/ide/externs/blockly_externs.js",
              "--compilation_level SIMPLE_OPTIMIZATIONS",
              "--dependency_mode=STRICT",
              "--entry_point=Ide"]

    outputFilename = "js/ide_compressed.js"

    files = ['js/blockly/core/**.js',
            'js/blockly/msg/js/en.js',
            'js/blockly/custom_colours.js',
            'js/blockly/blocks/**.js',
            'js/blockly/generators/arduino.js',
            'js/blockly/generators/arduino/**.js',
            "js/ide/core/**.js",
            'js/closure-library/closure/goog/**.js',
            'js/closure-library/third_party/closure/goog/**.js']
    compile(params, outputFilename, files)


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
    compileArbi()
