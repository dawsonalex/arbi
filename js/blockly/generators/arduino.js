
/**
 * File is based on google's Dart generator found at:
 * https://github.com/google/blockly/blob/master/generators/dart.js
 * @fileoverview Helper functions for generating Ardunio code.
 * @author Alex Dawson
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');


/**
 * Arduino code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
  //http://en.cppreference.com/w/cpp/keyword
  'alignas,alignof,and,and_eq,asm,atomic_cancel,atomic_commit,'  +
  'atomic_noexcept,auto,bitand,bitor,bool,break,case,catch,char,' +
  'char16_t,char32_t,class,compl,concept,const,constexpr,const_cast,' +
  'continue,co_await,co_return,co_yield,decltype,default,delete,do,double,' +
  'dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,' +
  'if,import,inline,int,long,module,mutable,namespace,new,noexcept,' +
  'not,not_eq,nullptr,operator,or,or_eq,private,protected,public,' +
  'register,reinterpret_cast,requires,return,short,signed,sizeof,' +
  'static,static_assert,static_cast,struct,switch,synchronized,' +
  'template,this,thread_local,throw,true,try,typedef,typeid,' +
  'typename,union,unsigned,using,virtual,void,volatile,wchar_t,' +
  'while,xor,xor_eq'
);

/**
 * Order of operation ENUMs.
 * http://en.cppreference.com/w/cpp/language/operator_precedence
 */
Blockly.Arduino.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.Arduino.ORDER_SCOPE_RES = 1;            // ::
Blockly.Arduino.ORDER_POSTFIX_INC_DEC = 2;      // a++ a
Blockly.Arduino.ORDER_FUNCTIONAL_CAST = 2;      // type()
Blockly.Arduino.ORDER_FUNCTION_CALL = 2;        // a()
Blockly.Arduino.ORDER_SUBSCRIPT = 2;            // a[]
Blockly.Arduino.ORDER_MEMBER_ACCESS = 2;        // .  ->
Blockly.Arduino.ORDER_UNARY_PREFIX = 3;         // ++a  --a -a +a ! ~
Blockly.Arduino.ORDER_C_CAST = 3;               // (type)
Blockly.Arduino.ORDER_INDIRECTION = 3;          // *a
Blockly.Arduino.ORDER_DEREFERENCE = 3;          // &a
Blockly.Arduino.ORDER_DYNAMIC_MEMORY = 3;       // new new[] delete delete[]
Blockly.Arduino.ORDER_POINTER_TO_MEMBER = 4;    // .*   .->
Blockly.Arduino.ORDER_MULTIPLICATIVE = 5;       // a*b  a/b a%b
Blockly.Arduino.ORDER_ADDITIVE = 6;             // a+b  a-b
Blockly.Arduino.ORDER_BITWISE_SHIFT = 7;        // >>   <<
Blockly.Arduino.ORDER_THREE_WAY_COMPARISON = 8; // <=>
Blockly.Arduino.ORDER_RELATIONAL = 9;           // <  >  <=  >=
Blockly.Arduino.ORDER_EQUALITY = 10;            // == !=
Blockly.Arduino.ORDER_BITWISE_AND = 11;         // &
Blockly.Arduino.ORDER_BITWISE_XOR = 12;         // ^
Blockly.Arduino.ORDER_BITWISE_OR = 13;          // |
Blockly.Arduino.ORDER_LOGICAL_AND = 14;         // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 15;          // ||
Blockly.Arduino.ORDER_CONDITIONAL = 16;         // a?b:c
Blockly.Arduino.ORDER_THROW_OPERATOR = 16;      // throw
Blockly.Arduino.ORDER_ASSIGNMENT = 16;          // = += -= *= /= %= <<= >>= &= |= ^=
Blockly.Arduino.ORDER_COMMA = 17;               // ,
Blockly.Arduino.ORDER_NONE = 99;          // (...)

Blockly.Arduino.TYPE_NUMBER = "Number";
Blockly.Arduino.TYPE_STRING = "String";
Blockly.Arduino.TYPE_BOOL = "Boolean";

