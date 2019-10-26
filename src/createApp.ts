import * as fs from 'fs';
import chalk from 'chalk';
import { clone, rmGit } from '@s7n/git-helper';

const url = 'https://github.com/shuaiquan/project-tpl.git';

const ERROR = {
    INIT: {
        MISS: '缺失项目名称',
        EXIST: 'destination path already exists and is not an empty directory',
    }
}

export function createApp(projectName) {
    try {
        if (!projectName) {
            throw new Error(ERROR.INIT.MISS);
        }

        // 检查当前目录中是否存在该文件夹
        try {
            fs.accessSync(projectName, fs.constants.F_OK);
            // 相应路径已存在
            throw new Error(ERROR.INIT.EXIST);
        } catch (error) {
            // 文件不存在
            clone(url, { name: projectName, branch: 'ts-tiny-template' })
                .then(destUrl => rmGit(destUrl as string))
                .then(() => console.log(chalk.green(`${projectName} 项目创建成功`)))
                .catch(e => {
                    logError(e);
                });
        }

    } catch (err) {
        logError(err);
    }
}

function logError(err) {
    console.log(chalk.red(err));
}