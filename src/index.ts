#!/usr/bin/env node
const { program } = require('commander');
const { createApp, TemplateType } = require('./create');
const version = require('../package.json').version;

/**
 * 设置 cli 的 version 信息
 * 使用 -v/--version 显示版本信息（默认是 -V）
 */
program.version(version, '-v, --version');

/**
 * init <name> 初始化命令
 * name 文件名（必选）
 */
program.command('create-app [name]')
    .description('在当前文件夹创建一个新的项目（默认支持 TS + React）')
    .option('--es', '创建一个仅支持 ES 的项目模版')
    .action(function (dir, options) {
        const type = options.es ? TemplateType.ES : TemplateType.TSReact;
        createApp(dir, type);
    });

// 最后解析输入参数
program.parse(process.argv);

