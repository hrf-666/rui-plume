---
title: VuePress 自定义导航页面
description: VuePress 自定义导航页面
date: 2021-06-20T00:00:00.000Z
tags:
  - VuePress
categories:
  - VuePress
createTime: 2025/08/25 23:47:03
permalink: /article/g6d16psb/
---

[[toc]]

## 1. 背景

VuePress 是一个基于 Vue 的静态网站生成器，它使用 Vue 的模板语法，支持使用 Vue 组件构建静态页面。

## 2. 代码实现

### 2.1. 导航页面

在 `docs/.vuepress/components` 目录下创建 `Navigation.vue` 文件，代码如下：

```vue

<template>
  <div class="navigate_container">
    <div class="nav_search_container">
      <div class="search_title">
        <a @click="search">搜索</a>
        <input class="search" type="text" v-model="searchText" @keydown.enter="search" placeholder="百度"/>
        <!--删除按钮-->
        <button class="clear-btn" @click="clearSearchText">x</button>
      </div>
    </div>

    <div class="nav_container">
      <div class="nav_item" v-for="nav in navList" :key="nav.title">
        <div class="nav_item_title">
          <b>{{ nav.title }}</b>
        </div>

        <div class="nav_item_main">
          <a
              class="nav_item_url"
              v-for="navItem in nav.arr"
              :key="navItem.id"
              :href="navItem.nav_url"
              target="_blank"
          >
            <div class="nav_item_text">
              <img :src='navItem.nav_img' alt="picture" onerror="this.src='/vuepress-blog/assets/img/logo.png'">
              <!--              <img :src='navItem.nav_img' alt="picture" :onerror="errorImg">-->
              <br/>
              {{ navItem.nav }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const {navList} = require("../api/navList");


export default {
  name: "Navigate",
  data() {
    return {
      navList: navList,
      searchText: '',
      currentSearchEngine: "https://www.baidu.com/s?wd=",
    };
  },
  methods: {
    search() {
      let url
      let content = this.searchText;
      if (content.match("^https://") || content.match("^http://") || content.match("^www.")) {
        url = content
      } else {
        url = this.currentSearchEngine + content;
      }
      this.searchText = '';
      window.open(url);
    },
    clearSearchText() {
      this.searchText = ''
    }
  }
};
</script>

<style lang="stylus" scoped>
body {
  //background-color #2c815b;

  .navigate_container {
    a {
      text-decoration: none;
    }

    /*
    搜索框
    */

    .nav_search_container {
      height: 60px;
      width: 50%;
      min-width: 330px;
      margin: 20px auto;
      background-color: rgba(193, 167, 167, 0.589);
      border-radius: 20px;

      .search_title {
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 330px;
        justify-content: space-around;
        //background-color #2c815b;

        a {
          display: flex;
          cursor: pointer;
          min-width: 40px;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          //height: 34px;
          margin: 0 15px;

          &:hover {
            color: #2c815b;
          }
        }

        .clear-btn {
          cursor: pointer;
          background-color: rgba(193, 167, 167, 0.589);
          margin-right: 10px;
          border-radius: 20px;
          height: 20px;
          width: 20px;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border: 1px solid #d9d9d9;

          &:hover {
            scale: 1.2;
          }
        }

        .search {
          width: 85%;
          min-width: 170px;
          padding: 10px;
          border: none;
          font-size: 18px;
          border-radius: 10px;
          text-decoration: none;
          background-color: rgba(233, 221, 221, 0);
        }

        .search:focus {
          outline: none;
        }
      }
    }

    /*
    导航区
    */

    .nav_container {
      display: flex;
      flex-wrap: wrap;
      //align-content: start;
      justify-content: center;
      align-content: flex-start;
      width: auto;

      .nav_item {
        text-align: center;
        margin: 20px 40px;
        border-radius: 5px;

        .nav_item_title {
          margin: 10px;
        }

        .nav_item_main {
          padding: 20px;
          width: 300px;
          border-radius: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
          box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

          .nav_item_url {
            text-decoration: none;
          }

          .nav_item_url:hover {
            -webkit-animation: nav_item_url 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
            animation: nav_item_url 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }

          @keyframes nav_item_url {
            0% {
              -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
            }

            100% {
              -webkit-transform: scale3d(1.1, 1.1, 1.1);
              transform: scale3d(1.1, 1.1, 1.1);
            }
          }

          /*
              CSS gap 属性是用来设置网格行与列之间的间隙（gutters），该属性是 row-gap 和 column-gap 的简写形式。
          */

          .nav_item_text img {
            //width: 96.662px;
            width: 66.662px;
            line-height: 90px;
            border-radius: 20px;
            // border: 1px solid #E7E7E7;
            box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .nav_item_main:hover {
          box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

}
</style>

```

