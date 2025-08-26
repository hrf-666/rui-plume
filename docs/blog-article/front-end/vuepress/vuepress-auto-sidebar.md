---
title: VuePress 自动侧边栏
tags:
  - vuepress
createTime: 2025/08/25 23:47:03
permalink: /article/s320nid7/
---
[[toc]]

## 1. 问题
> 由于VuePress的侧边栏是手动配置的，所以当文章数量增多时，维护成本很高。
> 因此，我参考一些文章配置一个自动侧边栏的插件，可以实现自动配置侧边栏。

## 2. 源码

```js
//侧边栏
// const autosidebar = require('vuepress-auto-sidebar-doumjun')
const fs = require('fs')
const path = require('path')

function getChildren(path, sort = true) {
    let root = []
    readDirSync(path, root)
    root = root.map(item => {
        if (item.split('/')[4]) {
            return item.split('/')[3] + '/' + item.split('/')[4]
        } else {
            return item.split('/')[3]
        }

    })
//排序
    if (sort) {
        let sortList = []
        let nosortList = []
        root.forEach(item => {
            if (Number(item.replace(".md", "").match(/[^-]*$/))) {
                sortList.push(item)
            } else {
                nosortList.push(item)
            }
        })
        root = sortList.sort(function (a, b) {
            return a.replace(".md", "").match(/[^-]*$/) - b.replace(".md", "").match(/[^-]*$/)
        }).concat(nosortList)
    }

    return root
}

function readDirSync(path, root) {
    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + ele, root)
        } else {
            if (checkFileType(ele)) {
                root.push(prefixPath(path, ele))
            }
        }
    })
}

function checkFileType(path) {
    return path.includes(".md")
}

function prefixPath(basePath, dirPath) {
    let index = basePath.indexOf("/")
// 去除一级目录地址
    basePath = basePath.slice(index, path.length)
// replace用于处理windows电脑的路径用\表示的问题
    return path.join(basePath, dirPath).replace(/\\/g, "/")
}

module.exports = {getChildren: getChildren}

```
## 3.使用

[//]: # (![位置]&#40;https://gitee.com/huang-ruifang/pic-go/raw/master/public/vuepress-blog/20240201154450.png&#41;)
![位置](https://huang-ruifang.gitee.io/pic-go/public/vuepress-blog/20240201154450.png)
```js
const {getChildren} = require("../utils/vuepress-sidebar-auto");
const blog_article_sidebarConfig = [
    {
        title: 'Java',   // 必要的
        path: '/blog-article/java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        initialOpenGroupIndex: -1, // 可选的, 默认值是 0
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: -1,    // 可选的, 默认值是 1
        children: getChildren('./docs','/blog-article/java/')
    },
    {
        title: '图床',   // 必要的
        path: '/blog-article/drawing-bed/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        children: getChildren('./docs','/blog-article/drawing-bed/')
    },
    {
        title: '其他',   // 必要的
        path: '/blog-article/other/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        children: getChildren('./docs','/blog-article/other/')
    },
]
exports.blog_article_sidebarConfig = blog_article_sidebarConfig;
```
## 4.效果

参考：

- [vuepress自动生成侧边栏](https://blog.csdn.net/Ma_lunan/article/details/125894931?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-125894931-blog-116207129.235%5Ev43%5Epc_blog_bottom_relevance_base8&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-125894931-blog-116207129.235%5Ev43%5Epc_blog_bottom_relevance_base8&utm_relevant_index=12)
- [VuePress,自动生成侧边栏,侧边栏自动化](https://juejin.cn/post/7045168740643635237)
