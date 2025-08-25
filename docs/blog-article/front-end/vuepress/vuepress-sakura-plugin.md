---
title: VuePress 樱花插件的使用
description: vuepress-sakura-plugin
date: 2021-01-20T00:00:00.000Z
tags:
  - vuepress
createTime: 2025/08/25 23:47:03
permalink: /article/9s655a2h/
---

# VuePress 樱花插件的使用

项目地址：[http://www.zpzpup.com/blog](http://www.zpzpup.com/blog)

## 安装

```shell
npm install vuepress-plugin-sakura -D
or
yarn add vuepress-plugin-sakura -D
or
cnpm install vuepress-plugin-sakura -D
```

## 配置

```js
   // 只要把这个放进 config的plugins中就可以了
["sakura", {
    num: 20,  // 默认数量
    show: true, //  是否显示
    zIndex: -1,   // 层级
    img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: 'https://huang-ruifang.gitee.io/pic-go/public/vuepress-blog/sakura.png'     // 绝对路径
    }
}],
```

参考：

- [vuepress sakura漂亮的樱花插件](http://www.taodudu.cc/news/show-2944174.html?action=onClick)
