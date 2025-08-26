import {defineNoteConfig} from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'read',
    // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
    // 如果 前缀不一致，则无法生成侧边栏。
    // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
    link: '/read/',
    // 手动配置侧边栏结构
    sidebar: [
        {
            text: '书籍',
            prefix: 'books', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
            collapsed: false,
            items: [
                // 可以混用 string 和 SidebarItem
                {text: '凡事要趁早', link: 'fanshiyaochenzao.md'},
            ],
        },
        {
            text: '经典',
            prefix: 'classic-sentences', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
            collapsed: false,
            items: [
                // 可以混用 string 和 SidebarItem
                {text: '甄嬛传', link: 'zhenhuanzhuan.md'},
                {text: '知否', link: 'zhifou.md'},
                {text: '如懿传', link: 'ruyizhuan.md'},
                {text: '三体', link: 'saniti.md'},
            ],
        },
    ],
})