---
title: Redis16个常见使用场景
tags:
  - redis
  - 数据库
createTime: 2025/08/25 23:47:02
permalink: /article/50dsda7k/
---
[[toc]]

# Redis 16 个常见使用场景

## 1. 缓存

DB缓存，减轻DB服务器压力
提高系统响应
作为Key-Value形态的内存数据库，Redis 最先会被想到的应用场景便是作为数据缓存。而使用 Redis 缓存数据非常简单，只需要通过string类型将序列化后的对象存起来即可，不过也有一些需要注意的地方：

必须保证不同对象的 key 不会重复，并且使 key 尽量短，一般使用类名（表名）加主键拼接而成。

选择一个优秀的序列化方式也很重要，目的是提高序列化的效率和减少内存占用。

缓存内容与数据库的一致性，这里一般有两种做法：

只在数据库查询后将对象放入缓存，如果对象发生了修改或删除操作，直接清除对应缓存（或设为过期）。
在数据库新增和查询后将对象放入缓存，修改后更新缓存，删除后清除对应缓存（或设为过期）。

## 2. 数据共享分布式

String 类型，因为 Redis 是分布式的独立服务，可以在多个应用之间共享

例如：分布式Session

```java
<dependency>
<groupId>org.springframework.session</groupId>
<artifactId>spring-session-data-redis</artifactId>
</dependency>
```

## 3、分布式锁

如今都是分布式的环境下java自带的单体锁已经不适用的。在 Redis 2.6.12 版本开始，string的set命令增加了一些参数：

EX：设置键的过期时间（单位为秒）

PX：设置键的过期时间（单位为毫秒）

NX ：只在键不存在时，才对键进行设置操作。 SET key value NX 效果等同于 SETNX key value 。

XX ：只在键已经存在时，才对键进行设置操作。

由于这个操作是原子性的，可以简单地以此实现一个分布式的锁，例如：

```bash
set lock_key locked NX EX 1
```

如果这个操作返回false，说明 key
的添加不成功，也就是当前有人在占用这把锁。而如果返回true，则说明得了锁，便可以继续进行操作，并且在操作后通过del命令释放掉锁。并且即使程序因为某些原因并没有释放锁，由于设置了过期时间，该锁也会在 1
秒后自动释放，不会影响到其他程序的运行。

推荐使用 redisson 第三方库实现分布式锁。
参考 java分布式锁终极解决方案之 redisson

## 4、全局ID

int类型，incrby，利用原子性

```bash
incrby userid 1000
```

分库分表的场景，一次性拿一段

## 5、计数器

int类型，incr方法

例如：文章的阅读量、微博点赞数、允许一定的延迟，先写入Redis再定时同步到数据库

计数功能应该是最适合 Redis 的使用场景之一了，因为它高频率读写的特征可以完全发挥 Redis 作为内存数据库的高效。在 Redis 的数据结构中，string、hash和sorted
set都提供了incr方法用于原子性的自增操作，下面举例说明一下它们各自的使用场景：

如果应用需要显示每天的注册用户数，便可以使用string作为计数器，设定一个名为REGISTERED_COUNT_TODAY的 key，并在初始化时给它设置一个到凌晨 0 点的过期时间，每当用户注册成功后便使用incr命令使该 key 增长
1，同时当每天凌晨 0 点后，这个计数器都会因为 key 过期使值清零。
每条微博都有点赞数、评论数、转发数和浏览数四条属性，这时用hash进行计数会更好，将该计数器的 key 设为weibo:weibo_id，hash的 field
为like_number、comment_number、forward_number和view_number，在对应操作后通过hincrby使hash 中的 field 自增。
如果应用有一个发帖排行榜的功能，便选择sorted set吧，将集合的 key 设为POST_RANK。当用户发帖后，使用zincrby将该用户 id 的 score 增长 1。sorted
set会重新进行排序，用户所在排行榜的位置也就会得到实时的更新。

## 6、限流

int类型，incr方法

以访问者的ip和其他信息作为key，访问一次增加一次计数，超过次数则返回false

## 7、位统计

String类型的bitcount（1.6.6的bitmap数据结构介绍）

字符是以8位二进制存储的

```bash
set k1 a
setbit k1 6 1
setbit k1 7 0
get k1
/* 6 7 代表的a的二进制位的修改
a 对应的ASCII码是97，转换为二进制数据是01100001
b 对应的ASCII码是98，转换为二进制数据是01100010

因为bit非常节省空间（1 MB=8388608 bit），可以用来做大数据量的统计。
*/
```

