---
title: VuePress 加载网络图片
date: 2023-09-04T10:58:25.000Z
tags:
  - 笔记
  - VuePress
sidebar: true
createTime: 2025/08/25 23:47:03
permalink: /article/mfwj2hb4/
---
[[toc]]

# VuePress 加载网络图片

> 本篇记录了如何在VuePress中加载网络图片,
> 当我使用vuepress部署博客，但是遇到了些问题。
> 博客使用Typora + Picgo来完成的，参考[picGo+gitee设置图床](docs/blog-article/drawing-bed/picGo+gitee.md)的配置
> 所有图片都被存放到了gitee上，但是当我把写好的博客都部署到线上去，放到Picgo的图片都无法显示，又不报错。

## 解决办法

在 config.js 中添加 head 节点内容如下：

```js
head: [
    [
        "meta",
        {
            name: "referrer",
            content: "no-referrer"
        }
    ],
],
```
> 通过添加referrer meta标签，解决图片加载失败的问题
> 此时markdown中的网络图片就可以正常显示了。
