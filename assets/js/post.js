requirejs.config(requirejsConfig);


requirejs(["jquery"], function($) {

    var ContentMenu = function(contentId, menuLevel) {
        this.contentId = contentId;
        this.contents = [];
        this.menuLevel = menuLevel;
        this.menuLevelTags = ['h2', 'h3', 'h4', 'h5', 'h6'];
    };
    ContentMenu.prototype.bulidIn = function(selectorString) {
        if (this.menuLevel > 0 && this.menuLevel < 6) {
            var levelNeed = this.menuLevelTags.slice(0, this.menuLevel);
            this.getMenuItem(levelNeed);
            var html = '';
            var curLevel = 0;
            for (var i = 0, item; item = this.contents[i]; i++) {
                if (item.levelIndex > curLevel) {
                    html += '<ul>';
                    curLevel = item.levelIndex;
                    html += '<li class="menu-index-' + item.levelIndex + '"><a href="#' + item.id + '">' + item.name + '</a></li>';
                } else if (item.levelIndex < curLevel) {
                    html += '</ul>';
                    curLevel = item.levelIndex;
                    html += '<li class="menu-index-' + item.levelIndex + '"><a href="#' + item.id + '">' + item.name + '</a></li>';
                } else {
                    html += '<li class="menu-index-' + item.levelIndex + '"><a href="#' + item.id + '">' + item.name + '</a></li>';
                }
            }
            if (curLevel != 0) {
                html += '</ul>';
            }
            // console.log(html);
            $(selectorString).prepend('<ul id="content-menu">' + html + '</ul>');
        }
    };
    ContentMenu.prototype.getMenuItem = function(levelNeed) {
        var pointer = this;
        $(levelNeed.join(), pointer.contentId).each(function(index, item) {
            var contentsItem = {};
            switch (item.tagName.toLowerCase()) {
                case 'h2':
                    contentsItem.levelIndex = 0;
                    break;
                case 'h3':
                    contentsItem.levelIndex = 1;
                    break;
                case 'h4':
                    contentsItem.levelIndex = 2;
                    break;
                case 'h5':
                    contentsItem.levelIndex = 3;
                    break;
                case 'h6':
                    contentsItem.levelIndex = 4;
                    break;
                default:
            }
            contentsItem.name = $(item).text();
            contentsItem.id = "menu-" + index;
            $(item).addClass('menu-index-' + contentsItem.levelIndex);
            pointer.contents.push(contentsItem);
            item.id = "menu-" + index;
        });
    };

    $('.article-content').append($('<div id="disqus_thread"/>'));

    function loadDisqus() {
        // http://docs.disqus.com/help/2/
        window.disqus_shortname = 'morlay';

        // http://docs.disqus.com/developers/universal/
        (function() {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    }

    $(function() {
        var articleMenu = new ContentMenu('.article-content', 2);
        articleMenu.bulidIn('.site-main');

        requirejs(["google-code-prettify"], function(prettyPrint) {
            //添加Google code Hight需要的class
            $('pre').addClass('prettyprint');
            prettyPrint.prettyPrint();
        });
    });
});