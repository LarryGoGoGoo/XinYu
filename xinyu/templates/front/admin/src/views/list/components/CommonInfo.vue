<script setup>
/**
 * @description 内容展示组件
 * mode
 * markdown 大模型返回的Markdown内容信息
 * pictures 图片列表
 */

import MarkdownIt from 'markdown-it'

const { data } = defineProps(['data'])
let { mode, content, imgList } = data

let renderedMarkdown = ''
if (mode == 'markdown') {
  const md = new MarkdownIt({
    html: false, // 默认禁用 HTML 标签（更安全）
    linkify: true, // 自动转换 URL 为链接
    typographer: true, // 启用智能标点
  })

  // 渲染为 HTML
  renderedMarkdown = md.render(content)
}
</script>

<template>
  <div v-if="mode == 'markdown'" class="markdown-content" v-html="renderedMarkdown"></div>
  <div v-else-if="mode == 'pictures'" class="common-info">
    <div v-for="item in imgList" :key="item.img">
      <div v-if="item.title" class="title">{{ item.title }}</div>
      <img :src="item.img" draggable="false" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-content {
  padding: 20px;
}
.common-info {
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #000;
    text-align: center;
  }
  img {
    width: 100%;
  }
}
</style>
