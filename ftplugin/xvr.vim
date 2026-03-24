" Vim filetype plugin
" Language: XVR

setlocal commentstring=//\ %s
setlocal expandtab
setlocal shiftwidth=4
setlocal softtabstop=4
setlocal tabstop=4

if exists('&foldmethod')
  setlocal foldmethod=syntax
endif
