/**
 * @description 列表页面的按钮
 */

import tableConfigs from './tableConfigs'
import { getAuthButtons } from './auth'
/**
 * @description 获取列表页面的头部按钮
 * @param { string } tableName orders
 * @param { string } menuTableName menus菜单里的tableName字段，orders/已支付
 */
function getHeaderButtons(tableName, menuTableName) {
  // 所有按钮
  let allHeaderButtons = tableConfigs[tableName].headerButtons

  // 从backMenu根据tableName找对应的权限buttons
  let buttons = getAuthButtons(menuTableName)

  // 经过权限验证后的按钮
  let headerButtons = allHeaderButtons.filter(item => {
    // 不需要权限的按钮
    if (item.isPublic) return true

    // 判断权限
    return buttons.includes(item.name)
  })

  return headerButtons
}

// 获取操作按钮
function getTableButtons(tableName, menuTableName) {
  // 所有按钮
  let allTableButtons = tableConfigs[tableName].tableButtons

  // 从backMenu根据tableName找对应的authButtonNames :['新建','删除', ...]
  let buttons = getAuthButtons(menuTableName)

  let actionButtons = allTableButtons.filter(item => {
    if (item.isPublic) return true

    return buttons.includes(item.name)
  })

  return actionButtons
}

export { getHeaderButtons, getTableButtons }
