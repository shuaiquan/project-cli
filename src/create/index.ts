import * as fs from 'fs';
import chalk from 'chalk';
import { clone, rmGit } from '@s7n/git-helper';
import { BranchMap, TemplateType, TEMPLATE_REPO } from './const';
import { ERROR, logError } from '../error';

function createApp(projectName: string, type: TemplateType = TemplateType.TSReact) {
    try {
        if (!projectName) {
            throw new Error(ERROR.INIT.MISS);
        }

        // 检查当前目录中是否存在该文件夹
        try {
            fs.accessSync(projectName, fs.constants.F_OK);
            // 相应路径已存在
            logError(new Error(ERROR.INIT.EXIST));
        } catch (error) {
            const branch = BranchMap[type] || BranchMap[TemplateType.TSReact];
            // 文件不存在
            clone(TEMPLATE_REPO, { name: projectName, branch })
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

export {
    createApp,
    TemplateType,
}