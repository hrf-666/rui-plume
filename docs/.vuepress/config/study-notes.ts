// /**
//  * @see https://theme-plume.vuejs.press/guide/document/ 查看文档了解配置详情。
//  *
//  * Notes 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
//  *
//  * 请注意，你应该先在这里配置好 Notes，然后再启动 vuepress，主题会在启动 vuepress 时，
//  * 读取这里配置的 Notes，然后在与 Note 相关的 Markdown 文件中，自动生成 permalink。
//  *
//  * 如果你发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
//  * 是否是以对应的 note 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `note.link`
//  * 的前缀是否匹配来决定。
//  */
//
// /**
//  * 在受支持的 IDE 中会智能提示配置项。
//  *
//  * - `defineNoteConfig` 是用于定义单个 note 配置的帮助函数
//  * - `defineNotesConfig` 是用于定义 notes 集合的帮助函数
//  *
//  * 通过 `defineNoteConfig` 定义的 note 配置，应该填入 `defineNotesConfig` 的 notes 数组中
//  */
// import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'
//
// const studyNotes = defineNoteConfig({
//     dir: 'back-end',
//     // `dir` 所指向的目录中的所有 markdown 文件，其 permalink 需要以 `link` 配置作为前缀
//     // 如果 前缀不一致，则无法生成侧边栏。
//     // 所以请确保  markdown 文件的 permalink 都以 `link` 开头
//     link: '/study-notes/back-end/',
//     // 手动配置侧边栏结构
//     sidebar: [
//         {
//             // text: '指南',
//             prefix: '/java', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
//             items: [
//                 // 可以混用 string 和 SidebarItem
//                 {text: 'JavaSE', link: '/study-notes/back-end/java/javase.md'},
//                 {text: '集合', link: '/study-notes/back-end/java/collection'},
//                 {text: '多线程', link: '/study-notes/back-end/java/javathread.md'},
//                 {text: 'mybatis', link: '/study-notes/back-end/java/mybatis.md'},
//                 {text: 'mysql', link: '/study-notes/back-end/java/mysql'},
//                 {text: 'redis', link: '/study-notes/back-end/java/redis'},
//                 {text: '分布式', link: '/study-notes/back-end/java/fenbushi.md'},
//                 {text: 'JVM', link: '/study-notes/back-end/java/jvm'},
//                 {text: 'recketMQ', link: '/study-notes/back-end/java/rocketmq.md'},
//                 {text: 'spring', link: '/study-notes/back-end/java/spring'},
//                 {text: '微服务', link: '/study-notes/back-end/java/weifuwu'},
//                 {text: '网络', link: '/study-notes/back-end/java/network.md'},
//                 {text: '操作系统', link: '/study-notes/back-end/java/os'},
//                 {text: '2024年Java面试题', link: '/study-notes/back-end/java/2024JavaInterviewQuestions'},
//             ],
//         },
//         {
//             // text: '指南',
//             prefix: '/redis', // 使用 prefix 拼接，可以简写 下面的 items 中的 link 为相对路径
//             items: [
//                 // 可以混用 string 和 SidebarItem
//                 {text: '1.Redis入门概述', link: '/study-notes/back-end/redis/1.Redis入门概述.md'},
//                 {
//                     text: '2.Redis安装配置',
//                     prefix: '/study-notes/back-end/redis/2.Redis安装配置',
//                     items: [
//                         '1.Redis安装配置.md',
//                         '2.Redis7安装步骤.md',
//                         '3.Redis7卸载步骤.md'
//                     ]
//                 },
//                 {
//                     text: '3.redis10大数据类型', prefix: '/study-notes/back-end/redis/3.redis10大数据类型',
//                     items: [
//                         '1.10大数据类型.md',
//                         '2.redis键(key).md',
//                         '3.数据类型命令及落地运用.md',
//                         '4.Redis字符串(String).md',
//                         '5.Redis列表(List).md',
//                         '6.Redis哈希(Hash).md',
//                         '7.Redis集合(Set).md',
//                         '8.Redis有序集合Zset(sorted set).md',
//                         '9.Redis位图(bitmap).md',
//                         '10.Redis基数统计(HyperLogLog).md',
//                         '11.Redis地理空间(GEO).md',
//                         '12.Redis流(Stream).md',
//                         '13.Redis位域(bitfield).md'
//                     ]
//                 },
//                 {text: '4.Redis持久化', link: '/study-notes/back-end/redis/4.Redis持久化.md'},
//                 {text: '5.Redis事务', link: '/study-notes/back-end/redis/5.Redis事务.md'},
//                 {text: '6.Redis管道', link: '/study-notes/back-end/redis/6.Redis管道.md'},
//                 {text: '7.Redis发布订阅', link: '/study-notes/back-end/redis/7.Redis发布订阅.md'},
//                 {text: '8.Redis复制(replica)', link: '/study-notes/back-end/redis/8.Redis复制(replica).md'},
//                 {text: '9.Redis哨兵(sentinel)', link: '/study-notes/back-end/redis/9.Redis哨兵(sentinel).md'},
//                 {text: '10.Redis集群(cluster)', link: '/study-notes/back-end/redis/10.Redis集群(cluster).md'},
//                 {text: '11.SpringBoot集成Redis', link: '/study-notes/back-end/redis/11.SpringBoot集成Redis.md'},
//             ],
//         },
//     ],
//     // 根据文件结构自动生成侧边栏
//     // sidebar: 'auto',
// })
//
// /**
//  * 导出所有的 note
//  * 每一个 note 都应该填入到 `notes.notes` 数组中
//  * （DemoNote 为参考示例，如果不需要它，请删除）
//  */
// export default defineNotesConfig({
//     dir: 'study-notes',
//     link: '/',
//     notes: [studyNotes],
// })
