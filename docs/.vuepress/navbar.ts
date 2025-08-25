/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
  // },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      {
        text: 'Java后端面试题',
        link: '/study-notes/back-end/java/',
        activeMatch: '^/study-notes/back-end/java/',
        icon: 'emojione:memo',
      },
      {
        text: 'python',
        link: '/study-notes/back-end/python/',
        activeMatch: '^/study-notes/back-end/python/',
        icon: 'skill-icons:python-light',
      },
      {
        text: 'redis',
        link: '/study-notes/back-end/redis/',
        activeMatch: '^/study-notes/back-end/redis/',
        icon: 'skill-icons:redis-light',
      },
    ],
  },
])
