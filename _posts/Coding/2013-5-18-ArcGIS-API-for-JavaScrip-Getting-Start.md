---
layout: post
title: ArcGIS API for JavaScrip 入门
category : Coding
tags: ArcGIS-API Dojo
---


## 简介

### 综述

ArcGIS API for JavaScript 可以对 ArcGIS for Server 进行访问，并且将 ArcGIS for Server 提供的地图资源和其它资源（ArcGIS Online）嵌入到Web应用中。
（最新 3.5，但开放的是3.4的[下载](http://www.esri.com/apps/products/download/index.cfm?fuseaction=download.all#ArcGIS_API_for_JavaScript)，基于 Dojo）

<!-- break -->

![](/images/Coding/ArcGIS-API-for-JavaScrip-Getting-Start.png "大概的原理")

 
### 一些概念及资料

#### HTML与CSS

界面布局与设计。

入门：在线工具 - <http://www.codecademy.com/tracks/web>

#### JavaScript

入门：在线工具 - <http://www.codecademy.com/tracks/javascript> 和 <http://www.codecademy.com/tracks/jquery>

参考书：[《JavaScript权威指南》](http://book.douban.com/subject/10549733/)

#### 模块化的 JavaScript

详见：<http://justineo.github.io/singles/writing-modular-js/>
（用以理解 Dojo 的代码结构，以及建议效仿写自己的组件及应用）

#### 代码风格的一致性

既然用了 Dojo 框架，可以参考 Dojo 的代码风格。
详见：<http://dojotoolkit.org/reference-guide/1.9/developer/styleguide.html>
 
#### 浏览器兼容性

就框架本身，目测 IE 8及以下版本 其他都能很好支持（其他情况木有测试，不清楚是否有替代方案）。
因为用到了SVG （支持情况： <http://caniuse.com/#feat=svg>）

但是若是用了一些界面美化方面的东西，注意不同浏览器的支持效果。

#### REST（Representational State Transfer）

简介：<ftp://www.shlug.org/Slide/2011/2/REST.pdf>
（其实这个不用太在意，除非做数据接入优化）

#### Dojo 框架

详见：<http://dojotoolkit.org/>


## ArcGIS API for JavaScript

### 工具

#### 本地服务器

IIS、Apache 等随便放 ……

Apache建议使用 : <http://www.apachefriends.org/en/xampp.html>

#### IDE

编辑器还是算了，因为代码文件实在是太多了。当然 HTML 和 CSS 还是可以用编辑器来写的。
推荐 WebStorm：<http://www.jetbrains.com/webstorm/?

代码补全什么的，这货能自动识别，当 API 的文件在项目目录里的时候。
另，文件的编码格式务必正确，特别是在 Apache 服务器上，记得是 utf-8。


### 第一个应用

#### 添加地图

如开始的那张图，API 的文件及地图数据是可以放在不同服务器上的。
所以我们可以直接调用官方服务器上的接口和数据。

因此，开始，我们只需要做一件事：
新建一个 html 文件（在编辑器或者IDE中，以下演示均在 WebStorm 中）。

比如 `index.html`
 
并且输入 `html:5` 并按下 TAB 键。如你所见，一个完整的 html 结构出现。
 
这是因为 WebStorm 整合了 Emmet（前身 ZenCoding），
更多用法参见：<http://docs.emmet.io/>

接下来，在<head> 中引入 CSS 样式文件

	<link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/dojo/dijit/themes/claro/claro.css">
	<link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/css/esri.css">
 
并且添加自定义样式， 还有，body 标签内部，加入

	<div id="map"></div>

用以存放地图。

接下来，调用 API，并添加控制内容
	
	<script src="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/"></script>
 
注意，script 标签的位置。
用法见代码注释。

`index.html` 全部代码

	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="UTF-8">

	    <title>Simple Map</title>

	    <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/dojo/dijit/themes/claro/claro.css">
	    <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/css/esri.css">
	    
	    <style>
	      html, body, #map {
	        height:100%;
	        width:100%;
	        margin:0;
	        padding:0;
	      }
	      body {
	        background-color:#FFF;
	        overflow:hidden;
	        font-family:"Trebuchet MS";
	      }
	    </style>

	  </head>

	  <body>
	    <div id="map"></div>
			
		<script src="http://serverapi.arcgisonline.com/jsapi/arcgis/3.5/"></script>
	    <script>
	      // 类似 C# 中的 using Class
	      dojo.require("esri.map");

	      function init() {
	      	// 对应  <div id="map"></div> 的 id
	        var map = new esri.Map("map",{

	          // 预设 地图 
	          // arcgis_js_api/library/3.4/3.4/js/esri/config.js 
	          // 在该路径下查看更多
	          basemap:"topo",

	          // 经纬度
	          center:[-122.45,37.75], //long, lat

	          // 初始缩放等级
	          zoom:13,

	          // 左侧控制面板样式
	          sliderStyle:"small"
	        });
	      }

		  // 开始执行 init 函数
	      dojo.ready(init);
	    </script>

	  </body>
	</html> 


至此，第一地图可以在浏览器中看到了。

将 index.html，放到本地服务器中，或者甚至，直接用浏览器打开这个文件也可以。
  
#### 本地调试

下载 API，解压，将 arcgis_js_api 文件夹复制到项目文件夹中。
 
打开如下路径里的 init.js 文件 `/arcgis_js_api/library/3.4/3.4/init.js`

`Ctrl + F`（在WebStorm 中）查找 `[HOSTNAME_AND_PATH_TO_JSAPI]`

整个 baseUrl 修改为
 
	`baseUrl: HOSTNAME_AND_PATH_TO_JSAPI+"js/dojo/dojo"`	

并在开头添加全局变量，方便下次修改，因为换一个环境就得修改一次，还不如弄成全局的。 

	
	// 为了下次修改方便 这里是相对路径，注意结尾的 /
	var HOSTNAME_AND_PATH_TO_JSAPI ='arcgis_js_api/library/3.4/3.4/';

接着，修改 index.html 文件里的内容


	...

    <link rel="stylesheet" href="arcgis_js_api/library/3.4/3.4/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="arcgis_js_api/library/3.4/3.4/js/esri/css/esri.css">

	...

	<script src="arcgis_js_api/library/3.4/3.4/init.js"></script>

	...


刷新浏览器，很明显的，可以感到，地图载入速度的加快。
因为这些js文件 其实还是有点多的而且比较大，使用官方的CDN 加载会比较慢的。
如果要开发 Web App，这些API 文件还是有必要一起封装起来的。

在Chrome中按下 F12，Console，可以看到一些加载信息， 
由于第一个应用用到的功能不多，所以就额外载入两个文件（还得加上 init.js），
这就是 AMD 模块化的优势所在。

报错的地方是和官方地图的设置有关，可以无视。

#### 代码结构的优化
 
当代码非常多的时候，放在 html 文件里会显得非常凌乱，所以可以建立文件 `css/app.css`和 `js/app.js` 将自定义的 style 和 script 提出来，放在对应的文件里。

并在 index.html 中引入

 	<link rel="stylesheet" href="css/app.css">

 	<script src="js/app.js"></script>


#### JavaScript 的写法 – Dojo Style 

很多时候，地图往往只是项目的子模块。
所以，二次开发，在大量功能的时候，也是需要模块化的，既然已经用了 Dojo，就直接用吧。

Dojo 的文档很丰富，<http://dojotoolkit.org/documentation/>
参考这个：<http://dojotoolkit.org/documentation/tutorials/1.9/hello_dojo/>
 
加入一个 `js/appConfig.js` 作为前置文件，注意顺序

	<script src="js/appConfig.js"></script>
	<script src="arcgis_js_api/library/3.4/3.4/init.js"></script>
	<script src="js/app.js"></script>

appConfig.js 的内容为

	var dojoConfig = {
	    async: true,
	    // This code registers the correct location of the "demo"
	    // package so we can load Dojo from the CDN whilst still
	    // being able to load local modules
	    packages: [
	        {
	            // 定义自定义模块的名称、路径
	            name: "myApp",
	            location: location.pathname.replace(/\/[^/]*$/, '') + '/js'
	        }
	    ]
	};	
 
而将 app.js 修改为
 
	require([
	    "myApp/myMap/mainMap"
	], function (myMap) {
	    myMap.init();
	});


并且新建 `js/myMap/mainMap.js`

	define([
	    "esri/map"
	], function (esriMap) { // 这样 esriMap 同官方文档中的 esri.map		

	    return {
	        init: function () {
	            var map = new esriMap("map", {
	                basemap: "topo",
	                center: [-122.45, 37.75], //long, lat
	                zoom: 13,
	                sliderStyle: "small"
	            });
	        }
	    }
	});


 
这样，我们只需要关系每个类的依存关系，在需要的时候调用即可。
至于加载，dojo 框架会帮我们做好。

而且，看 mainMap.js 里，每个类的名字在使用的时候，可自定义，无需在关注全局变量里是什么，减少对全局变量的依赖，对性能优化有好处。


#### CSS 框架 及 HTML 模版

根据需要来吧，暂时略。

### 部署

可以自建服务器，放 API,也可以把 API 地址换为官方的。
而自己只需要找地方托管代码自己的代码即可。

如 <https://googledrive.com/host/0Bwdui5aYcEA9X2d3RVdEaVRYT0E/index.html>

代码结构

	+-- css/
	  	 +-- app.css
	+-- js/
		 +-- app.js
		 +-- appConfig.js
		 +-- myMap/
			 +-- mainMap.js
	+-- index.html