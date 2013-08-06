---
layout: post
title: About Git More
category : Coding
tags: Git Github 笔记
---


## 引


显然，之前写过的东西只能算作的是肤浅的理解，完全就不是 git 的工作流程,更没领会分布式版本控制系统。

所以干脆重写吧,虽然可能依然没领会到位。



<!-- break -->
## Why Git？

特点：

* 速度
* 简单的设计
* 对非线性开发模式的强力支持（允许上千个并行开发的分支）
* 完全分布式
* 有能力高效管理类似 Linux 内核一样的超大规模项目（速度和数据量）

基本原理：

* **直接快照，而非比较差异** : Git 和其他版本控制系统的主要差别在于，Git 只关心文件数据的整体是否发生变化，而大多数其他系统则
只关心文件内容的具体差异。
* **近乎所有操作都可本地执行**: 在 Git 中的绝大多数操作都只需要访问本地文件和资源，不用连网。如果要浏览项目的历史更新摘要，Git 不用跑到外面的服务器上去取数据回来，而直接从本地数
据库读取后展示给你看。所以任何时候你都可以马上翻阅，无需等待。如果想要看当前版本的文件和一个月前的版本之间有何差异，Git 会取出一个月前的快照和当前文件作一次差异运算，而不用请求远程服务器来做这件事，或是把老版本的文件拉到本地来作比较。
* **时刻保持数据完整性**: 在保存到 Git 之前，所有数据都要进行内容的校验和（checksum）计算，并将此结果作为数据的唯一标识
和索引。所有保存在 Git 数据库中的东西都是用此哈希值来作索引的，而不是靠文件名。
* **多数操作仅添加数据**: 常用的Git 操作大多仅仅是把数据添加到数据库。一旦提交快照之后就完全不用担心丢失数据，特别是在养成了定期推送至其他镜像仓库的习惯的话。


## 基本工作流程

对于任何一个文件，在Git 内都只有三种状态：已提交（committed），已修改（modified）和已暂存（staged）。

已提交表示该文件已经被安全地保存在本地数据库中了；

已修改表示修改了某个文件，但还没有提交保存；

已暂存表示把已修改的文件放在下次提交时要保存的清单中。


由此我们看到 Git 管理项目时，文件流转的三个工作区域：

Git 的本地数据目录，工作目录以及暂存区域。

每个项目都有一个 `.git` 目录，它是 Git 用来保存元数据和对象数据库的地方。

该目录非常重要，每次克隆镜像仓库的时候，实际拷贝的就是这个目录里面的数据。

从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作目录。

这些文件实际上都是从 `.git` 目录中的压缩对象数据库中提取出来的，接下来就可以在工作目录中对这些文件进行编辑。

基本的Git 工作流程如下所示：

1. 在工作目录中修改某些文件。
2. 对这些修改了的文件作快照，并保存到暂存区域。
3. 提交更新，将保存在暂存区域的文件快照转储到 `.git` 目录中。

(但在切换不同分支后，修改会重新快照并对比当前分支并暂存，所以一般切换分支前最好先提交更新。)

![](/images/Coding/Git-LocalOperation.jpg "工作目录 暂存区域和 git 目录")



## 分支管理模型

via
<http://nvie.com/posts/a-successful-git-branching-model/>

译文
<http://www.juvenxu.com/2010/11/28/a-successful-git-branching-model/>


![](/images/Coding/Git-Flow.jpg "分支管理模型")
via @天猪.
<http://www.zhihu.com/question/20070065/answer/16021641>



## Tips

### 

## 手册与工具

* [手册 - Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/)
* [手册 - git-scm (需翻墙)](http://git-scm.com/book/zh)
* [玩具 - Learn Git Branching](http://pcottle.github.io/learnGitBranching/)

* [CLI 环境 - Git for Windows](http://code.google.com/p/msysgit/downloads/list) 及 [图文步骤 for GitHub](http://help.github.com/win-set-up-git/)
* [GitHost 环境 - GitLab](http://gitlab.org/)
* [Git 分支管理模型 - GitFlow](https://github.com/nvie/gitflow)