const program = require('commander')
const helpOption = () => {
//增加可选参数
    program.option('-i --intro', 'a simple vue cli')
// 指定生成路径
    program.option('-d --dest <dest>', 'a destion folder 例如: -d src/components')
// 指定框架
    program.option('-f --framework <framework>', 'template type 例如: -f vue/react')


    //监听指令
    program.on("--help", function () {
        console.log("")
        console.log("Other:")
        console.log(" other options~")
    })
}


module.exports = helpOption;