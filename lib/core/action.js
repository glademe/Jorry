const {promisify} = require("util")
const path = require("path")
const {vueRepo} = require("../config/repo-config");
const {commandSpawn} = require("../utils/terminal");
const downloadRepo = promisify(require('download-git-repo'));
const open = require('open');
const terminal = require('../utils/terminal');
const {compile, writeToFile, mkdirSync} = require("../utils/util");

const createProjectAction = async (project, others) => {
    // 1.提示信息
    console.log('helps you create your project, please wait a moment~')
    // 2.clone项目从仓库
    await downloadRepo(vueRepo, project, {clone: true});

    // 3.执行终端命令npm install
    // terminal.exec('npm install', {cwd: `./${project}`});
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await terminal.spawn(npm, ['install'], {cwd: `./${project}`});

    // 5.运行项目
    await terminal.spawn(npm, ['run', 'serve'], {cwd: `./${project}`});

    // 4.打开浏览器
    open('http://localhost:8080/');
}

//添加组件
const addCpnAction = async (name, dest) => {
    //1、对应的ejs模板
    //2、编译ejs模版result
    const result = await compile("component.vue.ejs", {name, lowerName: name.toLowerCase()})
    //3、将result写入到.vue文件中
    const targetPath = path.resolve(dest, `${name}.vue`)
    writeToFile(targetPath, result)
    //4、放入对应的文件夹中
}

const addPageAction = async (name, dest) => {
    //编译ejs模版
    const pageResult = await compile("component.vue.ejs", {name, lowerName: name.toLowerCase()})
    const routerResult = await compile("router.vue.ejs", {name, lowerName: name.toLowerCase()})
    //3、将result写入到.vue文件中
    //4、放入对应的文件夹中
    if (mkdirSync(dest)) {
        const targetPagePath = path.resolve(dest, `${name}.vue`)
        const targetRoutePath = path.resolve(dest, `router.js`)
        writeToFile(targetPagePath, pageResult)
        writeToFile(targetRoutePath, routerResult)
    }
}

const addStoreAction =async (name,dest)=>{
    //编译ejs模版
    const storeResult = await compile("store.vue.ejs", {name, lowerName: name.toLowerCase()})
    const storeTypeResult = await compile("store-types.vue.ejs", {name, lowerName: name.toLowerCase()})
    //3、将result写入到.vue文件中
    //4、放入对应的文件夹中
    if (mkdirSync(dest)) {
        const targetPagePath = path.resolve(dest, `index.js`)
        const targetRoutePath = path.resolve(dest, `types.js`)
        writeToFile(targetPagePath, storeResult)
        writeToFile(targetRoutePath, storeTypeResult)
    }
}
module.exports = {
    createProjectAction,
    addCpnAction,
    addPageAction,
    addStoreAction
}