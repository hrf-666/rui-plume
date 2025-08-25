---
title: VuePress 兼容PWA
date: 2020-04-24T00:00:00.000Z
tags:
  - Vue
  - Vuepress
summary: Vuepress 1.0.0-alpha.2 版本已经支持 PWA 了
author: Rui
createTime: 2025/08/25 23:47:02
permalink: /article/sdt6ghm7/
---
[[toc]]
## 1. PWA
PWA，英文全称：Progressive Web Apps， 中文翻译：渐进式 Web 应用。
PWA 是一种新的应用开发方式，它允许你使用 Web 技术构建应用，然后通过一些配置，将其变成一个具有原生应用能力的应用。

引用 MDN 的介绍：
> PWA 指的是使用指定技术和标准模式来开发的 Web 应用，这同时赋予它们 Web 应用和原生应用的特性。
例如一方面，Web 应用更加易于发现：相比于安装应用，访问一个网站显然更加容易和迅速。你还可以通过链接来分享 Web 应用。
另一方面，原生应用与操作系统可以更加完美的整合，也因此为用户提供了无缝的用户体验。你可以通过安装应用使得它在离线的状态下也可以运行；相较于使用浏览器访问，用户也更喜欢通过点击主页上的图标来访问它们喜爱的应用。
PWA 赋予了我们创建同时拥有以上两种优势的应用的能力。


## 2. 体验

简单的来说，我们兼容 PWA，就是想要实现这样的桌面图标的功能，当然了， PWA 其他还有离线缓存、推送通知等功能，这里就不多说了。
详细请看文档：[2022 年了，还不了解 PWA ？ 教你 VuePress 博客如何快速兼容 PWA](https://juejin.cn/post/7065653370903592996)

## 3. 开启 PWA
开启 PWA，需要注意三个点：

1. 提供一个 manifest.json 文件，描述应用的名称、图标等信息
2. 开启 Service Worker，这个交给现有的 PWA 插件来实现
3. 开启 HTTPS

## 4. 实现代码
### 4.1 安装
[插件地址](https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E5%AE%89%E8%A3%85)
```shell
yarn add -D @vuepress/plugin-pwa
# OR npm install -D @vuepress/plugin-pwa
```
### 4.2 配置修改config.js
```js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
     }
    ]
  ]
}
```
### 4.3 配置manifest.json
接下来我们添加所需要的资源，在 .vuepress目录下建立 public文件夹，然后添加所需要的文件如 manifest.json文件：
```json
{
    "name": "TypeScript中文文档",
    "short_name": "TypeScriptDocs",
    "display": "standalone",
    "background_color": "#fff",
    "start_url": "/learn-typescript-test/",
    "scope": "/learn-typescript-test/",
    "description": "TypeScript 中文文档 进阶教程",
    "icons": [{
      "src": "logo52.png",
      "sizes": "52x52",
      "type": "image/png"
    },{
       "src": "logo288.png",
       "sizes": "288x288",
       "type": "image/png"
    }]
  }
```
要注意其中的 start_url和scope，如果你使用的是 GitHub 或者 Gitee 仓库的 Pages 服务，并且地址上带了仓库名，你需要将这里的learn-typescript-test替换为你的仓库名，如果是直接的域名，start_url 写成  \，scope写成 .或者直接不写。

### 4.4 测试

## 5. 常见问题

参考:
- [2022 年了，还不了解 PWA ？ 教你 VuePress 博客如何快速兼容 PWA](https://juejin.cn/post/7065653370903592996)
- [VuePress 博客如何开启本地 HTTPS 访问](https://juejin.cn/post/7065248985719504933)