### 2.2 导航列表

在`docs/.vuepress/api/navList.js`中定义导航列表，如下所示：

```js
const navList = [
    {
        // https://www.baidu.com/favicon.ico
        title: "浏览器 | 搜索",
        arr: [
            {
                nav: "百度",
                nav_url: "https://www.baidu.com",
                nav_img: "https://www.baidu.com/favicon.ico",
                id: "0000001",
            },
            {
                nav: "必应",
                nav_url: "https://cn.bing.com",
                nav_img: "https://cn.bing.com/favicon.ico",
                id: "0000002",
            },
            {
                nav: "QQ浏览器",
                nav_url: "https://browser.qq.com",
                nav_img: "https://browser.qq.com/favicon.ico",
                id: "0000003",
            },
            {
                nav: "稀土掘金",
                nav_url: "https://juejin.cn/",
                nav_img: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg",
                id: "0000004",
            },
            {
                nav: "知乎",
                nav_url: "https://www.zhihu.com/topic/19550228/top-answers",
                nav_img: "https://www.zhihu.com/",
                id: "0000009",
            },
            {
                nav: "小红书",
                nav_url: "https://www.xiaohongshu.com/explore",
                nav_img: "https://www.xiaohongshu.com/explore",
                id: "00000010",
            },


        ],
    },
    {
        // https://www.baidu.com/favicon.ico
        title: "后端 | 算法",
        arr: [
            {
                nav: "LeetCode",
                nav_url: "https://leetcode.cn/u/i3lissful-engelbartcwb/",
                nav_img: "https://leetcode.cn/favicon.ico",
                id: "000001",
            },
            {
                nav: "前端算法",
                nav_url: "https://www.yuque.com/morris-dlhjm/nnaevm",
                nav_img: "https://www.yuque.com/favicon.ico",
                id: "000002",
            },
            {
                nav: "代码随想录",
                nav_url: "https://programmercarl.com/",
                nav_img: "https://code-thinking-1253855093.file.myqcloud.com/pics/20210614201246512.png",
                id: "000003",
            },
            {
                nav: "LABULADONG 的算法网站",
                nav_url: "https://labuladong.gitee.io/algo/",
                nav_img: "https://labuladong.gitee.io/algo/logo.svg",
                id: "000004",
            },
            {
                nav: "Koa Wiki",
                nav_url: "https://github.com/koajs/koa/wiki",
                nav_img: "https://github.com/favicon.ico",
                id: "000005",
            },
            {
                nav: "Github Trend",
                nav_url: "https://github.com/trending",
                nav_img: "https://github.com/favicon.ico",
                id: "000006",
            },
            {
                nav: "Node.js Best Practices",
                nav_url: "https://github.com/goldbergyoni/nodebestpractices",
                nav_img: "https://github.com/favicon.ico",
                id: "000007",
            },
        ],
    },
    {
        title: "动漫 | 漫画 | 兴趣",
        arr: [
            {
                nav: "bilibili",
                nav_url: "https://www.bilibili.com/",
                nav_img: "https://www.bilibili.com/favicon.ico",
                id: "1",
            },
            {
                nav: "风车动漫",
                nav_url: "http://www.dmlaa.com",
                nav_img: "https://www.dmlaa.com/favicon.ico",
                id: "2",
            },
            {
                nav: "OmoFun",
                nav_url: "https://omofun.tv/",
                nav_img: "https://omofun.tv/favicon.ico",
                id: "3",
            },
            {
                nav: "Cupfox茶杯狐",
                nav_url: "https://cupfox.app/",
                nav_img: "https://cupfox.app/favicon.ico",
                id: "4",
            },
            {
                nav: "5dm.one",
                nav_url: "https://www.5dm.app/",
                nav_img: "https://www.5dm.app/favicon.ico",
                id: "5",
            },
            {
                nav: "ACFun",
                nav_url: "https://www.acfun.cn/",
                nav_img: "https://www.acfun.cn/favicon.ico",
                id: "6",
            },
            {
                nav: "搜漫",
                nav_url: "https://www.soman.com/",
                nav_img: "https://www.soman.com/favicon.ico",
                id: "7",
            },
        ],
    },
    {
        title: "前端 | 文档",
        arr: [
            {
                nav: "Vue文档",
                nav_url: "https://cn.vuejs.org/",
                nav_img: "https://cn.vuejs.org/favicon.ico",
                id: "01",
            },
            {
                nav: "React文档",
                nav_url: "https://zh-hans.reactjs.org/",
                nav_img: "https://zh-hans.reactjs.org/favicon.ico",
                id: "02",
            },
            {
                nav: "MDN",
                nav_url: "https://developer.mozilla.org/zh-CN/",
                nav_img: "https://developer.mozilla.org/favicon.ico",
                id: "03",
            },
            {
                nav: "印记中文",
                nav_url: "https://docschina.org/",
                nav_img: "https://docschina.org/_next/static/media/docschina-logo.026ff887.svg",
                id: "04",
            },
            {
                nav: "Koa Wiki",
                nav_url: "https://github.com/koajs/koa/wiki",
                nav_img: "https://github.com/favicon.ico",
                id: "05",
            },
            {
                nav: "Vue3 Wiki",
                nav_url: "https://vue3js.cn/",
                nav_img: "https://vue3js.cn/favicon.ico",
                id: "06",
            },
            {
                nav: "微信官方文档",
                nav_url: "https://developers.weixin.qq.com/doc/",
                nav_img: "https://developers.weixin.qq.com/favicon.ico",
                id: "07",
            },
            {
                nav: "Github中文排行榜",
                nav_url:
                    "https://github.com/GrowingGit/GitHub-Chinese-Top-Charts",
                nav_img: "https://github.com/favicon.ico",
                id: "08",
            },
            {
                nav: "前端学习路线",
                nav_url: "https://objtube.github.io/front-end-roadmap/#/",
                nav_img: "https://objtube.github.io/favicon.ico",
                id: "09",
            },
        ],
    },
    {
        title: "友链 | 储备",
        arr: [
            {
                nav: "彭世瑜的博客",
                nav_url: "https://mouday.github.io/coding-tree/#/doc/webpack",
                nav_img: "https://mouday.github.io/favicon.ico",
                id: "00000001",
            },
            {
                nav: "lautrans",
                nav_url: "https://www.lautrans.cn/blog/",
                nav_img: "https://www.lautrans.cn/logo.png",
                id: "00000002",
            },
            {
                nav: "沉默王二",
                nav_url: "https://javabetter.cn/sidebar/sanfene/nixi.html",
                nav_img: "https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/logo-02.png",
                id: "00000003",
            },
            {
                nav: "小傅哥 bugstack 虫洞栈",
                nav_url: "https://bugstack.cn",
                nav_img: "",
                id: "00000004",
            },
            {
                nav: "廖雪峰的官方网站",
                nav_url: "https://www.liaoxuefeng.com/wiki/1252599548343744",
                nav_img: "",
                id: "00000005",
            },

            {
                nav: "hexo搭建",
                nav_url: "https://hrf-666.github.io/",
                nav_img: "https://hrf-666.github.io/images/avatar.jpg",
                id: "000000099",
            },
            {
                nav: "vuepress+hope主题",
                nav_url: "https://huang-ruifang.gitee.io/ruiblogs/",
                nav_img: "",
                id: "0000000100",
            },
            {
                nav: "vuepress+自定义主题",
                nav_url: "https://huang-ruifang.gitee.io/hrf-blog",
                nav_img: "https://huang-ruifang.gitee.io/hrf-blog/avatar.jpg",
                id: "0000000101",
            },


        ],
    },
    {
        title: "社区 | 托管代码",
        arr: [
            {
                nav: "Github",
                nav_url: "https://github.com/0Shino0",
                nav_img: "https://github.com/favicon.ico",
                id: "001",
            },
            {
                nav: "Gitlab",
                nav_url: "https://gitlab.com/0Shino0",
                nav_img: "https://gitlab.com/favicon.ico",
                id: "002",
            },
            {
                nav: "Npm",
                nav_url: "https://www.npmjs.com/",
                nav_img: "https://www.npmjs.com/favicon.ico",
                id: "003",
            },
            {
                nav: "Gitee",
                nav_url: "https://gitee.com/huang-ruifang/vuepress-blog",
                nav_img: "https://gitee.com/favicon.ico",
                id: "004",
            },
            {
                nav: "Coding",
                nav_url: "https://coding.net/",
                nav_img: "https://coding.net/favicon.ico",
                id: "005",
            },
            {
                nav: "StackOverflow",
                nav_url: "https://stackoverflow.com/users/19151371/yyshino",
                nav_img: "https://stackoverflow.com/favicon.ico",
                id: "006",
            },
            {
                nav: "segmentFault",
                nav_url: "https://segmentfault.com/u/yyshino",
                nav_img: "https://segmentfault.com/favicon.ico",
                id: "007",
            },
            {
                nav: "CSDN",
                nav_url: "https://blog.csdn.net/qq_41095561?type=blog",
                nav_img: "https://blog.csdn.net/favicon.ico",
                id: "008",
            },
            {
                nav: "掘金社区",
                nav_url: "https://juejin.cn/user/638180976492824",
                nav_img: "https://juejin.cn/favicon.ico",
                id: "009",
            },
        ],
    },
    {
        title: "工具 | Tools",
        arr: [
            {
                nav: "Font Awesome",
                nav_url: "https://fontawesome.com/icons",
                nav_img: "https://fontawesome.com/favicon.ico",
                id: "0001",
            },
            {
                nav: "Vercel",
                nav_url: "https://vercel.com/",
                nav_img: "https://vercel.com/favicon.ico",
                id: "0002",
            },
            {
                nav: "BootCDN",
                nav_url: "https://www.bootcdn.cn/",
                nav_img: "https://www.bootcdn.cn/favicon.ico",
                id: "0003",
            },
            {
                nav: "Fast Mock",
                nav_url: "https://www.fastmock.site/#/",
                nav_img: "https://www.fastmock.site/favicon.ico",
                id: "0004",
            },
            {
                nav: "即时工具箱",
                nav_url: "https://www.67tool.com/",
                nav_img: "https://www.67tool.com/favicon.ico",
                id: "0005",
            },
            {
                nav: "学吧导航",
                nav_url: "https://www.xue8nav.com/",
                nav_img: "https://www.xue8nav.com/favicon.ico",
                id: "0006",
            },
            {
                nav: "animista动画库",
                nav_url: "https://animista.net/",
                nav_img: "https://animista.net/favicon.ico",
                id: "0007",
            },
            {
                nav: "ProcessOn思维导图",
                nav_url: "https://www.processon.com/",
                nav_img: "https://www.processon.com/favicon.ico",
                id: "0008",
            },
            {
                nav: "精准云工具",
                nav_url: "https://jingzhunyun.com/",
                nav_img: "https://jingzhunyun.com/favicon.ico",
                id: "0009",
            },
        ],
    },
    {
        title: "开源API | 白嫖",
        arr: [
            {
                nav: "保罗Api",
                nav_url: "https://api.paugram.com/help/netease",
                nav_img: "https://api.paugram.com/favicon.ico",
                id: "00001",
            },
            {
                nav: "DogApi",
                nav_url: "https://dog.ceo/dog-api/",
                nav_img: "https://dog.ceo/favicon.ico",
                id: "00002",
            },
            {
                nav: "CatApi",
                nav_url: "https://thecatapi.com/",
                nav_img: "https://thecatapi.com/favicon.ico",
                id: "00003",
            },
            {
                nav: "Random-data-api",
                nav_url: "https://random-data-api.com/",
                nav_img: "https://random-data-api.com/favicon.ico",
                id: "00004",
            },
            {
                nav: "Bilibili常用Api",
                nav_url: "https://blog.csdn.net/zz_lkw/article/details/106856609",
                nav_img: "https://blog.csdn.net/favicon.ico",
                id: "00005",
            },
            {
                nav: "eduwork学习Api",
                nav_url: "https://api.shop.eduwork.cn/index.html",
                nav_img: "https://api.shop.eduwork.cn/favicon.ico",
                id: "00006",
            },
            {
                nav: "网易云Api",
                nav_url:
                    "https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi",
                nav_img: "https://binaryify.github.io/favicon.ico",
                id: "00007",
            },
            {
                nav: "zhihu Api",
                nav_url: "https://github.com/TonnyL/Zhihu_Zhuanlan_APIs/wiki",
                nav_img: "https://github.com/favicon.ico",
                id: "00008",
            },
            {
                nav: "新冠疫情Api",
                nav_url: "https://www.cnblogs.com/Jerrycjc/p/15792807.html",
                nav_img: "https://www.cnblogs.com/favicon.ico",
                id: "00009",
            },
        ],
    },


]

exports.navList = navList;


```

### 2.3 使用方法

#### 2.3.1 方式一

直接在markdown添加如下代码即可：

```markdown
---
title: 导航
date: 2022-9-28 14:47:01
sidebar: false
---


<Navigate />

```

#### 2.3.2 方式二

添加layout: Navigate 即可；

```markdown
---
title: 导航
sidebar: false
layout: Navigate
pageClass: navigate-page-class
---
```

### 2.4 注意事项

#### 2.4.1 自定义宽度

> 采用方式一时：
> VuePress 默认的内容宽度为 740px，想要自定义宽度的话，只需要找到对应宽度的样式，进行覆写就可以实现。但会导致其他页面样式问题。
> 参考：[VuePress自定义宽度](./vuepress-custom-width.md)

#### 2.4.2 使用layout

> 采用方式二时：
> 使用layout: Navigate 即可。

## 3. 实现效果
- [自定义导航](https://huang-ruifang.gitee.io/vuepress-blog/navigation/)
