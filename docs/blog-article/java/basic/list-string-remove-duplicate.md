---
title: list集合（String字符串）去重的三种方式
tags:
  - java
  - list
  - string
date: 2020-04-20T16:00:00.000Z
categories: Java
description: list集合（String字符串）去重的三种方式
createTime: 2025/08/25 23:47:02
permalink: /article/lvzxx7f6/
---

[[toc]]

# list集合（String字符串）去重的三种方式

方式一：

```java
List<String> listTemp=new ArrayList<String>();
        for(int i=0;i<list.size();i++){
        if(!listTemp.contains(list.get(i))){
        listTemp.add(list.get(i));
        }
        } 
``` 

方式二：

```java
HashSet h=new HashSet(list);
        list.clear();
        list.addAll(h);
        return list;
```

方式三：

```java
list=list.stream()
        .distinct()
        .collect(Collectors.toList());
```

注意此处collect方法返回的是一个新的字符串

```java
<List<String>,?>List<String> java.util.stream.Stream.collect(Collector<? super String,?,List<String>>collector)
```

Distinct()只能对于简单的如List<int>等起作用，而对于List<T>不起作用。

方法四：
对于list的对象的集合

```java
List<PexContentBill> bills=CollectionUtils.isNotEmpty(ids)?commonInfoDao.listBillDataByIds(ids):new ArrayList<>();
        bills=bills.stream().filter(StreamAPIUtil.distinctByKey(PexContentBill::getBillId)).collect(Collectors.toList());
```

