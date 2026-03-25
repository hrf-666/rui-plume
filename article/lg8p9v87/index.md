---
url: /rui-plume/article/lg8p9v87/index.md
---
\[\[TOC]]

# mybatis查询返回List集合、map集合、List()集合

## 返回map类型

```java
1. xml中
    <select id="selectUser "  resultType="java.util.HashMap">  
    </select>
2.Dao接口中
    Map<String,Object> selectUser();
```

## 返回List类型

```java
1. xml中
   <select id="selectUser "  resultType="java.lang.String">  
   </select>
2.Dao接口中
    List<String> selectUser();
```

## 返回List()类型

(返回List\<Map\<String,Obiect>>类型)

```java
1. xml中
    <select id="selectUser"  resultType="java.util.HashMap">  
    </select>
2.Dao接口中
    List<Map<String,Object>> selectUser ();
```
