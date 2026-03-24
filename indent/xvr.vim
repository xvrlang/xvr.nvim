" Vim indent file
" Language: XVR

if exists("b:did_indent")
  finish
endif
let b:did_indent = 1

setlocal indentkeys=0{,0},0),0],!^F,o,O
setlocal indentexpr=XvrIndent()

function! XvrIndent()
  let l:lnum = v:lnum
  let l:line = getline(l:lnum)
  let l:prevline = getline(l:lnum - 1)

  if l:lnum == 1
    return 0
  endif

  if l:line =~ '^\s*}'
    return indent(l:lnum - 1) - &shiftwidth
  endif

  if l:prevline =~ '{\s*$'
    return indent(l:lnum - 1) + &shiftwidth
  endif

  if l:prevline =~ '^\s*\(if\|else\|while\|for\|proc\)'
    return indent(l:lnum - 1) + &shiftwidth
  endif

  if l:prevline =~ '^\s*else\s*$'
    return indent(l:lnum - 1) + &shiftwidth
  endif

  return indent(l:lnum - 1)
endfunction
