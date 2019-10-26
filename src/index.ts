#!/usr/bin/env node

import * as program from 'commander';
import { createApp } from './createApp';

const packageInfo = require('../package.json');

/**
 * 设置 cli 的 version 信息
 * 使用 -v/--version 显示版本信息（默认是 -V）
 */
program.version(packageInfo.version, '-v, --version');

/**
 * init <name> 初始化命令
 * name 文件名（必选）
 */
program.command('create-app [name]')
    .description('Initialize the project in the current folder')
    .option('--typescript', 'Start a new react project with typescript')
    .action(function (dir) {
        createApp(dir);
    });

// 最后解析输入参数
program.parse(process.argv);

