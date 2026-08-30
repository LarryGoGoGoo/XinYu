/**
 * @description 隐私脱敏工具
 * 用于心理医生等「非管理员」视角展示患者姓名时做脱敏，保护患者隐私。
 * 管理员（users）视角不受影响，仍展示完整姓名。
 */

/**
 * @description 姓名脱敏：保留首字符，其余用 * 替代
 * @param { string } name 姓名，如「张三」「欧阳娜娜」
 * @returns { string } 脱敏后的姓名，如「张*」「欧***」
 */
export function maskName(name) {
  if (name === null || name === undefined) return ''
  name = String(name).trim()
  if (!name) return ''
  if (name.length <= 1) return name + '*'
  return name[0] + '*'.repeat(name.length - 1)
}

/**
 * @description 判断当前登录是否管理员（users 表）
 */
export function isAdminSession() {
  return localStorage.getItem('sessionTable') === 'users'
}
