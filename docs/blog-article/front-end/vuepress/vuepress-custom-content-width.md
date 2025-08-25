---
layout: page
title: VuePress 自定义修改内容宽度
permalink: /vuepress-custom-content-width/
date: 2019-06-20T16:50:00.000Z
description: VuePress 自定义修改内容宽度
keywords: VuePress, 自定义修改内容宽度
comments: true
toc: true
menu: VuePress
content_width: 1000px
createTime: 2025/08/25 23:47:03
---
[[toc]]
##  1.背景
VuePress 是一个基于 Vue 的静态网站生成器，它使用 Vue 的渲染引擎来生成静态 HTML 文件。
VuePress 默认的内容宽度为 740px，想要自定义宽度的话，只需要找到对应宽度的样式，进行覆写就可以实现。
##  2.问题
##  3.解决方法
在 .vuepress 文件夹下新建 styles 文件夹，然后在 styles 文件夹下新增 palette.styl 文件，文件内容如下：
```css
.page .theme-default-content:not(.custom) {
    max-width: none;
}
```
添加样式后必须重启服务才能生效。
