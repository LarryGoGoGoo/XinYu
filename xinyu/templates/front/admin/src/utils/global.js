/**
 * @description 注册能够被应用内所有组件实例访问到的全局属性的对象
 */

import { getListAPI } from '@/api/list'
import projectConfig from '@/utils/project'
import { reactive, ref } from 'vue'
import { getFirstFilePath } from './getFilePath'

const projectImages = reactive({
  logo: '',
  bLoginBackgroundImg: '',
  bRegisterBackgroundImg: '',
  bIndexBackgroundImg: '',
})

export default function registerGlobalData(app) {
  // 项目名
  app.config.globalProperties.projectName = projectConfig.projectName

  // 图片/logo
  app.config.globalProperties.$projectImages = projectImages
}

getProjectImages()
async function getProjectImages() {
  try {
    let res = await getListAPI('config', { type: 3 })

    let names = ['bTopLogo', 'bLoginBackgroundImg', 'bRegisterBackgroundImg', 'bIndexBackgroundImg']
    res.data.list.forEach(item => {
      let { name, value } = item
      if (!names.includes(name)) return

      let url = getFirstFilePath(value)

      if (name == 'bTopLogo') {
        projectImages.logo = url
      } else {
        projectImages[name] = url
      }
    })
  } catch (error) {}
}
