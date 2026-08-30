import { roleList } from '@/utils/role'
import { getFirstFilePath } from './getFilePath'
import { getListAPI } from '@/api/list'
import { downloadFileAPI } from '@/api/common'
import { customAlphabet } from 'nanoid/non-secure'
let numberNanoid = null

/**
 * @description 获取图像和账户
 * @param { object } serverData 后端返回的用户信息
 * @param { string  } tableName 当前用户的表名
 */
export function getAvatar(serverData, tableName) {
  // 获取头像字段名 和 账户字段
  let roleItem = roleList.find(roleItem => roleItem.tableName === tableName)
  let { avatarName, accountName } = roleItem
  let avatar = serverData[avatarName]
  let account = serverData[accountName]

  // 加上前缀 （不同环境不同前缀：在线预览、本地开发）
  avatar = getFirstFilePath(avatar)
  return [avatar, account]
}

/**
 * @description 替换敏感词为 ** 符号（留言板、评论等
 * @param { string } content 原内容
 */
export async function hanldeSensitiveWords(content) {
  // 敏感词字符串（配置
  let sensitiveWords
  // 从服务器拉取 敏感词，没有的话。默认配置项
  try {
    const tableName = 'sensitivewords'
    let res = await getListAPI(tableName, { limit: 1 })
    sensitiveWords = res.data.list[0].content
  } catch (error) {}

  // [1] 未配置直接返回原内容
  if (!sensitiveWords) {
    return content
  }

  // 生成正则 （匹配中文逗号、英文逗号
  let sensitiveWordsArr = sensitiveWords.split(/,|，/)
  let regStr = sensitiveWordsArr.join('|')
  let reg = new RegExp(regStr, 'g')

  let newContent = content.replace(reg, '**')
  return newContent
}

export function getNanoId() {
  if (!numberNanoid) {
    numberNanoid = customAlphabet('0123456789', 13)
  }

  return numberNanoid(13)
}

/**
 * @description 转换富文本内容为普通字符串
 * @param { string } content 富文本内容
 * @returns { string } str
 */
export function convertRichText(content) {
  let str = ''

  if (!content) {
    return str
  }

  // 1. 替换图片代码<img>
  str = content.replace(/<img[^>]*>/g, '[图片]')

  // 2. 替换其它代码<p>
  str = str.replace(/<[^>]+>/g, '')

  // 3. 只要前30个字符
  const Num = 30
  str = str.slice(0, Num)

  return str
}

/**
 * @description 从服务器下载文件
 * @param { string } fileName 文件名
 */
export function downloadFile(fileName) {
  return new Promise(async (resolve, reject) => {
    try {
      // [1] 处理文件名
      fileName = fileName.replace(new RegExp('upload/', 'g'), '')

      let data = await downloadFileAPI(fileName)

      const binaryData = []
      binaryData.push(data)

      // 这里没有传第二个参数type文件类型
      const objectUrl = window.URL.createObjectURL(new Blob(binaryData))

      // 使用a标签下载
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = fileName
      // a.click()
      // 下面这个写法兼容火狐
      a.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      )

      // 释放内存
      window.URL.revokeObjectURL(data)

      resolve()
    } catch (error) {
      let msg = `下载文件失败：${error.msg || error.message}`
      ElMessage.error(msg)
      reject(msg)
    }
  })
}
