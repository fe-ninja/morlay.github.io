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

### 分支（branch）切换/创建/合并/删除

除了添加/修改文件外，Git 最常用的操作莫过于处理分支了。

比如创建与切换：

	# 切换到 分支 "develop"
	$ git checkout develop

	# 基于当前分支创建新分支 "myfeature"
	$ git checkout -b myfeature

	# 基于 master 分支创建新分支 "masterFix"
	$ git checkout -b masterFix master

又比如删除：

	# 删除分支 "myfeature"
	$ git branch -d myfeature

	
再说合并：

	# 合并前需要先切换目标分支，比如这里是 "develop"
	$ git checkout develop
	# 然后，将 分支 "myfeature" 合并到 "develop" 
	$ git merge --no-ff myfeature

这里需要注意 --no-ff 这个标记，它会使合并永远创建一个新的 `commit`，
即使该合并能以 `fast-forward` 的方式进行。

这么做可以避免丢失特性分支存在的历史信息，同时也能清晰的展现一组 `commit` 一起构成一个特性。

但是，对于目标分支来说，追溯历史记录的时候便不能取得特性分支的逐条 `commit`,各有利弊吧。

比较下面的图：

![](/images/Coding/Git-Merge-Fast-Forword.png "merge --no-ff 与 merge 的区别")

然后，当有一个完整可用版本时，还需要做为发布，其他步骤一致。

	$ git checkout master
	$ git merge –no-ff release-1.2
	# 同样的操作，切换分支 > 合并分支 并打上 tag 便于追溯
	$ git tag -a 1.2

还有，当我们创建一个分支，并在这分支上创建了许多 `commit`，其中很可能只有部分是可用的，这时便需要我们对分支做清理。

	# 同样，先切换到需要做清理的分支如，"myfeature" 
	$ git checkout myfeature
	# 与源分支 "master" 对比，
	$ git rebase --interactive master

这个时候会弹出一个记事本,列出当前分支与源分支分支后的所有 `commit`

	pick 1fc6c95 Patch A
	pick 6b2481b Patch B
	pick dd1475d something I want to split

根据提示修改对应的 `pick` 为 `squash` 或者 `fixup`，保存关闭，多余的 `commit` 便可以被合并到其他关键 `commit` 中了。

	pick 1fc6c95 Patch A
	squash 6b2481b Patch B
	fixup dd1475d something I want to split


当然，保险起见，在清理后的分支中创建新分支，用以和其他分支的操作，至于本身，如果不需要继续维护就删除吧。

	# 在清理过后的当前分支创建新分支 "cleaned_feature" 
	$ git checkout -b cleaned_feature

### 打补丁

自然的，打补丁的过程其实也是新建分支, 在做完一系列修改后，记得提交 `commit` 保存，与源分支进行对比。

	# 切换到补丁分支 "hotFix" 
	$ git checkout hotFix
	# 与源分支 "master" 对比，并将变化记录到 patch 文件中。
	$ git diff master > patch
	# 或者与源分支 "master" 的 assets 文件夹做对比，并将变化记录到 patch 文件中。
	$ git diff master ./assets > patch

	# 切换到分支 "master"。一般情况下，同一分支的修改，merge 合并回去即可，更多的时候是用于不同分支
	$ git checkout master


	# 一般情况下，为了保护 "master"，我们会建立一个专门处理新交来的 "patch" 的分支：
	$ git checkout -b PATCH
	# 应用补丁
	$ git apply patch

最后记得提交 `commit` 保存，并合并 "PATCH" 分支 到 "master" 分支 即可，然后删除 "PATCH" 分支。

对于 github 上，则需要 用到 `git format-patch` 和 `git am`，详见 <http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/ch06.html#_%E8%A1%A5%E4%B8%81_%E5%85%A8%E7%90%83%E8%B4%A7%E5%B8%81>

### 仓库引用 submodule

别人成熟的代码直接用，除了下载复制到自己的项目里外，还可以使用 `git submodule`, 该命令是针对与整个仓库的。

	# 比如我们需要基于 bootstrap 做二次开发，输入以下指令，即可拷贝整个库到 路径 "base/bootstrap" 中
	$ git submodule add https://github.com/twbs/bootstrap.git base/bootstrap

至于使用，像 bootstrap 这样基于 less 的，我们可以直接把文件 @import 使用，其他的，还有 Grunt 这样的神器自动拷贝到对应位置。

不过，引入的仓库不会自动更新，需要手动为之。

	$ git submodule update

对于 clone 下来的项目还需要 init 一下。

	$ git submodule init


### 未完待续

……

## 手册与工具

* [手册 - Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/)
* [手册 - git-scm （需翻墙）](http://git-scm.com/book/zh)
* [玩具 - Learn Git Branching](http://pcottle.github.io/learnGitBranching/)
* [CLI 环境 - Git for Windows](http://code.google.com/p/msysgit/downloads/list) 及 [图文步骤 for GitHub](http://help.github.com/win-set-up-git/)
* [GitHost 自建私有服务 - GitLab](http://gitlab.org/)
* [Git 分支管理模型 - GitFlow](https://github.com/nvie/gitflow)