module.exports = grammar({
  name: "xvr",

  extras: ($) => [/\s/, $.comment],

  conflicts: ($ => [
    [$._expression, $.unary_expression],
  ]),

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

    integer: ($) => /\d+([eE][+-]?\d+)?/,
    float: ($) => /\d+\.\d+([eE][+-]?\d+)?/,

    string: ($) => seq('"', repeat(choice(/[^"\\]/, $.escape_sequence, $.string_interpolation)), '"'),

    escape_sequence: ($) => /\\./,

    string_interpolation: ($) => seq("{", $._expression, "}"),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

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
      field("name", $.identifier),
      ":",
      field("type", $.type)
    ),

    block: ($) => seq("{", repeat($._statement), "}"),

    _expression: ($) => choice(
      $.binary_expression,
      $.unary_expression,
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
      $.parenthesized_expression,
      $.call_expression,
      $.cast_expression,
      $.array_expression,
      $.index_expression,
    ),

    array_expression: ($) => seq("[", optional(commaSep($._expression)), "]"),

    index_expression: ($) => seq($.primary_expression, "[", $._expression, "]"),

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

    call_expression: ($) => prec(6, seq(
      field("function", $.identifier),
      "(",
      optional(commaSep(field("arguments", $._expression))),
      ")"
    )),

    cast_expression: ($) => prec(5, seq(
      field("value", $._expression),
      "astype",
      field("type", $.type)
    )),

    ternary_expression: ($) => prec(7, seq(
      $._expression,
      "?",
      $._expression,
      ":",
      $._expression,
    )),

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

    return_statement: ($) => seq("return", optional($._expression), ";"),

    break_statement: ($) => seq("break", ";"),

    continue_statement: ($) => seq("continue", ";"),

    expression_statement: ($) => seq($._expression, ";"),

    comment: ($) => token(seq("//", /.*/)),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
