import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
    type: 'doc',
    title: 'java',
    dir: 'study-notes/back-end/java',
    linkPrefix: '/study-notes/back-end/java/',
    sidebar: [
        '',
        // 可以混用 string 和 SidebarItem
        {text: 'JavaSE', link: 'javase.md'},
        {text: '集合', link: 'collection.md'},
        {text: '多线程', link: 'javathread.md'},
        {text: 'mybatis', link: 'mybatis.md'},
        {text: 'mysql', link: 'mysql'},
        {text: 'redis数据库', link: 'redis'},
        {text: '分布式', link: 'fenbushi.md'},
        {text: 'JVM', link: 'jvm'},
        {text: 'rocketMQ', link: 'rocketmq.md'},
        {text: 'spring', link: 'spring'},
        {text: '微服务', link: 'weifuwu'},
        {text: '网络', link: 'network.md'},
        {text: '操作系统', link: 'os'},
        {text: '2024年Java面试题', link: '2024JavaInterviewQuestions'},
        {text: '2025年Java面试场景题', link: '2025Java面试场景题'},
    ],

})
