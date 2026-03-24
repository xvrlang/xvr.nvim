# xvr.nvim

Neovim tree-sitter based syntax highlighting and filetype support for the XVR programming language.

## Features

- Tree-sitter based syntax highlighting for XVR
- Filetype detection (`.xvr` files)
- Code folding support
- Syntax-based textobjects

## Installation

### Using [lazy.nvim](https://github.com/folke/lazy.nvim)

```lua
{
  'xvrlang/xvr.nvim',
  lazy = true,
}
```

### Requirements

- Neovim 0.12+
- [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) installed

The plugin will automatically install the XVR tree-sitter parser.

### Quick Setup

Ensure you have nvim-treesitter installed and configured:

```lua
-- In your plugins/init.lua
{
  "nvim-treesitter/nvim-treesitter",
  opts = {
    ensure_installed = { "xvr" },
    highlight = { enable = true },
  },
}
```

The plugin handles the rest automatically.

## Manual Parser Installation

If you need to install manually:

```bash
# In the xvr.nvim plugin directory
npm install -g tree-sitter-cli
tree-sitter generate
cc -shared -o xvr.so -fPIC -Os -I./src src/parser.c
mkdir -p parser && mv xvr.so parser/
```

## Supported Syntax

- **Keywords**: `var`, `proc`, `if`, `else`, `while`, `for`, `return`, `break`, `continue`, `include`, `astype`, `type`
- **Types**: `int`, `float`, `string`, `bool`, `void`, `int8`, `int16`, `int32`, `int64`, `uint8`, `uint16`, `uint32`, `uint64`, `float16`, `float32`, `float64`
- **Boolean**: `true`, `false`, `null`
- **Operators**: `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`, `++`, `--`
- **Strings**: Double quotes with `{}` interpolation
- **Comments**: `//` (line)

## License

MIT
