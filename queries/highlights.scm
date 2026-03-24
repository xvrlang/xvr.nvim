; Keywords
[
  "var" "proc" "if" "else" "while" "for" "return" "break" "continue"
  "include" "astype" "type"
] @keyword

; Types
[
  "bool" "int" "float" "string" "void"
  "int8" "int16" "int32" "int64"
  "uint8" "uint16" "uint32" "uint64"
  "float16" "float32" "float64"
] @type

; Boolean & null
"true" @boolean
"false" @boolean
"null" @constant.builtin

; Literals
(integer) @number
(float) @number
(string) @string
(string_interpolation "{" @punctuation.delimiter "}" @punctuation.delimiter) @none

; Operators
[
  "==" "!=" "<" "<=" ">" ">="
  "&&" "||"
  "+" "-" "*" "/" "%" "!"
  "++" "--"
] @operator

; Punctuation
[
  ";" "," ":" "=" "(" ")" "[" "]" "{" "}"
] @punctuation.delimiter

; Identifiers
(identifier) @variable

; Function calls
(call_expression
  function: (identifier) @function.call)

; Declarations
(proc_declaration
  name: (identifier) @function)

(declaration
  name: (identifier) @variable)

(parameter
  name: (identifier) @variable.parameter)

; Comments
(comment) @comment

; Blocks
(block) @block

; Statements
(if_statement) @conditional
(while_statement) @repeat
(for_statement) @repeat
(return_statement) @keyword.return

; Include
(include_statement) @include
