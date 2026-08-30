/**
 * @description 读取config目录下的js文件
 */

const tableModules = import.meta.glob('../config/**/table.js', { eager: true })

// List模块的所有文件夹名字 ==> 首页界面的部分子路由路径
export let moduleDirNames = []

// 表配置
let tableConfigs = {}

for (const path in tableModules) {

  let dirName = path.split('/')[2]
  moduleDirNames.push(dirName)
  tableConfigs[dirName] = tableModules[path]
}

export default tableConfigs
