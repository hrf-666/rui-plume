import {defineNoteConfig} from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'back-end',
    // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
    // 如果 前缀不一致，则无法生成侧边栏。
    // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
    link: '/study-notes/back-end/java/',
    // 手动配置侧边栏结构
    sidebar: [
        {
            // text: 'Java',
            prefix: 'java', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
            collapsed: false,
            items: [
                // 可以混用 string 和 SidebarItem
                {text: 'JavaSE', link: 'javase.md'},
                {text: '集合', link: 'collection'},
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
            ],
        },
    ],
})