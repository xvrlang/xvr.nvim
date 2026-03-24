module.exports = grammar({
  name: "xvr",

  extras: ($) => [/\s/, $.comment],

  conflicts: ($) => [
    [$._expression, $.index_expression],
    [$.array_expression, $.dictionary_expression],
    [$.ternary_expression],
  ],

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) => choice(
      $.declaration,
      $.expression_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.proc_declaration,
      $.return_statement,
      $.include_statement,
      $.break_statement,
      $.continue_statement,
    ),

    include_statement: ($) => seq("include", $.identifier, ";"),

    type: ($) => choice(
      "bool",
      "int",
      "float",
      "string",
      "void",
      "int8",
      "int16",
      "int32",
      "int64",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "float16",
      "float32",
      "float64",
      "type",
    ),

    integer: ($) => token(prec(2, seq(
      /\d+/,
      optional(choice("i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64"))
    ))),

    float: ($) => token(prec(2, seq(
      /\d+\.\d+/,
      optional(choice("f16", "f32", "f64")),
      optional(seq(/[eE][+-]?\d+/))
    ))),

    string: ($) => seq(
      '"',
      repeat(choice(/[^"\\]/, $.escape_sequence, $.string_interpolation)),
      '"'
    ),

    escape_sequence: ($) => /\\./,

    string_interpolation: ($) => seq(
      "{",
      $._expression,
      optional(seq(":", $.format_specifier)),
      "}"
    ),

    format_specifier: ($) => /[^}]+/,

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    scoped_identifier: ($) => seq(
      $.identifier,
      repeat1(seq("::", $.identifier))
    ),

    declaration: ($) => seq(
      "var",
      field("name", $.identifier),
      optional(seq(":", field("type", $.type))),
      optional(seq("=", field("value", $._expression))),
      ";"
    ),

    proc_declaration: ($) => seq(
      "proc",
      field("name", $.identifier),
      "(",
      optional($.parameters),
      ")",
      optional(seq(":", field("return_type", $.type))),
      field("body", $.block)
    ),

    parameters: ($) => commaSep1($.parameter),

    parameter: ($) => seq(
      optional(seq(field("name", $.identifier), ":")),
      field("type", $.type)
    ),

    block: ($) => seq(
      "{",
      repeat($._statement),
      "}"
    ),

    _expression: ($) => choice(
      $.binary_expression,
      $.unary_expression,
      $.ternary_expression,
      $.primary_expression,
    ),

    primary_expression: ($) => choice(
      $.integer,
      $.float,
      $.string,
      "true",
      "false",
      "null",
      $.identifier,
      $.scoped_identifier,
      $.parenthesized_expression,
      $.call_expression,
      $.method_call_expression,
      $.cast_expression,
      $.array_expression,
      $.dictionary_expression,
      $.index_expression,
    ),

    parenthesized_expression: ($) => seq("(", $._expression, ")"),

    unary_expression: ($) => prec(4, seq(
      field("operator", choice("!", "-", "+", "++", "--")),
      field("argument", $.primary_expression)
    )),

    postfix_expression: ($) => prec.right(5, seq(
      $.primary_expression,
      choice("++", "--")
    )),

    binary_expression: ($) => choice(
      ...[
        ["||", 1],
        ["&&", 2],
        ["==", 3], ["!=", 3],
        ["<", 4], ["<=", 4], [">", 4], [">=", 4],
        ["+", 5], ["-", 5],
        ["*", 6], ["/", 6], ["%", 6],
      ].map(([op, precedence]) =>
        prec.left(precedence, seq(
          field("left", $._expression),
          field("operator", op),
          field("right", $._expression)
        ))
      )
    ),

    ternary_expression: ($) => prec(7, seq(
      field("condition", $._expression),
      "?",
      field("consequent", $._expression),
      ":",
      field("alternate", $._expression)
    )),

    call_expression: ($) => prec(6, seq(
      field("function", choice($.identifier, $.scoped_identifier)),
      "(",
      optional(commaSep(field("arguments", $._expression))),
      ")"
    )),

    method_call_expression: ($) => prec(6, seq(
      field("object", $.primary_expression),
      ".",
      field("method", $.identifier),
      "(",
      optional(commaSep(field("arguments", $._expression))),
      ")"
    )),

    cast_expression: ($) => prec(5, seq(
      field("value", $._expression),
      "astype",
      field("type", $.type)
    )),

    array_expression: ($) => seq(
      "[",
      optional(commaSep($._expression)),
      "]"
    ),

    dictionary_expression: ($) => seq(
      "[",
      commaSep($.key_value_pair),
      "]"
    ),

    key_value_pair: ($) => seq(
      field("key", $._expression),
      ":",
      field("value", $._expression)
    ),

    index_expression: ($) => seq(
      $.primary_expression,
      "[",
      $._expression,
      "]"
    ),

    if_statement: ($) => seq(
      "if",
      "(",
      field("condition", $._expression),
      ")",
      field("consequent", $.block),
      optional(seq("else", choice(field("alternate", $.block), $.if_statement)))
    ),

    while_statement: ($) => seq(
      "while",
      "(",
      field("condition", $._expression),
      ")",
      field("body", $.block)
    ),

    for_statement: ($) => seq(
      "for",
      "(",
      field("initializer", optional(choice($._expression, $.declaration))),
      ";",
      field("condition", optional($._expression)),
      ";",
      field("update", optional($._expression)),
      ")",
      field("body", $.block)
    ),

    return_statement: ($) => seq(
      "return",
      choice(
        seq($._expression, optional(";")),
        ";"
      )
    ),

    break_statement: ($) => seq("break", optional(";")),

    continue_statement: ($) => seq("continue", optional(";")),

    expression_statement: ($) => seq($._expression, optional(";")),

    comment: ($) => token(seq("//", /.*/)),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}