Blockly.Arduino.Types = {
  "Number":"int",
  "String":"string",
  "Boolean":"bool"
};

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
 Blockly.Arduino.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Arduino.functionNames_ = Object.create(null);

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
        new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }

  Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());

  var allVars = Blockly.Variables.allUsedVarModels(workspace);

  Blockly.Arduino.definitions_['variables'] = Blockly.Arduino.getDefinitonsForType(allVars,
      Blockly.Arduino.TYPE_NUMBER);

  var stringDefs = Blockly.Arduino.getDefinitonsForType(allVars, Blockly.Arduino.TYPE_STRING);
    Blockly.Arduino.definitions_['variables'] += stringDefs != "" ? '\n' + stringDefs : "";

  var boolDefs = Blockly.Arduino.getDefinitonsForType(allVars, Blockly.Arduino.TYPE_BOOL);
    Blockly.Arduino.definitions_['variables'] += boolDefs != "" ? '\n' + boolDefs : "";

  };

  /**
   * Get C/C++ variable definitions for variables in the workspace of a specific type.
   * @param  {!Array<Blockly.VariableModel>} varModels An array of variable models to use.
   * @param  {!string} matchType A string defining the type of variable to return definitions for.
   * @return {string}           A C/C++ valid string of variable defitions.
   */
  Blockly.Arduino.getDefinitonsForType = function (varModels, matchType) {
    var matchedVars = varModels.filter(thisVar => thisVar.type === matchType);
    if (matchedVars.length === 0) {
      return "";
    }
    var matchedVarNames = [];
    for (var i = 0; i < matchedVars.length; i++) {
      matchedVarNames.push(matchedVars[i].name);
    }
    var varDefs = Blockly.Arduino.Types[matchType] + ' ' + matchedVarNames.join(', ') + ';';
    return varDefs;
  };

  /**
   * Prepend the generated code with the variable definitions.
   * @param {string} code Generated code.
   * @return {string} Completed code.
   */
  Blockly.Arduino.finish = function(code) {
    // Indent every line.
    if (code) {
      code = Blockly.Arduino.prefixLines(code, Blockly.Arduino.INDENT);
    }

    // Convert the definitions dictionary into a list.
    var includes = [];
    var definitions = [];
    for (var name in Blockly.Arduino.definitions_) {
      var def = Blockly.Arduino.definitions_[name];
      if (def.match(/^#include\s/)) {
        includes.push(def);
      } else {
        definitions.push(def);
      }
    }
    // Clean up temporary data.
    delete Blockly.Arduino.definitions_;
    delete Blockly.Arduino.functionNames_;
    Blockly.Arduino.variableDB_.reset();
    var allDefs = includes.join('\n') + '\n\n' + definitions.join('\n\n');
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
  };

  /**
   * Naked values are top-level blocks with outputs that aren't plugged into
   * anything.  A trailing semicolon is needed to make this legal.
   * @param {string} line Line of generated code.
   * @return {string} Legal line of code.
   */
  Blockly.Arduino.scrubNakedValue = function(line) {
    return line + ';\n';
  };

  /**
   * Encode a string as a properly escaped C/C++ string, complete with quotes.
   * @param {string} string Text to encode.
   * @return {string} C/C++ string.
   * @private
   */
  Blockly.Arduino.quote_ = function(string) {
    // Can't use goog.string.quote since $ must also be escaped.
    string = string.replace(/\\/g, '\\\\')
                   .replace(/\n/g, '\\\n')
                   .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating C/C++ from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The C/C++ code created for this block.
 * @return {string} C/C++ code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Arduino.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use documentation comment for function comments.
        commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
      } else {
        commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Arduino.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Arduino.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_ADDITIVE) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Arduino.valueToCode(block, atId,
        Blockly.Arduino.ORDER_UNARY_PREFIX) || defaultAtIndex;
  } else {
    var at = Blockly.Arduino.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Arduino.ORDER_ADDITIVE;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Arduino.ORDER_ADDITIVE;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Arduino.ORDER_UNARY_PREFIX;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
