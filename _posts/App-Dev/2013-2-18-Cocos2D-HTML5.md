---
layout: post
title: Cocos2D-HTML5 折腾笔记 （未完待续）
category : App-Dev
tags: Cocos2D HTML5
---

## 官方简介

### 框架

![Cocos2D-HTML5 游戏框架结构](/images/App-Dev/Cocos_Framework.jpg 'Cocos2D-HTML5游戏框架结构')

> 在引擎的框架设计中，渲染层是 Canvas 或 WebGL ，**如果浏览器支持 WebGL，自动优先选择 WebGL**，运行速度会快一点，要是不支持也没关系，Canvas 通过性能优化后，比起 WebGL 一点也不逊色。

<!-- break -->

![UI Dom 分层结构](/images/App-Dev/UI_Struc.jpg 'UI Dom分层结构')

> 区别于其他 Cocos2D 系列引擎设计，Cocos2D-HTML5 引擎框架引入了 Dom Menu 的设计，浏览器支持多语言的优势得到了传承，开发者再也不用为游戏的多语言发愁了，再也不需要辛苦地到处找字库、贴图了，因为在引擎内已准备好了。值得注意的是，Dom 实现的各项菜单还有各种动作和特效，甚至和 Canvas 可以实现互动，让开发者一点都感觉不到 Dom 的存在。

[Read More](http://www.programmer.com.cn/12198/)

### API 手册

<http://www.cocos2d-x.org/reference/html5-js/index.html>

## 一些疑问与另辟蹊径

### UI DOM

Cocos2D-HTML5 引入了 Dom Menu 的设计，但 Dom Menu 是在 Canvas 上进行绘制的，有
