/**
 * @description 在线聊天的webSocket。单例模式
 * @returns
 */
import base from '@/utils/base'
let baseUrl = base.get().url
// http协议改为ws
baseUrl = baseUrl.replace(/^http|https/, 'ws')
let isConnect = false
let websock = null

let current_websocketOnmessage = null
let current_toId = null
let current_userId = null

let timer = null
/**
 * @description 初始化webSocket
 * @param {*} toId
 * @param {*} userId
 * @param {*} websocketOnmessage
 */
function initWebSocket(toId, userId, websocketOnmessage) {
  current_toId = toId
  current_userId = userId
  current_websocketOnmessage = websocketOnmessage

  let url = `${baseUrl}ws?user_id=` + userId + '&to_id=' + toId

  websock = new WebSocket(url)
  websock.onopen = websocketOnopen
  websock.onerror = websocketOnerror
  websock.onmessage = websocketOnmessage
  websock.onclose = websocketOnclose
}

/**
 * @description 关闭webSocket
 */
function closeWebSocket() {
  if (!websock) {
    return
  }

  websock.close(1000)
  websock = null
  current_websocketOnmessage = null
  current_toId = null
  current_userId = null

  if (timer) {
    clearTimeout(timer)
  }
}

/**
 * @description 发送消息
 * @param {*} text
 */
function websocketSend(text) {
  try {
    websock.send(text)
  } catch (err) {
    console.log('send failed (' + err.code + ')')
  }
}

function websocketOnopen() {
  isConnect = true
  console.log('WebSocket连接成功')
}

function websocketOnerror(e) {
  isConnect = false
  console.log('WebSocket连接发生错误')

  // 尝试重连
  timer = setTimeout(() => {
    console.info('尝试重连...')
    initWebSocket(current_toId, current_userId, current_websocketOnmessage)
  }, 2000)
}

function websocketOnclose(e) {
  isConnect = false
  console.log('WebSocket关闭了')
}

export { initWebSocket, closeWebSocket, websocketSend }
