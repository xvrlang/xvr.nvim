" Vim syntax file
" Language: XVR
" Maintainer: XVR Community

if exists("b:current_syntax")
  finish
endif

let b:current_syntax = "xvr"

syn case match

syn keyword xvrKeyword if else while for break continue return proc include astype
syn keyword xvrKeyword var type not
syn keyword xvrBoolean true false null
syn keyword xvrOperator and or

syn keyword xvrType int float string bool void
syn keyword xvrType int8 int16 int32 int64
syn keyword xvrType uint8 uint16 uint32 uint64
syn keyword xvrType float16 float32 float64

syn match xvrNumber '\<\d\+\([eE][+-]\?\d\+\)\?\>'
syn match xvrNumber '\<\d\+\.\d\+\([eE][+-]\?\d\+\)\?>'
syn match xvrNumber '\<\d\+[iu]\d*\>'
syn match xvrNumber '\<\d\+[fu]\d*\>'

syn match xvrIdentifier '\h\w*'

syn match xvrFunction '\h\w*\s*('

syn match xvrOperator '[-+*/%]=\|==\|!=\|<=\|>=\|<\|>\|&&\|||'

syn region xvrString start=+"+ skip=+\\"+ end=+"+ contains=xvrStringInterp
syn match xvrStringInterp '{\}' contained
syn match xvrStringInterp '{[^}]*}' contained

syn region xvrComment start="//" end="$" contains=xvrTodo,@Spell
syn region xvrComment start="/\*" end="\*/" contains=xvrTodo,@Spell

syn match xvrShebang '^#!.*'

syn keyword xvrTodo TODO FIXME XXX NOTE contained

syn region xvrBlock start="{" end="}" transparent fold

hi def link xvrKeyword      Keyword
hi def link xvrBoolean     Boolean
hi def link xvrType        Type
hi def link xvrNumber      Number
hi def link xvrString      String
hi def link xvrStringInterp SpecialChar
hi def link xvrFunction    Function
hi def link xvrOperator    Operator
hi def link xvrComment     Comment
hi def link xvrIdentifier  Identifier
hi def link xvrShebang     PreProc
hi def link xvrTodo        Todo
