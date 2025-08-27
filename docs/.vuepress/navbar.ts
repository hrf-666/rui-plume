/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import {defineNavbarConfig} from 'vuepress-theme-plume'

export default defineNavbarConfig([
    {text: '首页', link: '/', icon: 'streamline-ultimate-color:award-trophy-1'},
    {text: '博客', link: '/blog/', icon: 'streamline-ultimate-color:blogger-logo'},
    {text: '标签', link: '/blog/tags/', icon: 'streamline-ultimate-color:tags-1'},
    {text: '归档', link: '/blog/archives/', icon: 'streamline-ultimate-color:instagram-logo'},
    // {
    //   text: '笔记',
    //   items: [{ text: '示例', link: '/notes/demo/README.md' }]
    // },
    {
        text: '笔记',
        icon: 'streamline-ultimate-color:shelf-books-1',
        items: [
            {
                text: '后端面经',
                items: [
                    {
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
                items: [
                    {
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
            {
                text: '开源代码',
                items: [{
                    text: '后端Demo',
                    link: '/code-demo/back-end-code/',
                    activeMatch: '^/code-demo/back-end-code/',
                    icon: 'streamline-ultimate-color:archive-books',
                },
                    {
                        text: '前端Demo',
                        link: '/code-demo/front-end-code/',
                        activeMatch: '^/code-demo/front-end-code/',
                        icon: 'streamline-ultimate-color:archive-locker',
                    },]
            },

        ],

    },
    {
        text: '更多',
        icon: 'streamline-ultimate-color:navigation-menu-horizontal-1',
        items: [
            {
                text: '导航',
                items: [
                    {
                        text: '程序员导航',
                        link: '/navigation/sites',
                        icon: 'mdi:roadmap',
                        activeMatch: '^/navigation',
                    },
                    {
                        text: 'AI 模型导航',
                        link: '/navigation/ai',
                        icon: 'eos-icons:ai',
                        activeMatch: '^/ai/ai/',
                    },]
            },
            {
                text: '简介',
                items: [
                    {
                        text: '阅读',
                        link: '/read/',
                        icon: 'streamline-ultimate-color:app-window-text',
                        activeMatch: '^/read/',
                    },
                    {
                        text: '关于我',
                        link: '/aboutme/',
                        icon: 'streamline-ultimate-color:single-woman-home',
                        activeMatch: '^/aboutme/',
                    },
                    {
                        text: '友情链接',
                        link: '/aboutme/friends/',
                        icon: 'skill-icons:tauri-light',
                        activeMatch: '^/aboutme/friends/',
                    },
                ]
            },

        ],
    },
])
