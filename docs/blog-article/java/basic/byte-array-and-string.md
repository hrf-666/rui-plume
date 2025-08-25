---
title: Java - byte[] 和 String互相转换
author: Rui
date: 2020-06-22 16:00:00 +0800
categories: Java
tags:
  - Java
description: Java - byte[] 和 String互相转换
createTime: 2025/08/25 23:47:02
permalink: /article/t5x6tykd/
---

[[toc]]
## 1. byte[] 和 String互相转换

通过用例学习Java中的byte数组和String互相转换，这种转换可能在很多情况需要，比如IO操作，生成加密hash码等等。

除非觉得必要，否则不要将它们互相转换，他们分别代表了不同的数据，专门服务于不同的目的，通常String代表文本字符串，byte数组针对二进制数据

### 1.1 通过String类将String转换成byte[]或者byte[]转换成String

用String.getBytes()方法将字符串转换为byte数组，通过String构造函数将byte数组转换成String

注意：这种方式使用平台默认字符集

```java
package com.bill.example;

public class StringByteArrayExamples {
    public static void main(String[] args) {
//Original String
        String string = "hello world";

        //Convert to byte[]
        byte[] bytes = string.getBytes();

        //Convert back to String
        String s = new String(bytes);

        //Check converted string against original String
        System.out.println("Decoded String : " + s);
    }
}
```

输出：

```java
hello world
```

### 1.2 通过Base64 将String转换成byte[]或者byte[]转换成String[Java 8]

可能你已经了解 Base64 是一种将二进制数据编码的方式，正如UTF-8和UTF-16是将文本数据编码的方式一样，所以如果你需要将二进制数据编码为文本数据，那么Base64可以实现这样的需求

从Java 8 开始可以使用Base64这个类

```java
import java.util.Base64;

public class StringByteArrayExamples {
    public static void main(String[] args) {
//Original byte[]
        byte[] bytes = "hello world".getBytes();

        //Base64 Encoded
        String encoded = Base64.getEncoder().encodeToString(bytes);

        //Base64 Decoded
        byte[] decoded = Base64.getDecoder().decode(encoded);

        //Verify original content
        System.out.println(new String(decoded));
    }

}
```

输出:

```java
hello world
```

## 2. 总结

在byte[]和String互相转换的时候你应该注意输入数据的类型

> 当使用String类的时候，将String作为输入类型
> 当使用Base64类的时候，使用byte数组作为输入类型


## 3. 参考链接
- [Java - byte[] and String 互相转换](https://www.cnblogs.com/keeplearnning/p/7003415.html)
