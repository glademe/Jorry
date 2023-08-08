const program = require('commander');
const {createProjectAction, addCpnAction, addPageAction, addStoreAction} = require("./action");

const createCommands = () => {
    program
        //命令
        .command('create <project> [other...]')
        // 描述
        .description("clone a repository into a folder")
        .action(createProjectAction)

    program
        .command('addcpn <name>')
        .description("add vue component 例如:jorry addcpn HelloWorld [-d src/components]")
        .action((name)=>{
            addCpnAction(name,program.dest || "src/components")
        })

    program
        .command('addpage <name>')
        .description("add vue page and router config 例如：jorry addpage Home [-d dest]")
        .action((name)=>{
            addPageAction(name, program.dest || `src/pages/${name.toLowerCase()}`)
        })

    program
        .command('addstore <name>')
        .description("add vue store and store-type config 例如：jorry addstore  [-d dest]")
        .action((name)=>{
            addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
        })

}
module.exports = createCommands