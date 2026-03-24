# xvr.nvim

Neovim syntax highlighting and filetype support for the XVR programming language.

## Features

- Syntax highlighting for XVR
- Filetype detection (`.xvr` files)
- Indentation rules
- Basic filetype plugin settings

## Installation

### Using [vim-plug](https://github.com/junegunn/vim-plug)

```vim
Plug 'xvrlang/xvr.nvim'
```

### Using [packer.nvim](https://github.com/wbthomason/packer.nvim)

```lua
use 'xvrlang/xvr.nvim'
```

### Using [lazy.nvim](https://github.com/folke/lazy.nvim)

```lua
{
  'xvrlang/xvr.nvim',
  lazy = true,
}
```

### Manual Installation

```bash
# Clone into your plugin directory
git clone https://github.com/xvrlang/xvr.nvim ~/.local/share/nvim/site/pack/vendor/start/xvr.nvim
```

## Requirements

- Neovim 0.9+

## Usage

The plugin will automatically detect `.xvr` files and apply syntax highlighting.

### Manual Activation

If syntax doesn't load automatically:

```vim
:set filetype=xvr
```

## Supported Syntax

- **Keywords**: `if`, `else`, `while`, `for`, `break`, `continue`, `return`, `proc`, `include`, `astype`, `var`, `type`, `not`
- **Types**: `int`, `float`, `string`, `bool`, `void`, `int8`, `int16`, `int32`, `int64`, `uint8`, `uint16`, `uint32`, `uint64`, `float16`, `float32`, `float64`
- **Boolean**: `true`, `false`, `null`
- **Operators**: `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`
- **Strings**: Double quotes with `{}` interpolation
- **Comments**: `//` (line) and `/* */` (block)
- **Shebang**: `#!`

## Configuration

Edit your `init.vim` or `init.lua`:

```vim
" Enable syntax and filetype
syntax on
filetype on
filetype plugin indent on
```

## License

MIT
