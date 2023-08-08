const ejs = require('ejs')
const fs = require("fs")
const path = require("path")
const compile = (template, data) => {
    const templatePosition = `../templates/${template}`
    const templatePath = path.resolve(__dirname, templatePosition)
    //读取文件
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if (err) {
                reject(err)
                return;
            }
            resolve(result)
        })
    })
}

const writeToFile = (path, result) => {
    return fs.promises.writeFile(path, result)
}

const mkdirSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        // 不存在,判断父亲文件夹是否存在？
        if (mkdirSync(path.dirname(dirname))) {
            // 存在父亲文件，就直接新建该文件
            fs.mkdirSync(dirname)
            return true
        }
    }
}
module.exports = {
    compile,
    writeToFile,
    mkdirSync
}