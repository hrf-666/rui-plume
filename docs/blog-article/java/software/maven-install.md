---
title: MAVEN的安装与配置教程
description: MAVEN的安装与配置教程
tags:
  - maven
createTime: 2025/08/25 23:47:02
permalink: /article/n89os08e/
---
[[toc]]
# MAVEN的安装与配置教程

前言：在MAVEN的安装和配置开始之前，先给大家介绍一下MAVEN。

## 1.MAVEN的认识

### 1.1什么是MAVEN?

Maven是一个项目构建及管理工具，开发团队几乎不用花多少时间就能够自动完成工程的基础构建配置， Maven 使用了一个标准的目录结构在不同开发工具中也能实现项目结构的统一。
Maven提供了清理，编译，测试，安装，打包，发布等命令可以让我们更加方便的去构建项目，同时采用pom.xml来导入依赖，可以自动下载jar,以及其所依赖jar，无需手动下载，拷贝jar到项目中，大大解放了程序员的劳动力。

### 1.2 MAVEN的优点

自动构建：清理，编译，测试，安装，打包，发布

jar包依赖管理：自动下载jar及其依赖的jar包

契约编程：在多种开发工具中也能实现项目结构的统一

### 1.3 MAVEN的功能

使用Maven可以为我们完成很多相应的功能：清理代码，自动编译，完成测试，生成站点报告，进行打包（jar，war），项目部署。

清理代码：相当于我们运行clear的效果

自动编译：可以较为方便的实现对项目的管理

打包：普通项目打jar包，web项目打成war包

项目部署：只需一行命令就能实现项目的部署

## 2. MAVEN安装

### 2.1 MAVEN下载

