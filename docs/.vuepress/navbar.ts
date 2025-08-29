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
                link: '/code-demo/',
                activeMatch: '^/code-demo/',
                icon: 'streamline-ultimate-color:aircraft-hot-air-balloon-2',
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
                        icon: 'streamline-ultimate-color:maps',
                        activeMatch: '^/navigation/sites',
                    },
                    {
                        text: 'AI 模型导航',
                        link: '/navigation/ai',
                        icon: 'streamline-ultimate-color:design-file-ai',
                        activeMatch: '^/navigation/ai/',
                    },
                    {
                        text: 'Command-Line Interface',
                        link: '/cli/',
                        icon: 'streamline-ultimate-color:app-window-code',
                        activeMatch: '^/cli',
                    },
                    {
                        text: '程序员容易发音错误的单词',
                        link: '/cpwp/',
                        icon: 'streamline-ultimate-color:car-tool-jumper-cables',
                    },
                ]
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
                    {
                        text: '备忘录',
                        link: '/aboutme/memo/',
                        icon: 'emojione:memo',
                        activeMatch: '^/aboutme/memo/',
                    },
                ]
            },

        ],
    },
])
