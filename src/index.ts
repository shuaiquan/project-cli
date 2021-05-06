#!/usr/bin/env node
import { program } from 'commander';
import { createApp, TemplateType } from './create';

const version = require('../package.json').version;

/**
 * 设置 cli 的 version 信息
 * 使用 -v/--version 显示版本信息（默认是 -V）
 */
program.version(version, '-v, --version');

// 空行不要误删
const typeDes = `选择创建的模版类型
               ts-react (支持 TS + React)
               es (仅支持 ES)
               ts (仅支持 TS)`;

/**
 * init <name> 初始化命令
 * name 文件名（必选）
 */
program.command('create-app [name]')
    .description('在当前文件夹创建一个新的项目（默认支持 TS + React）')
    .option('--type [type]', typeDes)
    .action(function (dir, options) {
        let type = TemplateType.TSReact;
        if (options.type === 'es') {
            type = TemplateType.ES;
        } else if (options.type === 'ts') {
            type = TemplateType.TS;
        }
        createApp(dir, type);
    });

// 最后解析输入参数
program.parse(process.argv);

