---
layout: post
title: About Rails
category : Coding
tags: Rails 笔记
---

## Rails模式

![模型——视图——控制器架构](/images/Coding/MVC.png "模型——视图——控制器架构")

![Rails与MVC](/images/Coding/Rails-and-MVC.png "Rails与MVC")

<!-- break -->

## 开发环境搭建

### Windows

可使用 [Railsinstaller](http://railsinstaller.org/)进行搭建
下载后选择任一目录下安装，比如，D:\Rails，基本环境即搭建完成。

### 建立第一个应用

在命令控制台中（Windows下："运行"——"cmd"），通过DOS命令定位到Rails的安装目录，并建立新文件夹

	D:
	cd Rails
	md Sites
	cd Sites

我们姑且让 D:\Rails\Sites\ 作为我们的工作空间,在该目录下，输入

	Rails new demo

Rails环境会自动建立基础文件群  
由于需要检测插件完整性，所以保证网络连接，检测完成后，进入下一步。
提示`Installed`即成功

访问该目录，并启动服务（每次开始编码工作都需要重复这一步，所以休眠模式是很重要的。）

	cd demo
	Rails s

出现以上信息后，打开浏览器，访问 <http://localhost:3000/> ,见到欢迎界面即环境搭建完成。


## 控制台操作

### 更新与清理

#### 列出已安装

	gem list 

#### 联网、自动更新Rails

	gem update rails 

#### 清理旧版本内容

	gem cleanup

#### gem 升级	

	gem update --system

#### 安装/删除模块

	gem install XXX	
	gem uninstall XXX	

#### 更新应用	

	\.> rake Rails:update  

### 部署与数据库管理

#### 关联插件安装

	\.> bundle install 

#### 生成数据库

	\.> rake db:migrate 

#### 清除数据库

	\.> rake db:rollback

### Rails 指令缩写

	rails generate
	rails g

	rails destroy
	rails d

	rails console
	rails c

	rails dbconsole
	rails db

	rails server
	rails s

### Rails MVC 操作


#### 建立/删除模块，包含View、Controller、Model与DBStruct

	rails g/d scaffold NAME [field[:type][:index] field[:type][:index]] [options]

#### 建立/删除模块，包含View与Controller

	rails g/d controller NAME [action action] [options]

#### 建立/删除模块，包含Model与DBStruct

	rails g/d model NAME [field[:type][:index] field[:type][:index]] [options]

#### 建立/删除模块，包含DBStruct

	rails g/d migration NAME [field[:type][:index] field[:type][:index]] [options]