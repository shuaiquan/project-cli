#!/usr/bin/env node

const program = require('commander');
const initFunc = require('../lib/init');

const version = require('../package.json').version
/**
 * 设置 cli 的 version 信息
 * 使用 -v/--version 显示版本信息（默认是 -V）
 */
program.version(require('../package.json').version, '-v, --version');

/**
 * init <name> 初始化命令
 * name 文件名（必选）
 */
program.command('init [name]')
    .description('Initialize the project in the current folder')
    .option('--typescript', 'Start a new react project with typescript')
    .action(function(dir, cmd) {
        // console.log(dir, cmd.typescript);
        initFunc(dir);
    });

// 最后解析输入参数
program.parse(process.argv);

 