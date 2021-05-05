import chalk from 'chalk';

export const ERROR = {
    INIT: {
        MISS: '缺失项目名称',
        EXIST: '该目录已经存在且不为空，无法进行初始化',
    }
}

export function logError(err) {
    console.log(chalk.red(err));
}