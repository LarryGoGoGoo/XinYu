/**
 * @description 权限
 */

/**
 * @description 判断 是否有 某个按钮权限
 * @param { string } tableName 菜单下的表名
 * @param { string } name 按钮名字
 * @returns
 */
function isAuth(tableName, name) {
  let buttons = getAuthButtons(tableName)
  return buttons.includes(name)
}

/**
 * @description 获取某个表的按钮权限列表buttons
 * @param {*} tableName
 * @returns
 */
function getAuthButtons(tableName) {
  let buttons = []

  if (/^(chapter)/.test(tableName)) {
    return ['新增', '查看', '删除', '修改']
  }

  if (/^(discuss)/.test(tableName)) {
    return ['查看', '删除', '修改']
  }

  let roleMenu = localStorage.getItem('roleMenu')
  if (!roleMenu) {
    return buttons
  }
  roleMenu = JSON.parse(roleMenu)

  if (tableName == 'orders') {
    buttons = getOrdersButtons(roleMenu)
  } else {
    loop(roleMenu, tableName, item => {
      buttons = item.buttons
    })
  }

  return buttons
}

/**
 * @description 递归,根据tableName找到对应的按钮权限列表
 * @param { Array } roleMenu 角色菜单列表
 * @param { String } tableName 表名
 * @param { Function } callback 回调函数
 * @returns
 */
function loop(roleMenu, tableName, callback) {
  for (let i = 0; i < roleMenu.length; i++) {
    if (roleMenu[i].tableName === tableName) {
      return callback(roleMenu[i], i, roleMenu)
    }

    // 继续子级递归
    if (roleMenu[i].child) {
      loop(roleMenu[i].child, tableName, callback)
    }
  }
}

/**
 * @description 特殊：找orders表的所有button
 * orders/已完成
 * orders/已支付
 * ...
 *
 * @returns
 */
function getOrdersButtons(roleMenu) {
  let ordersButtons = []
  roleMenu.forEach(item => {
    if (item.tableName && item.tableName.startsWith('orders/')) {
      ordersButtons.push(...item.buttons)
    }
    if (item.child) {
      item.child.forEach(i => {
        if (i.tableName && i.tableName.startsWith('orders/')) {
          ordersButtons.push(...i.buttons)
        }
      })
    }
  })

  return ordersButtons
}

export { isAuth, loop, getAuthButtons }
