---
title: mybatis Mapper.xml类型判断
icon: pen-to-square
date: 2022-01-09T00:00:00.000Z
sidebar: true
tags:
  - mybatis
createTime: 2025/08/25 22:29:40
permalink: /article/us5bxdwb/
---

# mybatis Mapper.xml类型判断

## 1. 判断String是否为空

```xml

<if test='str!=null and str=="" '></if>
        或者
<if test="str!=null and str==''"></if>
```

## 2.判断Integer是否大于0

```xml

<if test="idParam !=null and idParam>0"></if>
```

## 3.判断Integer不等于0

Mybatis将Integer=0或者int=0的入参会默认为''（空串） ,selectKey查询出来的count==0 不受此限制
以下是两种解决方案

### 3.1 去掉空字符串判断

```xml

<if test="version != null"></if>
```

### 3.2 添加0值判断,增强判断添加

eq_isValid ==0

```xml

<if test="version != null and version != '' or version == 0"></if>
```

这两种方法都是可以的，在我看来是这样，如果这个version类型和我的情况一样，是包装类型而不是基本数据类型的话， 第一种就足够了，而且更贴近实际，

因为包装类型除了有值的情况就是null，不会为""空字符串的，String类型不在

```xml

<choose>
    <when test="count >0">
        select 1
    </when>
    <otherwise>
        select 2
    </otherwise>
</choose>
```

### 4 判断List是否不为空

```xml

<if test="listParam !=null and listParam.size >0"></if>
```

### 5 判断String是否以某特定字符(比如此处的"string")开头

```xml

<if test="stringParam.indexOf('string') != -1"></if>
```

### 6 判断字符串是否等于特定字符(比如此处的user)

```text
mybatis 映射文件中，if标签判断字符串相等,sex是string类型，原因是：mybatis是用OGNL表达式来解析的,在OGNL的表达式中，’1’会被解析成字符，java是强类型的，char 和 一个string
会导致不等，所以if标签中的sql不会被解析。
错解: <if test="sex=='Y' "> 此写法会报java.lang.NumberFormatException异常,单个字符会转成数值型
正解: <if test="sex=='Y'.toString()"> 或者<if test = 'sex== "Y"'> 单个的字符要写到双引号里面或者使用.toString()
才行！多个字符不受限制<when test="count =='TT' ">, 最好写成  ' count=="TT" '
正解:  <if test='indentify==0 '></if>或者 <if test='indentify=="0" '> </if>  ( 数值型字符串判断,mybatis会自动转换成数值类型)
```

 `<if test='indentify>0 '></if>`

给变量加 .toString() 是不行的，至少实际在所使用的myBatis版本（mybatis-3.2.5.jar,mybatis-spring-1.2.1.jar）是不可以，以后版本不知道，这应该是在经过
myBatis
时，影响到其转换操作，故出现错误

- [原文链接](https://blog.csdn.net/qq_31459039/article/details/79961116)
