// 安装 node.js
// 安装 grunt ：在控制台（ window 运行 cmd）输入 npm install -g grunt-cli 即可
// 项目目录 npm install  安装关联库
// grunt 执行相关任务 (在目录下)


// 管理自己的代码


// 定义 grunt 的设置
module.exports = function(grunt) {

    // grunt 组件

    grunt.loadNpmTasks('grunt-contrib-less'); // 合并压缩 less 文件

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.loadNpmTasks('grunt-contrib-watch'); // 动态执行任务



    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 合并压缩 less 文件
        // 文档 https://github.com/gruntjs/grunt-contrib-less
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: false,
                    optimization: 0
                },
                files: {
                    "__dest/css/styles.css": "__src/less/_index.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "__dest/css/styles.css": "__src/less/_index.less"
                }
            }
        },


        // 复制文件
        // 文档 https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            font: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['__base/Font-Awesome/font/**'],
                    dest: '__dest/font/',
                    filter: 'isFile'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['__src/js/**'],
                    dest: '__dest/js/',
                    filter: 'isFile'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    cwd: '__dest/',
                    src: ['**'],
                    dest: 'assets/'
                }]
            }
        },


        // 清理
        // 文档 https://github.com/gruntjs/grunt-contrib-clean

        clean: {
            build: ["__dest/css/", "__dest/js/", "__dest/font/"],
            release: ["assets/css/", "assets/js/", "assets/font/"],
        },



        // 监控文件变化并动态执行任务
        // 如下设置是 js 文件夹的任一 js 文件有变化则执行合并
        // less 文件夹下任一 less 文件有变化则执行 less 编译 watch 一般用于开发，所以这里设置了，即编译但不压缩
        // 文档 https://github.com/gruntjs/grunt-contrib-watch

        watch: {
            scripts: {
                files: ['__src/js/**.js'],
                tasks: ['copy:js']
            },
            less: {
                files: ['__src/less/**/*.less', '__src/less/**/**/*.less', '__src/less/**/**/**/*.less'],
                tasks: ['less:development']
            },
            dest: {
                files: ['__dest/**.**'],
                tasks: ['copy:dest']
            }
        }



    });


    // 注册各种组合任务

    // 仅运行本地服务器 运行 `grunt webServer`
    grunt.registerTask('webServer', ['connect:devServer']);

    // 开发环境 不压缩 运行 `grunt dev`
    grunt.registerTask('dev', ['concat', 'less:development', 'webServer']);
    // 生产环境 压缩 可运行 `grunt pro`
    grunt.registerTask('pro', ['concat', 'uglify', 'less:production', 'webServer']);

    // 默认 运行 `grunt`
    grunt.registerTask('default', ['webServer']);

    // 上面 initConfig 的所有一级节点都是可以直接调用的。
    // 比如 `grunt watch` 监控文件实时执行任务


    grunt.registerTask('prePo', ['clean:release', 'less:development', 'copy', 'clean:build']);
};