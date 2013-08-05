---
layout: post
title: Grunt 初体验
category : Coding
tags: Grunt NodeJS WebStorm
---

## 引

懒人改变世界，致敬这帮懒人。

<!-- break -->

## 参考阅读 

[grunt getting started](http://gruntjs.com/getting-started)

## node.js 环境 与 grunt

1、获取与安装 node.js ：详见 <http://nodejs.org/> 

2、安装 grunt ：在控制台（ window 运行 cmd）输入 `npm install -g grunt-cli` 即可（这里是全局安装，不需要再在每个项目执行了）

## 单一项目配置

### 新建 package.json 文件

和一般 node.js 项目一样。
 
	{
		"name": "myApp", 
		"version": "0.0.1",
		"devDependencies": {
			"grunt": "*",
			"grunt-contrib-less": "*",
			"grunt-contrib-concat": "*",
			"grunt-contrib-uglify": "*",
			"grunt-contrib-connect": "*",
			"grunt-contrib-watch": "*"
		}
	}



### 新建 Gruntfile.js 文件

	// 定义 grunt 的设置
	module.exports = function (grunt) {

	    // grunt 组件
	    grunt.loadNpmTasks('grunt-contrib-connect'); // 本地服务器
	    grunt.loadNpmTasks('grunt-contrib-less'); // 合并压缩 less 文件
	    grunt.loadNpmTasks('grunt-contrib-concat'); // 合并 js 文件
	    grunt.loadNpmTasks('grunt-contrib-uglify'); // 压缩 js 文件
	    grunt.loadNpmTasks('grunt-contrib-watch'); // 动态执行任务

	    // 配置
	    grunt.initConfig({

	        pkg: grunt.file.readJSON('package.json'),

	        // 本地服务器
	        // 文档 https://github.com/gruntjs/grunt-contrib-connect
	        connect: {
	            devServer: {
	                options: {
	                    port: 8000,
	                    hostname: '0.0.0.0',
	                    base: './public',
	                    keepalive: true,
	                    middleware: function (connect, options) {
	                        return [
	                            // Serve static files.
	                            connect.static(options.base),
	                            // Make empty directories browsable.
	                            connect.directory(options.base),
	                        ];
	                    }
	                }
	            },
	            testServer: {}
	        },

	        // 合并压缩 less 文件       
	        // 文档 https://github.com/gruntjs/grunt-contrib-less
	        less: {
	            development: {
	                options: {
	                    yuicompress: false
	                },
	                files: {
	                    "public/assets/css/styles.css": "src/less/styles.less"
	                }
	            },
	            production: {
	                options: {
	                    yuicompress: true
	                },
	                files: {
	                    "public/assets/css/styles.css": "src/less/styles.less"
	                }
	            }
	        },

	        // 合并 js 文件
	        // 文档 https://github.com/gruntjs/grunt-contrib-concat
	        concat: {
	            options: {
	                separator: ';'
	            },
	            dist: {
	                // 这里放需要合并的文件
	                src: [
	                    'src/js/domUi/domUi.transition.js',
	                    'src/js/domUi/domUi.tips.js',
	                    'src/js/domUi/domUi.dialog.js',
	                    'src/js/domUi/domUi.tabs.js',
	                    'src/js/domUi/domUi.grid.js',
	                    'src/js/domUi/domUi.interaction.js',
	                    'src/js/domUi/domUi.widgets.js',
	                    'src/js/domUi/domUi.container.js',
	                    'src/js/domUi/domUi.slider.js',
	                    'src/js/controllers.js',
	                    'src/js/angularApp.js'
	                ],
	                dest: 'public/assets/js/app.js'
	            }
	        },
	        // 压缩 js 文件
	        // 文档 https://github.com/gruntjs/grunt-contrib-uglify
	        uglify: {
	            build: {
	                files: {
	                    // concat 任务合并后的文件路径 可同名
	                    'public/assets/js/app.js': ['public/assets/js/app.js']
	                }
	            }
	        },

	        // 监控文件变化并动态执行任务
	        // 文档 https://github.com/gruntjs/grunt-contrib-watch
	        watch: {
	            scripts: {
	                files: ['src/js/**/*.js'],
	                tasks: ['concat']
	            },
	            less: {
	                files: 'src/less/**/*.less',
	                tasks: ['less']
	            }
	        }

	    });
	    // 注册以外部调用 `grunt webServer` 
	    grunt.registerTask('webServer', ['connect:devServer']);

	    // 开发环境不压缩 可调用 `grunt dev`
	    grunt.registerTask('dev', ['concat', 'less:development', 'webServer']);
	    // 生产环境压缩 可调用 `grunt pro`
	    grunt.registerTask('pro', ['concat', 'uglify', 'less:production', 'webServer']);

	    // 注册以外部调用 `grunt`
	    grunt.registerTask('default', ['dev']);

	    // 上面 initConfig 的所有一级节点都是可以直接调用的。
	    // 比如 `grunt watch` 监控文件实时执行任务
	};

### 执行（在控制台中，定位到项目目录下）

`npm install` 自动下载依赖的组件

`grunt` 运行 grunt 任务

在另一个控制台中执行 `grunt watch` 因为 sever 和 watch 不是同时执行


## IDE - WebStorm 中使用

由于 WebStorm 默认不会实时写入原文件，所以需要 

菜单栏 - File - Settings

IDE Settings - General

Synchronizition 那栏中去掉 Use "safe write"


在由于 WebStorm 的 Terminal 是独立的，不能直接执行 grunt

得如下的方式做

`node C:\Users\Morlay\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt`

所以我们可以这么设置 External Tools

菜单栏 - File - Settings

IDE Settings - External Tools

添加

如下设置

	Name：<自定义，好辨认即可>
	Group：Grunt
	Program: node
	Parameter: C:\Users\Morlay\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt
	Working directory: $ProjectFileDir$

等同 控制台的 grunt

	Name：<自定义，好辨认即可>
	Group：Grunt
	Program: node
	Parameter: C:\Users\Morlay\AppData\Roaming\npm\node_modules\grunt-cli\bin\grunt watch
	Working directory: $ProjectFileDir$

又等同 控制台的 grunt watch

这样就能 从

菜单栏 - Tools - Grunt 还有 项目的右键菜单里也有

选择执行对应的指令了。

![](/images/WebStorm/WebStorm-Grunt.png)

或者 Toolbar，设置方法

![](/images/WebStorm/WebStorm-ToolBar.png)