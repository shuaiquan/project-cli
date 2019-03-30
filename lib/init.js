const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const fs = require('fs');
const chalk = require('chalk');

const url = 'https://github.com/shuaiquan/project-tpl.git';

const GIT_CLONE = 'git clone';

const ERROR = {
    INIT: {
        MISS: '缺失项目名称',
        EXIST: 'destination path already exists and is not an empty directory',
    }
}

module.exports = function (dirName, useTS) {
    try {
        // 检查是否输入项目路径
        if (!dirName) {
            throw new Error(ERROR.INIT.MISS);
        }

        // 检查当前目录中是否存在该文件夹
        try {
            fs.accessSync(dirName, fs.constants.F_OK);
        } catch (error) {
            // 文件不存在
            const cmdStr = `${GIT_CLONE} -b ts-tiny-template ${url} ${dirName}`;
            
            exec(cmdStr, (err, stdout, stderr) => {
                if (err) {
                    log(err);
                    return;
                }
                // fs.rmdirSync(path.resolve(process.cwd(), `./${dirName}/.git`));
                execSync(`rm -rf ./${dirName}/.git`);
                console.log(chalk.green(`${dirName} 项目创建成功`));
            });
            return;
        }
        // 相应路径已存在
        throw new Error(ERROR.INIT.EXIST);

    } catch (err) {
        logError(err);
    }
}

function logError(err) {
    console.log(chalk.red(err));
}