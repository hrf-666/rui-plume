---
title: SSH连接GitHub并配置ssh key
tags:
  - ssh
createTime: 2025/08/25 23:47:02
permalink: /article/s4xd4blb/
---

# 解决ssh报错，.ssh/id_rsa: No such file or directory Permission denied (publickey）

[[toc]]

## SSH连接GitHub并配置ssh key

配置git的ssh提交，主要需要以下三步：

```text
1.设置Git的user name和email
2.生成ssh
3.配置git 的ssh key
```

## 一、设置Git的user name和email

```shell
//用户名写自己想写的，比如：mmzsit
$ git config --global user.name "mmzsit"
//邮箱写自己的，比如我的：mmzzsblog@163.com
$ git config --global user.email "mmzzsblog@163.com"
```

## 二、本地生成ssh key

新打开一个终端，输入：

```shell
1、检查ssh keys是否存在
$ ls -al ~/.ssh
```

如果目录下面没有id_rsa、id_rsa.pub则表示key不存在

### 2、生成ssh key

```shell
 $ ssh-keygen -t rsa -b 4096 -C "mmzsblog@163.com"


Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Administrator/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Administrator/.ssh/id_rsa.
Your public key has been saved in /c/Users/Administrator/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:RB6dXNLR7PFAF3Z4QcKHp10cumJ1iOfMymzpdSKWmPk mmzsblog@163.com
The key's randomart image is:
+---[RSA 4096]----+
| oo.++*+O*|
| o .+.oo@+=|
| o . *=*.|
| .    *.+..|
| S o = |
| B = |
| + X o . |
| = o o |
| E |
+----[SHA256]-----+
 ```

### 3、将ssh key添加到ssh-agent

先确认ssh-agent是可用的

```shell
$ eval $(ssh-agent -s)
Agent pid 10336
```

将ssh key添加到ssh-agent

```shell
$ ssh-add ~/.ssh/id_rsa
Identity added: /c/Users/Administrator/.ssh/id_rsa (mmzsblog@163.com)
```

## 三、配置git的ssh key

### 1、将ssh key配置到github
登录github–>点击头像–>选择"settings"–>选择左侧菜单"SSH and GPG keys"–>点击右上角的"NEW SSH key"–> 新建ssh 链接。

复制key内容:

```shell
$ clip < ~/.ssh/id_rsa.pub
```

TiTle 可随意填写(建议和第一步设置的用户名一致) ；
Key是第二步生成的 id_rsa.pub文件 的内容全部复制到此处(id_rsa.pub默认在C:\Users\Administrator.ssh目录下)。

### 2、测试ssh key的配置情况
```shell
$ ssh -t git@github.com
PTY allocation request failed on channel 0
```
到这里就配置好了!