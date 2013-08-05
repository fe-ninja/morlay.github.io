---
layout: post
title: Sublime Text 2 备忘
category : App-Use
tags: Sublime Text ZenCoding 笔记
---

## 下载地址

* 开发版本 <http://www.sublimetext.com/dev>
* 稳定版本 <http://www.sublimetext.com/2>
* 插件开发文档 <http://www.sublimetext.com/docs/2/api_reference.html>

<!-- break -->

## 安装包控制（Package Control）

方便插件的安装.「"Ctrl+\`"」调出控制台，或者「菜单"View"—"Show Console"」,输入以下代码，完成后，重启ST2即可。
	
	import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())

## 常用插件

「菜单"Preferences"—"Package Control"」在弹出的选择窗口中选择「"Package Control:Install"」,搜索并安装：

* BracketHighlighter （括弧高亮显示）
* Clipboard History（历史剪贴板）	
* ColorPicker （取色器）
* HTML5 （HTML5支持）
* jQuery （jQuery支持）
* JsFormat（JS代码格式化）
* Markdown Preview （Markdown预览）
* SCSS（SCSS文件支持）
* SideBarEnhancements（侧边栏加强）
* SideBarGit （Git管理）
* Tag （标签整理）
* Theme - Soda（暗色主题）
* ZenCoding （HTML和CSS快速编码）--> 已经升级为 emmet

## 自带常用功能极其快捷键

### 文件

* 新建  文件「"ctrl+n" 」新窗口 「"ctrl+shift+n"」打开文件「"ctrl+o"」
* 保存 「"ctrl+s" 」另存为 「"ctrl+shift+s"」
* 关闭 当前文件「"ctrl+w" 」当前窗口 「"ctrl+shift+w"」
* 左右两列并排 「"alt+shift+2"」，三列 「"alt+shift+3"」

### 常用编辑

* 撤销/恢复 「"ctrl+z"」「"ctrl+y"」 
* 查找/替换 「"ctrl+f"」「"ctrl+h"」
* 定位行号 「"ctrl+g"」
* 快速检索 「"ctrl+r"」（js 文件中为 函数，md 文件中为各标题 ……）
* 选择相同  选中内容后「"ctrl+d"」
* 复制选中或当行  选中内容或者设置焦点在某行后「"ctrl++shift+d"」

### 缩进

* 将缩进"空格"转换为"Tab" 「"ctrl+alt+i" 」（自定义）

默认无快捷键，需要自己添加,在「菜单"Preference"—"Key Bindings-User"」插入以下代码，增加快捷键「"ctrl+alt+i" 」，个人习惯，不爽空格缩进。

	{ "keys": ["ctrl+alt+i"],"command": "unexpand_tabs", "args": {"set_translate_tabs": true} }

* 增减缩进「"ctrl+]"」和「"ctrl+["」

### 行操作

* 上下移动当前行 「"ctrl+shift+up"」和「"ctrl+shft+down"」
* 多行选择 「"shift+up"」和「"shft+down"」, 或者「鼠标中键」
* 复制当行或选中内容 「"ctrl+shift+d"」

## 插件功能快捷键

* 「"ctrl+shift+p"」这个超级命令，懒得添加快捷键，可以调出这个，搜索插件功能并直接使用。

### Markdown Preview （Markdown预览）

* 预览「"atl+m"」

需要自行添加快捷键

	{ "keys": ["alt+m"], "command": "markdown_preview", "args": {"target": "browser"} },

### JsFormat

「"ctrl+shift+p"」调出控制台 按「"f"」


### emmet （ZenCoding）

#### Sublime Text 2 下的默认快捷键

* 「"ctrl+alt+enter" 」**ZenCoding控制台**

* 「"F1"」**CSS属性帮助**
* 「"tab"」**展开缩写（Expand Abbreviation）**
* 「"alt+shift+w"」**嵌套代码（Wrap with Abbreviation）**(与覆盖Tags的快捷键，可能因为功能更强大点)

* 「"ctrl+j"」**合并行（Merge Lines）**（和ST2本身有区别，这个合并，ST2的是把下一行加到行尾）

* 「"shift+ctrl+j"」**空标签转化（Split/Join Tag）**(转空少了一个"/",并且与自带快捷键有冲突。)

* 「"ctrl+shift+t"」**选中焦点元素内部内容**
* 「"ctrl+shift+n"」**递增选中内容**

* 「"ctrl+shift+u"」**移除元素标签**

* 「"ctrl+,"」**转到上一个编辑点（Go to Next）**
* 「"ctrl+period"」 **下一个编辑点(Previous Edit Point）**（period为句号）
* 「"ctrl+shift+,"」**上一个编辑点，并全文匹配**<p></p>
* 「"ctrl+shift+period"」**下一个编辑点，并全文匹配**
* 「"ctrl+alt+m"」**标签开头结尾互跳转**

* 「"ctrl+alt+/"」**添加、解除注释**（同ST2自带的「"ctrl+/"」）

* 「"ctrl+shift+a"」**选中父容器，便于更改（感觉用处不大）**

但部分快捷键很常用,在「菜单"Preference"—"Key Bindings-User"」插入以下代码，将快捷键「"ctrl+alt+enter" 」修改为「"ctrl+e"」

	{"keys": ["ctrl+e"],"args": {},"command": "zen_as_you_type","context": [{"operand": "source.css - source.css.embedded, text.xml, text.html -source -meta.tag, meta.scope.between-tag-pair.html -source","operator": "equal","match_all": true,"key": "selector"}]},
	{"keys": ["ctrl+e"],"command": "wrap_zen_as_you_type","context": [{"operand": "text.html meta.tag - string - meta.scope.between-tag-pair.html","operator": "equal","match_all": true,"key": "selector"}]},
	{"keys": ["ctrl+e"],"command": "wrap_zen_as_you_type","context": [{"operand" : false,"key" : "selection_empty","match_all": true,"operator" : "equal"},{"key" : "num_selections","operand" : 1,"operator" : "equal"}]}

#### 用法

##### Zen Coding 的缩写规则（E代表要展开的元素名，N代表数字）

大致规则同标准，但是在一些细节是不同的，特别是直接展开和在控制台中输出形式有别。

例如：

	div#page>div.logo+ul#navigation>li*5>a

「展开」后
	
	<div id="page">
        <div class="logo"></div>
        <ul id="navigation">
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
        </ul>
	</div>

又如：

	html:4t (HTML 4.01 Transitional)
	html:4s (HTML 4.01)
	html:xt (XHTML 1.0)
	html:xs (XHTML 1.0 Strict)
	html:xxs (XHTML 1.1)
	html:5 (HTML5)

可直接展开为对应结构：比如`html:5`:
	
	<!DOCTYPE HTML>
	<html lang="en-US">
	<head>
	    <meta charset="UTF-8">
	    <title></title>
	</head>
	<body>
	    
	</body>
	</html>

CSS中同理。缩写可参考 `ZenCoding小抄` （Google 之）或者 在 css 相关文件中 按 「"F1"」。