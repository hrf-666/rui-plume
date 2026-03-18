import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
    type: 'doc',
    title: 'redis',
    dir: 'study-notes/back-end/redis',
    linkPrefix: '/study-notes/back-end/redis/',
    sidebar: [
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
    autoFrontmatter: {
        title: true, // 自动生成标题
        createTime: true, // 自动生成创建时间
        permalink: 'filepath', // 自动生成永久链接
    }
})