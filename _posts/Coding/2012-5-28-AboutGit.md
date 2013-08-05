---
layout: post
title: About Git
category : Coding
tags: Git Github 笔记
---



## 搭建 GitHub 的 Git 环境

### 基本环境 

#### Windows

* 下载并安装 [Git for Windows](http://code.google.com/p/msysgit/downloads/list) 的最新版本
* 图文步骤详见 <http://help.github.com/win-set-up-git/>

<!-- break -->

### Set Up SSH Keys

运行 Git Bash（不是CMD）

#### 1、Check for SSH keys. *Have an existing key pair? You can skip to Step 4.*

First, we need to check for existing ssh keys on your computer:

	$ cd ~/.ssh

Checks to see if there is a directory named ".ssh" in your user directory
If it says “No such file or directory“ skip to step 3. Otherwise continue to step 2.

#### 2、Backup and remove existing SSH keys.

Since there is already an SSH directory you’ll want to back the old one up and remove it:

	$ ls
	config id_rsa id_rsa.pub known_hosts
	$ mkdir key_backupmakes a subdirectory called "key_backup" in the current directory
	$ cp id_rsa* key_backupCopies the id_rsa and id_rsa.pub files into key_backup
	$ rm id_rsa*Deletes the id_rsa and id_rsa.pub files

#### 3、Generate a new SSH key.

To generate a new SSH key, enter the code below. We want the default settings so when asked to enter a file in which to save the key, just press enter.

	$ ssh-keygen -t rsa -C "your_email@youremail.com"	
	Generating public/private rsa key pair.
	Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<press enter>

Now you need to enter a passphrase.

Why do passphrases matter?

	Enter passphrase (empty for no passphrase):<enter a passphrase>
	Enter same passphrase again:<enter passphrase again>

Which should give you something like this:

	Your identification has been saved in /Users/your_user_directory/.ssh/id_rsa.
	Your public key has been saved in /Users/your_user_directory/.ssh/id_rsa.pub.
	The key fingerprint is:
	01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db user_name@username.com

#### 4、Add your SSH key to GitHub.

On the GitHub site Click “Account Settings” > Click “SSH Keys” > Click “Add SSH key”  
是账户里，不是在项目管理中。

![](http://help.github.com/images/ssh_key_add.jpg)

#### 5、Test everything out.

To make sure everything is working you’ll now SSH to GitHub. Don’t change the “git@github.com” part. That’s supposed to be there.

	$ ssh -T git@github.com

Which should give you this:

	The authenticity of host 'github.com (207.97.227.239)' can't be established.
	RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
	Are you sure you want to continue connecting (yes/no)?

Don’t worry, this is supposed to happen. Type “yes”.

	Hi username! You've successfully authenticated, but GitHub does not provide shell access.


## Set Up Your Info

### 1、Set your username and email.

Git tracks who makes each commit by checking the user’s name and email. In addition, we use this info to associate your commits with your GitHub account. To set these, enter the code below, replacing the name and email with your own. The name should be your actual name, not your GitHub username.

	$ git config --global user.name "Firstname Lastname"
	$ git config --global user.email "your_email@youremail.com"

More about user info

### 2、Set your GitHub token.

Previous versions of our API used token authentication, but we’re removing support for that soon, see our GitHub API Moving On blog post for details.

If you are using a 3rd party tool that is asking for your token, you should contact the maintainer and ask them to update to our latest API as the old API will stop working soon.

Please note you do not need the API Token to work with git.

## Github 操作

### Create A Repo

1、在 Github 上创建新 Repo 后，记住 RepoName

2、初始化

	$ mkdir ~/RepoName
	$ cd ~/RepoName
	$ git init
	Initialized empty Git repository in /Users/your_user_directory/RepoName/.git/
	$ touch README

3、将代码放到 Repo 目录下，ReadMe是项目说明文件，建议修改为.md文件

	$ git add .
	$ git commit -m "*注释内容*"

	$ git remote add origin git@github.com:username/RepoName.git
	$ git push -u origin master

### Fork Repo

1、在 Github 上 Fork 某个项目后，先从自己的帐号处 clone 被 Fork 的项目

	$ git clone git@github.com:username/ForkedPepo.git 

2、创建分支（upstream可自定义）

	$ cd ForkedPepo
	$ git remote add upstream git://github.com/原作者/ForkedPepo.git
	$ git fetch upstream

3、正常管理

### 管理 Repo

#### 基本操作

更新，定位到 Repo 目录

	$ git add .
	$ git commit -m "*注释内容*"
	$ git push

若在网页上有修改，需要：
	
	$ git pull

#### 迁移

	git clone --bare url/for/my-old-repo.git
	cd my-old-repo.git
	git push --mirror git@github.com:mycompany/my-new-repo.git
	cd ..
	rm -rf my-old-repo.git

#### 创建分支与合并分支

	$ git checkout master
	$ git remote add kneath git://github.com/kneath/jobs.git
	$ git fetch kneath
	$ git merge kneath/error-page
	$ git push origin master	

