#!/bin/bash

echo "Beginning compilation"
IDE_PATH="'js/ide/core/**.js'"
CLOSURE_EXEC="js/blockly/closure-compiler.jar"
BLOCK_COLOURS="js/blockly/custom_colours.js"
BLOCKS_PATH="'js/blockly/blocks/**.js'"
CORE_PATH="'js/blockly/core/**.js'"
GEN_PATH="'js/blockly/generators/arduino.js'"
BLOCK_GEN_PATH="'js/blockly/generators/arduino/**.js'"
MSG_PATH="'js/blockly/msg/js/**.js'"
CLOSURE_LIB_PATH="'js/closure-library/closure/goog/**.js'"
CLOSURE_THIRD_PARTY_PATH="'js/closure-library/third_party/closure/goog/**.js'"
BLOCKLY_EXTERNS="js/blockly/externs/svg-externs.js"
IDE_EXTERNS="js/ide/externs/pretty-print-externs.js"
MANIFEST_PATH="build_manifest/mmanifest.MF"

echo "Executing:"
echo $CLOSURE_EXEC
echo "with params:"
echo $IDE_PATH
echo $BLOCKS_PATH
echo $CORE_PATH
echo $GEN_PATH
echo $BLOCK_GEN_PATH
echo $MSG_PATH
echo $CLOSURE_LIB_PATH
echo $CLOSURE_THIRD_PARTY_PATH
echo $BLOCKLY_EXTERNS
echo $IDE_EXTERNS
#--compilation_level ADVANCED_OPTIMIZATIONS \

#Compile blockly core
java -jar $CLOSURE_EXEC --js=$IDE_PATH \
  --js=$BLOCK_COLOURS \
  --js=$BLOCKS_PATH \
  --js=$CORE_PATH \
  --js=$GEN_PATH \
  --js=$BLOCK_GEN_PATH \
  --js=$MSG_PATH \
  --js=$CLOSURE_LIB_PATH \
  --js=$CLOSURE_THIRD_PARTY_PATH \
  --generate_exports \
  --externs $IDE_EXTERNS \
  --externs $BLOCKLY_EXTERNS \
  --dependency_mode=STRICT --entry_point=Ide \
  --js_output_file ide_compressed.js \
  --output_manifest $MANIFEST_PATH
