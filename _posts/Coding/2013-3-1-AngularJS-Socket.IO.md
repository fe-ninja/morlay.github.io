---
layout: post
title: AngularJS Socket.IO 另一种使用方式
category : Coding
tags: AngularJS Socket.IO 笔记
---

## 起始

来自 HTML5rocks 的文章 [WRITING AN ANGULARJS APP WITH SOCKET.IO](http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/) 其实已经把这个使用方法写的很清楚。

比如 Demo 的即时通讯（[源码](https://github.com/btford/angular-socket-io-im)）
及 其基于的 Seed （[源码](https://github.com/btford/angular-socket-io-seed)）

但是这样把所有东西都放在 NodeJS 上，特别是 html 还得用 jade 的方式的来编写，并不太适合我们这样的新手使用。

于是，基于核心代码，仅仅将 Socket.IO 的部分放在 NodeJS 上，
而其他的，用文件服务器托管即可，
或许这样方便移动端打包什么使用吧（还没验证 XD）。

<!-- break -->

## NodeJS + Socket.IO 本地服务器的搭建使用

* 从 [NodeJS](http://nodejs.org/) 官网下载并安装。
* Window 下要用程序自己的 Command （开始 - 程序 - Node.js - Node.js Command Prompt.exe）

NodeJS 服务器其实就能使用了，然后 Socket.IO

* 指令定位到任意一个文件夹，xxPath
* 在该 xxPath 下键入 `npm install socket.io express` 安装需要的组件
* 编辑器 在该 xxPath 创建文件 app.js ，可以把代码精简为如下：

app.js

	var express = require('express');
	var app = module.exports = express();

	var server = require('http').createServer(app);

	// Hook Socket.io into Express
	var io = require('socket.io').listen(server);

	// Socket.io Communication

	var socket = require('./scripts/socket.js');
	io.sockets.on('connection', socket);

	// Start server 外部访问 http://127.0.0.1:3000

	server.listen(3000, function() {
	  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});

* 编辑器 在该 xxPath 创建路径及文件 scripts/socket.js 这个不用修改什么，照搬即可

scripts/socket.js

	// Keep track of which names are used so that there are no duplicates
	var userNames = (function () {
	  var names = {};

	  var claim = function (name) {
	    if (!name || names[name]) {
	      return false;
	    } else {
	      names[name] = true;
	      return true;
	    }
	  };

	  // find the lowest unused "guest" name and claim it
	  var getGuestName = function () {
	    var name,
	      nextUserId = 1;

	    do {
	      name = 'Guest ' + nextUserId;
	      nextUserId += 1;
	    } while (!claim(name));

	    return name;
	  };

	  // serialize claimed names as an array
	  var get = function () {
	    var res = [];
	    for (user in names) {
	      res.push(user);
	    }

	    return res;
	  };

	  var free = function (name) {
	    if (names[name]) {
	      delete names[name];
	    }
	  };

	  return {
	    claim: claim,
	    free: free,
	    get: get,
	    getGuestName: getGuestName
	  };
	}());

	// export function for listening to the socket
	module.exports = function (socket) {
	  var name = userNames.getGuestName();

	  // send the new user their name and a list of users
	  socket.emit('init', {
	    name: name,
	    users: userNames.get()
	  });

	  // notify other clients that a new user has joined
	  socket.broadcast.emit('user:join', {
	    name: name
	  });

	  // broadcast a user's message to other users
	  socket.on('send:message', function (data) {
	    socket.broadcast.emit('send:message', {
	      user: name,
	      text: data.message
	    });
	  });

	  // validate a user's name change, and broadcast it on success
	  socket.on('change:name', function (data, fn) {
	    if (userNames.claim(data.name)) {
	      var oldName = name;
	      userNames.free(oldName);

	      name = data.name;
	      
	      socket.broadcast.emit('change:name', {
	        oldName: oldName,
	        newName: name
	      });

	      fn(true);
	    } else {
	      fn(false);
	    }
	  });

	  // clean up when a user leaves, and broadcast it to other users
	  socket.on('disconnect', function () {
	    socket.broadcast.emit('user:left', {
	      name: name
	    });
	    userNames.free(name);
	  });
	};


* 退回到 xxPath 键入 `node app.js` 然后对应的服务边运行起来了。

## 修改 AngularJS

* 同样从种子模版中修改吧（[源码](https://github.com/angular/angular-seed)）

其实呢，用 app 下的文件也就可以了。

	app/                --> all of the files to be used in production
	  css/              --> css files
	    app.css         --> default stylesheet
	  img/              --> image files
	  index.html        --> app layout file (the main html template file of the app)
	  index-async.html  --> just like index.html, but loads js files asynchronously
	  js/               --> javascript files
	    app.js          --> application
	    controllers.js  --> application controllers
	    directives.js   --> application directives
	    filters.js      --> custom angular filters
	    services.js     --> custom angular services
	  lib/              --> angular and 3rd party javascript libraries
	    angular/
	      angular.js        --> the latest angular js
	      angular.min.js    --> the latest minified angular js
	      angular-*.js      --> angular add-on modules
	      version.txt       --> version number
	  partials/             --> angular view partials (partial html templates) 由于 Demo 是单一文件，这个文件夹里的东西可以不要
	    partial1.html
	    partial2.html


以下几个文件全部替换掉即可。

index.html (重要修改见注释)

	<!DOCTYPE html>
	<html ng-app="myApp">
	<head>
	  <meta charset="UTF-8">
	  <title>Angular Socket.io IM Demo App</title>
	  <link rel="stylesheet" href="css/app.css"></head>
	<body>
	  <h1>Angular Socket.io IM Demo App</h1>
	  <div ng-controller="AppCtrl">
	    <div class="col">
	      <h3>Messages</h3>
	      <div class="overflowable">
	        <p ng-repeat="message in messages" ng-class="{alert: message.user == 'chatroom'}">{{message.user}}: {{message.text}}</p>
	      </div>
	    </div>
	    <div class="col">
	      <h3>Users</h3>
	      <div class="overflowable">
	        <p ng-repeat="user in users">{{user}}</p>
	      </div>
	    </div>
	    <div class="clr">
	      <form ng-submit="sendMessage()">
	        Message:
	        <input size="60" ng-model="message">
	        <input type="submit" value="Send"></form>
	    </div>
	    <div class="clr">
	      <h3>Change your name</h3>
	      <p>Your current user name is {{name}}</p>
	      <form ng-submit="changeName()">
	        <input ng-model="newName">
	        <input type="submit" value="Change Name"></form>
	    </div>
	  </div>
	  <script src="lib/angular/angular.js"></script>
	  <!-- 以下这条很重要 127.0.0.1:3000 或者如下的服务地址 -->
	  <script src="//192.168.1.105:3000/socket.io/socket.io.js"></script>
	  <script src="js/app.js"></script>
	  <script src="js/services.js"></script>
	  <script src="js/controllers.js"></script>
	  <script src="js/filters.js"></script>
	  <script src="js/directives.js"></script>
	</body>
	</html>

css/app.css

	.overflowable {
	  height: 240px;
	  overflow-y: auto;
	  border: 1px solid #000;
	}

	.overflowable p {
	  margin: 0;
	}

	.col {
	  float: left;
	  width: 350px;
	}

	.clr {
	  clear: both;
	}

js/app.js

	// Declare app level module which depends on filters, and services
	angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']);		

js/services.js

	angular.module('myApp.services', [])
		.value('version', '0.1')
		.factory('socket', function($rootScope) {
		/* 定位 socket IO 服务器, 括弧把 ip 弄上 */
		var socket = io.connect('http://192.168.1.105:3000'); 
		return {
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				})
			}
		};
	});

js/controllers.js

	/* Controllers */

	function AppCtrl($scope, socket) {

	  // Socket listeners
	  // ================
	  socket.on('init', function (data) {
	    $scope.name = data.name;
	    $scope.users = data.users;
	  });

	  socket.on('send:message', function (message) {
	    $scope.messages.push(message);
	  });

	  socket.on('change:name', function (data) {
	    changeName(data.oldName, data.newName);
	  });

	  socket.on('user:join', function (data) {
	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + data.name + ' has joined.'
	    });
	    $scope.users.push(data.name);
	  });

	  // add a message to the conversation when a user disconnects or leaves the room
	  socket.on('user:left', function (data) {
	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + data.name + ' has left.'
	    });
	    var i, user;
	    for (i = 0; i < $scope.users.length; i++) {
	      user = $scope.users[i];
	      if (user === data.name) {
	        $scope.users.splice(i, 1);
	        break;
	      }
	    }
	  });

	  // Private helpers
	  // ===============

	  var changeName = function (oldName, newName) {
	    // rename user in list of users
	    var i;
	    for (i = 0; i < $scope.users.length; i++) {
	      if ($scope.users[i] === oldName) {
	        $scope.users[i] = newName;
	      }
	    }

	    $scope.messages.push({
	      user: 'chatroom',
	      text: 'User ' + oldName + ' is now known as ' + newName + '.'
	    });
	  }

	  // Methods published to the scope
	  // ==============================

	  $scope.changeName = function () {
	    socket.emit('change:name', {
	      name: $scope.newName
	    }, function (result) {
	      if (!result) {
	        alert('There was an error changing your name');
	      } else {
	        
	        changeName($scope.name, $scope.newName);

	        $scope.name = $scope.newName;
	        $scope.newName = '';
	      }
	    });
	  };

	  $scope.messages = [];

	  $scope.sendMessage = function () {
	    socket.emit('send:message', {
	      message: $scope.message
	    });

	    // add the message to our model locally
	    $scope.messages.push({
	      user: $scope.name,
	      text: $scope.message
	    });

	    // clear message box
	    $scope.message = '';
	  };
	}


然后就能重现开头的那个例子了。

![](/images/Coding/AngularJS-Socket.IO-test.png);

在线 IM