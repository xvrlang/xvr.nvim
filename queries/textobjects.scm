; Functions
(proc_declaration
  name: (identifier) @function.outer
  body: (block) @function.inner)

(call_expression) @function.call

; Parameters
(parameters
  (parameter
    name: (identifier) @parameter.outer)) @parameter.outer

; Variables
(declaration
  name: (identifier) @variable.outer
  value: (_) @variable.inner) @variable.outer

; Conditionals
(if_statement
  consequent: (block) @conditional.inner
  alternate: (block)? @conditional.inner) @conditional.outer

; Loops
(while_statement
  body: (block) @repeat.inner) @repeat.outer

(for_statement
  body: (block) @repeat.inner) @repeat.outer

; Blocks
(block) @block.outer
