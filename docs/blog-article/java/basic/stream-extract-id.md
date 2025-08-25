---
title: Stream流提取对象集合的id组成新的集合
author: Rui
date: 2021-04-27T15:55:00.000Z
categories: Java
tags:
  - Java
createTime: 2025/08/25 23:47:02
permalink: /article/9ayqatfs/
---

## 问题描述

```java
public class StreamTest {

    private Integer id;

    private Integer age;

    private String name;


    public StreamTest() {

    }


    public StreamTest(Integer id, Integer age, String name) {

        this.id = id;

        this.age = age;

        this.name = name;

    }

    todo 省略
    getting、setting方法

}
```

### 测试

```java
public static void main(String[]args){

        List<StreamTest> list=new ArrayList<>();

        StreamTest object=new StreamTest(1,25,"尚佳鹏");

        StreamTest object1=new StreamTest(2,24,"标哥");

        StreamTest object2=new StreamTest(3,25,"李鹏");

        StreamTest object3=new StreamTest(4,18,"姚孟");

        list.add(object);

        list.add(object1);

        list.add(object2);

        list.add(object3);

        List<Integer> ids=list.stream().map(StreamTest::getId).collect(Collectors.toList());

        System.err.println("所有的id : "+ids);

        List<Integer> ages=list.stream().map(StreamTest::getAge).collect(Collectors.toList());

        System.out.println("未去重的年龄 : "+ages);

        List<Integer> agess=list.stream().map(StreamTest::getAge).distinct().collect(Collectors.toList());

        System.err.println("已去重的年龄 : "+agess);

        }
```

### 控制台输出结果

```java
所有的id:[1,2,3,4]

未去重的年龄:[25,24,25,18]

已去重的年龄:[25,24,18]       
```

- [原文链接](https://blog.csdn.net/qq_42227281/article/details/102737730)
