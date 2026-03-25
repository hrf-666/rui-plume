---
url: /rui-plume/article/4x21hafm/index.md
description: 修复全局搜索问题
---
\[\[toc]]

## 问题描述

@vuepress/search 查询报错
webpack-internal:///./node\_modules/vue/dist/vue.runtime.esm.js:620 \[Vue warn]: Error in render: "TypeError:
page.frontmatter.tags.join is not a function

```js
['@vuepress/search', {
    searchMaxSuggestions: 10
}],
```

## 原因分析

### 1.\[参考官网文档]\(https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%86%85%E7%BD%AE%E6%90%9C%E7%B4%A2]

```markdown
---
tags:
  - 配置
  - 主题
  - 索引
---
```

### 2.tags 为数组时，报错

```markdown
---
title: charts
categories: 随笔  
tags: [charts]
---
```

## 解决方案

### 1.删除主题变换按钮

* 目录`docs/.vuepress/theme/components/Mode/index.vue`
  注释`class="color-button"`的元素

### 2.修复查询问题

修改源码，大概在第7行。
目录`node_modules/@vuepress/plugin-search/match-query.js`
将

```js
if (get(page, 'frontmatter.tags')) {
    domain += ` ${page.frontmatter.tags.join(' ')}`
}
```

改变为

```js
    if (get(page, 'frontmatter.tags')) {
    if (Array.isArray(page.frontmatter.tags)) {
        domain += ` ${page.frontmatter.tags.join(' ')}`
    }
}
```

参考：

* [修复全局搜索问题](https://github.com/zhoufanglu/vuepressBlogBackup/blob/master/%E6%BA%90%E7%A0%81%E5%A4%87%E4%BB%BD/README.md)
* [问题描述@vuepress/search 查询报错 #2772](https://github.com/vuejs/vuepress/issues/2772)
