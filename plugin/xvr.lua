local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.xvr = {
  install_info = {
    url = vim.fn.stdpath("data") .. "/lazy/xvr.nvim",
    files = { "src/parser.c" },
    branch = "main",
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = "xvr",
  maintainers = { "@xvrlang" },
}

vim.api.nvim_create_autocmd("FileType", {
  pattern = "xvr",
  callback = function(args)
    local buf = args.buf
    vim.treesitter.start(buf)
  end,
})
