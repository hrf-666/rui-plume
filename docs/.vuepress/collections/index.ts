import { defineCollections } from 'vuepress-theme-plume'
import java from "./study-notes/java";
import redis from "./study-notes/redis";
import read from "./read/read";

export default defineCollections([
    {
        // post 类型，这里用于实现 博客功能
        type: 'post',
        // 文档集合所在目录，相对于 `docs`
        dir: 'blog-article',
        // 文档标题，它将用于在页面的面包屑导航中显示
        title: '博客',
        // 文章列表页的链接，如果 `linkPrefix` 未定义，它也将作为 相关的文章的 permalink 的前缀
        link: '/blog-article/',
        linkPrefix: '/article/', // 相关文章的链接前缀
        postList: true, // 是否启用文章列表页
        tags: true, // 是否启用标签页
        archives: true, // 是否启用归档页
        categories: true, // 是否启用分类页
        postCover: 'right', // 文章封面位置
        pagination: 15, // 每页显示文章数量
    },
    java,
    redis,
    read,

])