点击 [Maven官网](https://maven.apache.org/) 跳转至官网点击 `Download`

windows用户直接下载bin.zip

下载完成后将压缩包进行解压，将解压后得到的包存放到C盘外的磁盘中，得到如下：

在路径地址中复制apache-maven-3.3.9的路径地址：D:\apache-maven-3.3.9

### 2.2 MAVEN环境变量配置

注意：配置Maven环境变量之前必须确保jdk配置没有问题

点击win键-输入：查看高级系统设置- 点击：环境变量-下面的系统变量中配置

MAVEN_HOME： `D:\apache-maven-3.3.9`

```java
<code class="language-plaintext hljs">D:\apache-maven-3.3.9</code>
```

path： `%MAVEN_HOME%\bin`

```java
<code class="language-plaintext hljs">%MAVEN_HOME%\bin</code>
```

打开windows终端输入： `mvn -v`

```java
<code class="language-plaintext hljs">mvn-v    // 查看maven版本号</code>
```

若出现这几段字母代表Maven安装完成，接下来要进行Maven的其他配置

## 3. MAVEN的配置

### 3.1 理解MAVEN仓库

Maven会自动为我们添加相应的jar包，而这个jar包会先在本地仓库中查找，如果本地仓库中不到，则会去中央仓库（非本地）中进行下载。

### 3.2配置本地仓库

打开Windows终端输入

```java
<code class="language-plaintext hljs">mvn // 初始化maven</code>
```

Maven初始化后,会在C盘User文件夹-本地账号文件夹中自动创建.m2文件夹，包含一个空的名为Repository的文件夹，
在这里，我们不推荐将本地仓库存放在C盘， 所以我们需要将Repository文件夹删除，保留.m2即可。

在C盘之外的一个盘符中创建一个文件夹用来当作Maven的本地仓库，例如：`D:\devtools\Maven-Repository`

进入Maven安装目录，在config文件夹中找到一个settings.xml 配置文件，用记事本或者VSCode打开，在localRepository的注释标签下面添加

```java
<code class="language-plaintext hljs"><localRepository>D:/devtools/Maven-Repository</localRepository></code>
```

编辑完 ctrl + s 保存一下，先不用急着关闭该文件。

### 3.3 配置中央仓库

在配置中央仓库之前，我们需要知道Maven作为项目构建及管理工具是如何管理jar包的。

首先每当我们开发一个项目的时候，需要导入一些项目需要的依赖，也就是相关的jar包，只有导入这些依赖，项目才能正常，高效地运行起来。

当我们需要某一个jar包的时候，我们需要在项目的pom.xml文件中去配置所需要的依赖以进行导入到项目中，
则此时，Maven会先去本地仓库中查找是否存在相应的jar包，如果有，配置就能直接用，
如果Maven在本地仓库中没有找到，则Maven会去中央仓库中下载相应的jar包存放到本地仓库在进行导入到项目中。

配置中央仓库只需要将下面的一段代码直接复制粘贴到settings.xml文件的`<mirrors></mirrors>`中即可。

```java
<code class="language-plaintext hljs">
<mirror>
<id>nexus-aliyun</id>
<mirrorOf>central</mirrorOf>
<name>Nexus aliyun</name>
<url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
</code>
```

接下来是很关键的一个步骤：将settings.xml文件复制粘贴到C:\User\用户名\.m2\中。

## 4. MAVEN的使用

### 4.1 MAVEN项目结构

首先不得不重复提一下，MAVEN是一个项目构建及管理工具，开发团队几乎不用花多少时间就能够自动完成工程的基础构建配置，
MAVEN 使用了一个标准的目录结构在不同开发工具中也能实现项目结构的统一。

#### 4.1.1 MAVEN项目目录展示

```java
ProjectStructure

        -src

        --main

        ---java

        -test

        --java

        -pom.xml
```

#### 4.1.2 项目根目录pom.xml

```java
<code class="language-plaintext hljs"><project xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<!--maven模型版本-->
<modelVersion>4.0.0</modelVersion>
<!--项目的groupId(项目组织唯一标识符)，一般使用项目域名倒写-->
<groupId>com.zfl19</groupId>
<!--项目的 artifactId(项目的唯一的标识符,对应项目名),groupId+artifactId 组成完成的项目坐标->
<artifactId>Maven_Hello</artifactId>
<!--项目版本-->
<!--SNAPSHOT：快照，开发版本-->
<!--RELEASE：释放， 稳定版本-->
<version>0.0.1-SNAPSHOT</version>
<!--项目名-->
<name>Hello</name>

<dependencies>
<!--导入一个junit包-->
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.9</version>
<scope>test</scope>
</dependency>
</dependencies>
</project></code>
```

### 4.2 MAVEN命令

```js
mvn
compile : 编译命令，可以重新编译源代码为字节码文件，如果有jar包没下载完成，这个命令会先把需要的jar包下载完成后再编译

mvn
clean ： 清理命令，会把项目结构中的target文件夹中的字节码文件删除，可以组合 ： mvn
clean
compile

mvn
test ：测试命令会帮我们执行测试代码

mvn
package : 打包命令，可以把项目打包成一个jar，该命令会先执行clean，test，compile，如果不想执行测试命令可以跳过：mvn
package - Dmaven.test.skip = true

mvn
install : 项目打包后安装到本地仓库

mvn
source:jar : 生成项目的源码包

mvn
clean
site : 生成文档
```

### 4.3 MAVEN管理jar包

如果项目需要导入某个jar包，则需要再pom.xml中添加依赖的坐标

```java
<code class="language-plaintext hljs"><dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-orm</artifactId>
<version>3.0.5.RELEASE</version>
<scope>compile</scope>
</dependency></code>
```

切记，这里没必要死记硬背，只需要知道我们要在项目中导入某个依赖要填写什么东西，能理解这几句代码的意思，就行了，基本上要导入某个jar包都是ctrl + c和ctrl + v解决，
接下来会有一个方法方便我们使用MAVEN导入jar包。

### 4.4 如何搜索jar包

[点击进入MAVEN中央仓库](https://mvnrepository.com/)

如果点进来看到这个画面

点击的单选框就行了。

搜索框输入你想要的jar包，这里以junit为例子，点击第二个就行了

找到自己所需要的版本，点进去就可以看到导入maven项目的jar坐标

## 5. MAVEN配置jdk版本

在MAVEN安装目录的config文件夹打开settings.xml文件，在`<profiles></profiles>`加入即可。

```java
<code class="language-plaintext hljs"><profile>
<id>jdk-1.8</id>
<activation>
<activeByDefault>true</activeByDefault>
<jdk>1.8</jdk>
</activation>
<properties>
<maven.compiler.source>1.8</maven.compiler.source>
<maven.compiler.target>1.8</maven.compiler.target>
<maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
</properties>
</profile></code>
```

[原文链接](https://blog.csdn.net/m0_53692627/article/details/128822560)
