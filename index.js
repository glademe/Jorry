#!/usr/bin/env node
const program = require('commander')
const helpOption = require("./lib/core/help")
//create的函数
const createCommands = require("./lib/core/create");
// 设置版本
program.version(require("./package.json").version)



//help命令
helpOption()
//创建其他的函数
createCommands()
//解析参数
program.parse(process.argv)