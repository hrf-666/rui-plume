---
url: /rui-plume/article/8lrnm0ya/index.md
---
# Integer类型在mapper.xml中正确判断

## 1、问题

Integer类型传值为0时，在Mapper.xml中被 条件过滤

## 2、正确写法

Integer类型只做“null”的判断，不做空的判断

```xml

<if test="status !=null>
and status =  #{status,jdbcType=INTEGER}
</if>
```

* [原文链接](https://blog.csdn.net/lovesman/article/details/115403030)