参考 [使用Redis的bitmaps统计用户留存率、活跃用户](https://blog.csdn.net/agonie201218/article/details/107161106)

[用户日活月活怎么统计 - Redis HyperLogLog 详解](https://blog.csdn.net/agonie201218/article/details/108988577)

## 8. 时间轴（Timeline）

list作为双向链表，不光可以作为队列使用。如果将它用作栈便可以成为一个公用的时间轴。当用户发完微博后，都通过lpush将它存放在一个 key 为LATEST_WEIBO的list中，之后便可以通过lrange取出当前最新的微博。

## 9. 消息队列

Redis 中list的数据结构实现是双向链表，所以可以非常便捷的应用于消息队列（生产者 / 消费者模型）。消息的生产者只需要通过lpush将消息放入
list，消费者便可以通过rpop取出该消息，并且可以保证消息的有序性。如果需要实现带有优先级的消息队列也可以选择sorted set。而pub/sub功能也可以用作发布者 / 订阅者模型的消息。无论使用何种方式，由于 Redis
拥有持久化功能，也不需要担心由于服务器故障导致消息丢失的情况。

List提供了两个阻塞的弹出操作：blpop/brpop，可以设置超时时间

blpop：blpop key1 timeout 移除并获取列表的第一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
brpop：brpop key1 timeout 移除并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
上面的操作。其实就是java的阻塞队列。学习的东西越多。学习成本越低

队列：先进先除：rpush blpop，左头右尾，右边进入队列，左边出队列
栈：先进后出：rpush brpop

## 10、抽奖

利用set结构的无序性,通过 Spop（ Redis Spop 命令用于移除集合中的指定 key 的一个或多个随机元素，移除后会返回移除的元素。 ） 随机获得值

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SPOP myset
"one"
redis> SMEMBERS myset
1) "three"
2) "two"
   redis> SADD myset "four"
   (integer) 1
   redis> SADD myset "five"
   (integer) 1
   redis> SPOP myset 3
1) "five"
2) "four"
3) "two"
   redis> SMEMBERS myset
1) "three"
   redis>
```

## 11、点赞、签到、打卡

假如上面的微博ID是t1001，用户ID是u3001

用 like:t1001 来维护 t1001 这条微博的所有点赞用户

1. 点赞了这条微博：sadd like:t1001 u3001
2. 取消点赞：srem like:t1001 u3001
3. 是否点赞：sismember like:t1001 u3001
4. 点赞的所有用户：smembers like:t1001
5. 点赞数：scard like:t1001
   是不是比数据库简单多了。

## 12 商品标签

老规矩，用 tags:i5001 来维护商品所有的标签。

1. sadd tags:i5001 画面清晰细腻
2. sadd tags:i5001 真彩清晰显示屏
3. sadd tags:i5001 流程至极

## 13、好友关系、用户关注、推荐模型

这个场景最开始是是一篇介绍微博 Redis 应用的 PPT 中看到的，其中提到微博的 Redis 主要是用在在计数和好友关系两方面上，当时对好友关系方面的用法不太了解，后来看到《Redis 设计与实现》中介绍到作者最开始去使用 Redis
便是希望能通过set解决传统数据库无法快速计算集合中交集这个功能。后来联想到微博当前的业务场景，确实能够以这种方式实现，所以姑且猜测一下：

对于一个用户 A，将它的关注和粉丝的用户 id 都存放在两个 set 中：

1. A:follow：存放 A 所有关注的用户 id
2. A:follower：存放 A 所有粉丝的用户 id

那么通过sinter命令便可以根据A:follow和A:follower的交集得到与 A 互相关注的用户。当 A 进入另一个用户 B 的主页后，A:follow和B:follow的交集便是 A 和 B 的共同专注，A:follow和B:
follower的交集便是 A 关注的人也关注了 B。

举例
follow 关注 fans 粉丝

相互关注：

1. sadd 1:follow 2
2. sadd 2:fans 1
3. sadd 1:fans 2
4. sadd 2:follow 1
   我关注的人也关注了他(取交集)：

1. sinter 1:follow 2:fans
   可能认识的人：

1. 用户1可能认识的人(差集)：sdiff 2:follow 1:follow
2. 用户2可能认识的人：sdiff 1:follow 2:follow

## 14 .排行榜

使用sorted set(有序set)
和一个计算热度的算法便可以轻松打造一个热度排行榜，zrevrangebyscore可以得到以分数倒序排列的序列，zrank可以得到一个成员在该排行榜的位置（是分数正序排列时的位置，如果要获取倒序排列时的位置需要用zcard-zrank）。

id 为6001 的新闻点击数加1：

```bash
zincrby hotNews:20190926 1 n6001
```

获取今天点击最多的15条：

```bash
zrevrange hotNews:20190926 0 15 withscores
```

## 15 .倒排索引

倒排索引是构造搜索功能的最常见方式，在 Redis 中也可以通过set进行建立倒排索引，这里以简单的拼音 + 前缀搜索城市功能举例：

假设一个城市北京，通过拼音词库将北京转为beijing，再通过前缀分词将这两个词分为若干个前缀索引，有：北、北京、b、be…beijin和beijing。将这些索引分别作为set的 key（例如:index:北）并存储北京的
id，倒排索引便建立好了。接下来只需要在搜索时通过关键词取出对应的set并得到其中的 id 即可。

## 16 .显示最新的项目列表

比如说，我们的一个Web应用想要列出用户贴出的最新20条评论。在最新的评论边上我们有一个“显示全部”的链接，点击后就可以获得更多的评论。

每次新评论发表时，我们会将它的ID添加到一个Redis列表。可以限定列表的长度为5000

```bash
LPUSH latest.comments
```

在Redis中我们的最新ID使用了常驻缓存，这是一直更新的。但是我们做了限制不能超过5000个ID，因此我们的获取ID函数会一直询问Redis。只有在超出了这个范围的时候，才需要去访问数据库。

- [原文链接](https://blog.csdn.net/agonie201218/article/details/123640871)
