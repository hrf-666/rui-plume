/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import {defineNavbarConfig} from 'vuepress-theme-plume'

export default defineNavbarConfig([
    {text: '首页', link: '/'},
    {text: '博客', link: '/blog/'},
    {text: '标签', link: '/blog/tags/'},
    {text: '归档', link: '/blog/archives/'},
    // {
    //   text: '笔记',
    //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
    // },
    {
        text: '笔记',
        icon: 'icon-park-solid:bookshelf',
        items: [
            {
                text: '后端面经',
                items: [{
                    text: 'Java后端面试题',
                    link: '/study-notes/back-end/java/',
                    activeMatch: '^/study-notes/back-end/java/',
                    icon: 'streamline-ultimate-color:file-java',
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
                ]
            },
            {
                text: '前端面经',
                items: [{
                    text: 'HTML',
                    link: '/study-notes/front-end/html/',
                    activeMatch: '^/study-notes/front-end/html/',
                    icon: 'streamline-ultimate-color:programming-language-html-5',
                },
                    {
                        text: 'JavaScript',
                        link: '/study-notes/front-end/javaScript/',
                        activeMatch: '^/study-notes/front-end/javaScript/',
                        icon: 'streamline-ultimate-color:science-molecule',
                    }
                ]
            },
            {
                text: '备考',
                items: [{
                    text: '中级软件设计',
                    link: '/preparation-exams/IntermediateSoftwareDesigner/',
                    activeMatch: '^/preparation-exams/IntermediateSoftwareDesigner/',
                    icon: 'streamline-ultimate-color:app-window-pie-chart',
                },]
            },

        ],

    },
    {
        text: '更多',
        icon: 'mingcute:more-3-fill',
        items: [
            {
                text: '阅读',
                link: '/read/',
                icon: 'material-symbols:recommend',
                activeMatch: '^/read/',
            },
            {
                text: '程序员导航',
                link: '/navigation/',
                icon: 'mdi:roadmap',
                activeMatch: '^/navigation',
            },
            {
                text: 'AI 模型导航',
                link: '/ai/',
                icon: 'eos-icons:ai',
                activeMatch: '^/ai/',
            },
        ],
    },
])
