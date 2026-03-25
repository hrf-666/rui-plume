import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

import './theme/styles/custom.css'
import AllFriendContent from "./theme/components/AllFriendContent.vue";
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Custom from "./theme/components/Custom.vue";
import AIModels from "./theme/components/AIModels.vue";
import {Layout} from "vuepress-theme-plume/client";
import {h} from "vue";

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
    // 友情链接自定义组件
    app.component('RepoCard', RepoCard)
    app.component('Custom', Custom)
    app.component('AllFriendContent', AllFriendContent)
    app.component('AIModels', AIModels)
  },
  layouts: {
    Layout: h(Layout, null, {
      // 'aside-top': () => h(Qiniu),
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
})
