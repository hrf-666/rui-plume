import {defineNoteConfig} from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'back-end',
    // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
    // 如果 前缀不一致，则无法生成侧边栏。
    // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
    link: '/study-notes/back-end/redis/',
    // 手动配置侧边栏结构
    sidebar: [
        {
            // text: 'redis',
            prefix: 'redis', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
            collapsed: false,
            link: '/study-notes/back-end/redis/',
            items: [
                // 可以混用 string 和 SidebarItem
                {
                    text: '1.Redis入门概述',
                    prefix: '1.Redis入门概述',
                    items: 'auto'
                },
                {
                    text: '2.Redis安装配置',
                    prefix: '2.Redis安装配置',
                    items: "auto"
                },
                {
                    text: '3.redis10大数据类型',
                    prefix: '3.redis10大数据类型',
                    items: 'auto'
                },
                {
                    text: '4.Redis持久化', prefix: '4.Redis持久化',
                    items: 'auto'
                },
                {
                    text: '5.Redis事务', prefix: '5.Redis事务',
                    items: 'auto'
                },
                {
                    text: '6.Redis管道', prefix: '6.Redis管道',
                    items: 'auto'
                },
                {
                    text: '7.Redis发布订阅', prefix: '7.Redis发布订阅',
                    items: 'auto'
                },
                {
                    text: '8.Redis复制(replica)', prefix: '8.Redis复制(replica)',
                    items: 'auto'
                },
                {
                    text: '9.Redis哨兵(sentinel)', prefix: '9.Redis哨兵(sentinel)',
                    items: 'auto'
                },
                {
                    text: '10.Redis集群(cluster)', prefix: '10.Redis集群(cluster)',
                    items: 'auto'
                },
                {
                    text: '11.SpringBoot集成Redis', prefix: '11.SpringBoot集成Redis',
                    items: 'auto'
                },
            ],
        },
    ],
})