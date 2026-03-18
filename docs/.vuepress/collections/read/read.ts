import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
    type: 'doc',
    title: '阅读',
    dir: 'read',
    sidebar: [
        {
            text: '阅读',
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
        {
            text: 'PDF',
            prefix: 'pdf', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
            collapsed: false,
            items: [
            ],
        },
    ]
})
