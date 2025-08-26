import {defineNotesConfig} from 'vuepress-theme-plume'
import java from "./back-end/java";
import redis from "./back-end/redis";

export default defineNotesConfig({
    // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
    dir: '/study-notes/',
    link: '/',
    // 在这里添加 note 配置
    notes: [
        java,
        redis,
    ]
})