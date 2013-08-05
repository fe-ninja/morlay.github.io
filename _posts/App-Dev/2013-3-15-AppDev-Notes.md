---
layout: post
title: 移动开发随记
category : App-Dev
tags: 移动开发 笔记
---

## 写在前面

开发 Android 应用，千万不要用 WebApp。

即使要用，请除去各种动画效果，包括 CSS3 ……

Chrome for Android 是一个坑。

<!-- break -->

## Safari MouseEvent (其实使用大多数 webkit 内核浏览器)

引用自<http://www.cnblogs.com/hokyhu/archive/2012/01/18/2325833.html>

* Safari只对可点击(clickable)的HTML元素才会产生MouseEvent。

可点击: 只要HTML元素响应 `mousemove`、`mousedown`、`mouseup`、`click` 四种 MouseEvent 中的一个就算是可点击。如果你有个网页菜单只响应 `mouseover`、`mouseout`，那可能不能工作，加个 `onclick="void(0)"` 就行了。但实际测试发现，只要响应任意一个 MouseEvent 就算可点击了，估计 safari 已修正此问题。
注意：下文所有关于“可点击”“不可点击”的描述都是针对是否响应MouseEvent而言，而不是指TouchEvent。

* 与W3C规范建议的不同，iPad是在手指离开屏幕以后才可能会产生 MouseEvent。

所以像手指单击屏幕这种操作的实际事件序列通常是：`touchstart -> touchend -> mousemove -> mousedown -> mouseup -> click`；

而不是我们期望的这样的时序：`touchstart -> mousedown -> touchend -> mouseup -> click`。

* 手指快速单击屏幕触发的 MouseEvent 并不是紧跟在 TouchEvent 之后的，有一个时延。

这是为了等待可能的双击操作。

iPad2 Safari的实测时延大约为 375ms。所以实际时序大约是这样的：`(手指按下)touchstart -> (手指快速提起) touchend-> (等待约375ms) mousemove-> mousedown->mouseup -> click`。

这对WebAPP的直接影响就是由于从用户操作完（手指提起）到 `onclick` 执行有 375ms 的延时，用户总觉得你的软件反应有点慢半拍。

但如果单击速度较慢，即手指按下到提起之间的时延超过大约 120ms，`touchend` 到其他 MouseEvent 之间就不再会有这个 375ms 的时延。因为系统认为这已经不满足手指快速双击操作的判定条件。

* 手指快速双击屏幕操作不会触发任何 MouseEvent。

我是说「任何」，就是说不光不会触发 `dblclick` 事件，连 `mousedown`、`mouseup`、`click` 等等所有 MouseEvent 都不会有。

本操作默认的事件流是：`touchstart -> touchend -> touchstart -> touchend`。

如果页面开发人员不做任何限制，浏览器默认行为是尝试缩放网页。

* 一次手指单击操作不会同时产生 `mouseover` 和(`mousedown`、`mouseup`、`click`)两组事件。

如果一个响应 `mouseover` 事件的元素从渲染完毕或者上一次收到 `mouseout` 之后尚未收到 `mouseover` 事件，则单击触发的事件流为：`touchstart -> touchend -> mouseover -> mousemove`；反之，单击触发的事件流为：`touchstart -> touchend -> mousemove -> mousedown -> mouseup -> click`。

不响应 mouseover 事件的元素只会收到上述后一种事件流，这避免绝大多数链接需要手指点击两次才能跳转页面。

* 一个HTML元素收到 `mouseover` 之后，只有在手指点击另一个可点击的HTML元素时，才会收到 `mouseout` 事件。

因为没有鼠标，所以不能像 PC 机上一样在鼠标移入移除元素区域时触发 `mouseover` 和 `mouseout` 事件，只能靠手指点击来切换 `mouseover`；又因为不可点击的元素不会触发任何 MouseEvent，所以只有在另一个HTML元素上触发 MouseEvent 时前一个可点击元素才会收到 `mouseout` 事件。

* 手指在屏幕上移动，不会触发大量的 `mousemove` 事件。

如第 2 点所说，只有在手指离开屏幕时，才可能产生 MouseEvent 消息，所以你只可能收到一次 `mousemove` 事件，包括本次操作触发的其他所有 MouseEvent，坐标都是手指提起位置的坐标。所以在 PC 浏览器上通过 mousemove 实现的逻辑，在iPad上需要通过 TouchEvent 来实现。

* 实测发现，似乎手指在屏幕上缓慢移动时，提起手指才会触发 MouseEvent；如果手指快速移动，则提起手指不会触发任何 MouseEvent 。

原因不明。

* 如果一个HTML元素响应TouchEvent，手指在该元素上按下并移动，即使手指移出该元素的区域，该元素仍然会收到touchmove事件，直到手指提起收到一个touchend结束。

也就是说一个HTML元素通常总能收到一个完整的 `touchstart -> (N个)touchmove -> touchend` 事件序列，除非系统给它发出一个 touchcancel 事件。这跟PC浏览器上MouseEvent特性也不太相同。

* 一旦在一次手指操作的事件序列 `touchstart -> (0-N个)touchmove -> touchend` 中的任何一个事件函数里调用了 `event.preventDefault()`，本次操作不再产生任何 MouseEvent。

所以不能期望在 `touchstart` 中调用 `preventDefault` 只阻止 `mousedown` 事件的产生。