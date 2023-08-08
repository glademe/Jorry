//终端执行命令相关的代码
const {spawn} = require('child_process')
const spawnCommand = (...args) => {
    return new Promise((resole, reject) => {
        const childProcess = spawn(...args);
        //打印下载日志
        childProcess.stdout.pipe(process.stdout);
        //打印下载错误日志
        childProcess.stderr.pipe(process.stderr);
        childProcess.on('close', () => {
            resole();
        })
    })
}


module.exports = {
    spawn: spawnCommand,
}