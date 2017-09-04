(function($, hljs){
    $(document).ready(function(){
        if($('.doc-content').length){

            //copy sample code
//            $('.doc-content pre').each(function(index, el){
//                $(el).append('<a href="javascript:void(0)" title="复制代码" class="copy-code fa fa-clipboard"></a>');
//                var sourceCode = $(el).text();
//                var $copy = $(el).find('.copy-code');
//                var client = new ZeroClipboard($copy);
//                client.on( "ready", function( readyEvent ) {
//                    client.on( 'copy', function(event) {
//                        event.clipboardData.setData('text/plain', sourceCode);
//                    } );
//                    client.on( 'aftercopy', function(event) {
//                        alert('代码复制成功！');
//                    } );
//                } );
//            });

            // Syntax highlighting
            hljs.initHighlightingOnLoad();

            // Add Bootstrap styling to tables
            $('.doc-content table').addClass('table');

            // FitVids
          //  $('.doc-content').fitVids();

        }
        //get release IDE
        $.ajax({
            url: 'http://117.78.3.250/getReleaseApicloudIde',
            // url: 'http://192.168.13.183:8081/getReleaseApicloudIde',
            dataType: 'jsonp',
            type:'get',
            success: function(data){
                if(data.status){
                    var result = data.body;
                    $('#studioDownload .win').attr('href',result.win.url);
                    $('#studioDownload .mac').attr('href',result.mac.url);
                }else{

                }
            }
        });

//        if($('.home-categories').length){
//             $('.home-categories').masonry({
//                 columnWidth: '.col',
//                 itemSelector: '.col',
//                 transitionDuration: 0
//             });
//        }

        //back to top
//        $(window).on('keyup', function(e){
//            if(e.keyCode === 84){
//                window.scrollTo(0,0);
//            }
//        });
//
//        var $backToTop = $('#backToTop');
//        var $mainCon = $('.main-container');
//        // var $mainMenu = $mainCon.find('.doc-left-menu');
//        var $mainMenu = $mainCon.find('.doc-left-menu .doc-nav');
//        var $mainContent = $mainCon.find('.main-content');
//        var screenHeight = $(window).height();
//        var screenWidth = $(window).width();
//        $(window).on('scroll',function(){
//            var st = $(document).scrollTop();
//            $mainContent.css('min-height', $mainMenu.height() + 'px');
//            // console.log($mainMenu.height());
//            if(st > screenHeight){
//                $backToTop.addClass('show');
//                //fixed left menu
//                if(screenWidth > 1024){
//                    $mainCon.addClass('fixed');
//
//                }
//            }else{
//                $backToTop.removeClass('show');
//                //fixed left menu
//                if(screenWidth > 1024){
//                    $mainCon.removeClass('fixed');
//                }
//            }
//
//        });
//        $backToTop.on('click',function(){
//            window.scrollTo(0,0);
//            $backToTop.css('bottom','300px');
//            setTimeout(function(){
//                $backToTop.removeAttr('style');
//            },500);
//            return false;
//        });

        //切换tab并记录锚点
        //clearing storage in new page
        if(location.hash === ''){
            localStorage.removeItem('curContentTab');
        }

        //active current content tab
        var $tab = $('#tab');
        var curContentTab = localStorage.getItem('curContentTab');
        if(curContentTab){
            var $curTab = $tab.find('a[href="'+ curContentTab +'"]');
            $('#tab .active').removeClass('active');
            $curTab.parent('li').addClass('active');
            var $curCont = $(curContentTab);

            $('.active-content').removeClass('active-content').hide();
            $curCont.addClass('active-content').show();
        }

        //add by Alon Zhang
        //content tab
        $tab.find('a').each(function(index, el) {
            var cont = $(el).attr('href');
            if(!curContentTab){
                if(index === 0){
                    $(cont).addClass('active-content').show();
                    //current content tab
                    localStorage.setItem('curContentTab', cont);
                }
            }

            $(el).on('click',function(){
                $('#tab .active').removeClass('active');
                $(this).parent('li').addClass('active');

                $('.active-content').removeClass('active-content').hide();
                $(cont).addClass('active-content').show();

                localStorage.setItem('curContentTab', cont);

                return false;
            });
        });

        //自动切换apploader标签
        //http://docs.apicloud.com/APICloud/download?from=apploader
        var loaderSearch = location.search.slice(1);
        if(loaderSearch === 'from=apploader'){
            $tab.find('a[href="#apploader"]').trigger('click');
        }

        //页内锚点并切换TAB
        //<a href="!Constant#b12">链接内容</a>
        var tabArr = ['Attribute', 'Constant', 'Event', 'Method'];
        var tabLink = ['#attr-content', '#const-content', '#evt-content', '#method-content'];
        var i = 0, len = tabArr.length;
        for(i; i<len; i++){
            var curTab = tabArr[i];
            (function(i){
                $('a[href^="!'+ curTab +'"]').on('click',function(){
                    var curTabLink = tabLink[i];
                    var hashStr = $(this).attr('href').split('#')[1];
                    $('a[href="'+ curTabLink +'"]').trigger('click');
                    if(hashStr){
                        location.hash = '#'+ hashStr;
                    }else{
                        //兼容无内链
                        window.scrollTo(0,0);
                    }

                    return false;
                });
            })(i);
        }

        //页间锚点并切换TAB
        //<a href="/端API/API对象功能类/api#Event!b15">链接内容</a>
        var hashArr = location.hash.split('!');
        var tabTitle = hashArr[0];
        var anchor = hashArr[1];
        var hash = tabTitle.slice(1);
        var i = 0, len = tabArr.length;
        for(i; i<len; i++){
            var curTab = tabArr[i];
            if(curTab === hash){
                var curTabLink = tabLink[i];
                $('a[href="'+ curTabLink +'"]').trigger('click');
                if(anchor){
                    location.hash = '#'+ anchor;
                }
            }
        }

        //init submenu
        var initSubMenu = function(el, num){
            num = num - 1;
            $(el).nextAll('.category').each(function(index, el) {
                if(index > num){
                    return;
                }else{
                    $(el).addClass('second');
                }
            });
        };
        var $menu = $('.container-fluid .doc-nav .category');
        $menu.each(function(index, el) {
            var $this = $(el);
            var $li = $this.find('.pages li');
            var len = $li.length;
            if(index >= 1 && index <= 2){
                //技术专题，开发SDK接入帮助二级
                $this.addClass('second');
            }
            if(index >= 4 && index <= 9){
                $this.addClass('second');
            }
            if(index == 12){
                //FAQ二级
                $this.addClass('second');
            }

        });

        //toggle subMenu
        $('.doc-nav .second').each(function(index, el) {
            var $active = $(el).find('.active');
            if($active[0]){
                $(el).find('.pages').addClass('show');
            }

            var $title = $(el).find('h5');

            var $subMenu = $title.next('.pages');
            //submenu
            var titArr = ['导航菜单', '功能扩展', '界面布局', '开放sdk', '设备访问', '云服务对接'];
            var pathArr = ['navMenu.html', 'funExt.html', 'interface.html', 'sdk.html', 'device.html', 'cloud.html'];
            $title.on('click',function(){
                $('ul.doc-nav .active').removeClass('active');
                $title.addClass('active');

                $subMenu.toggleClass('show');
                $title.parent('.second').siblings('.second').find('.show').removeClass('show');

                var i = 0, len = titArr.length;
                for(i; i<len; i++){
                    if($title.text() === titArr[i]){
                        var thisPath = pathArr[i];

                        //submenu outline
                        $('section.doc-content').load('/subMenuOutline/'+ thisPath, function(data) {

                            //二级菜单outline图示
                            var $subMenuOutline = $('.subMenuOutline');
                            if($subMenuOutline.length){
                                var $outlineTip = $('#outlineTip');
                                var showTip = function(imgName, el){
                                    if(imgName){
                                        var url = '/img/docImage/';
                                        var pos = $(el).offset();
                                        var left = (pos.left + 55) + 'px';
                                        var top = (pos.top - 40) + 'px';
                                        url = url + imgName +'.jpg';
                                        $outlineTip.html('<img src="'+ url +'">');
                                        $outlineTip.css({
                                            left: left,
                                            top: top
                                        });
                                        $outlineTip.fadeIn();
                                    }
                                };
                                var hideTip = function(){
                                    $outlineTip.hide();
                                };
                                $subMenuOutline.on('mouseover', '.view-icon', function(e){
                                    var $this = $(e.target);
                                    var $module = $this.closest('.list-group-item').find('.module a');
                                    var imgName = $module.text();
                                    showTip(imgName, e.target);
                                });
                                $subMenuOutline.on('mouseout', '.view-icon', function(e){
                                    hideTip();
                                });
                            }

                        });
                    }
                }
            });
        });

        //update history log
        var $downloadCon = $('.download-content');
        if($downloadCon.length){
            $downloadCon.on('click','.ver-info a',function(){
                $(this).toggleClass('open');
                var $detail = $(this).parent('.ver-info').next('.detail');
                $detail.toggleClass('show');

                return false;
            });
            $downloadCon.on('click','.history-title',function(){
                $(this).toggleClass('open');
                var $history = $(this).next('.history');
                $history.toggleClass('show');

                return false;
            });
        }

        //获取登录状态
        var $ifSigned = $('#ifSigned');
        var $usrIcon = $('#ifSigned img');
        var $nickname = $('#ifSigned .user-name');
        var $regLog = $('#reg-log');
        $.ajax({
            // url: 'http://192.168.13.183/api/user/info?jsonp',
            url: 'http://www.apicloud.com/api/user/info?jsonp',
            dataType: 'jsonp',
            success: function(data){
                if(data.status){
                    var result = data.result;
                    $usrIcon.attr('src', result.icon2);
                    var txt = data.result.userName +"| 控制台";
                    $('#ifSigned .toConsole span').eq(0).text(txt);

                    $('.link-group').addClass('active');
                    $('#ifSigned').addClass('active');
                }else{
                    $('.link-group').removeClass('active');
                    $('#ifSigned').removeClass('active');
                }
            }
        });


        //首页点二级目录
        var searchStr = location.search.slice(1);
        if(searchStr === 'from=home'){
            var $activeLi = $('.doc-nav .second .active');
            $activeLi.removeClass('active');
            var $activeTit = $activeLi.parent('.pages').prev('.category-title');
            $activeTit.addClass('active');
            $activeTit.trigger('click');
            $activeTit.next('.pages').addClass('show');
        }

        //download SDK
        var $downloadCon = $('.download-content');
        if($downloadCon.length){
            var browser = navigator.userAgent,platform;
            if (browser.indexOf('Windows') > 0) {
                platform = 0;
            }else if (browser.indexOf('Macintosh') > 0) {
                platform = 1;
            };
            $.ajax({
                url: 'http://117.78.3.250/getApicloudSdk?length=2&platform='+platform,
                // url: 'http://192.168.13.183:81/getApicloudSdk?length=10',
                dataType: 'jsonp',
                success: function(data){
                    if(data.status){
                        var result = data.body;
                        var $sdkVer = $('#sdk-ver');
                        var $lastVer = $sdkVer.find('.last-ver');
                        var $lastSize = $sdkVer.find('.last-size');
                        var $lastDate = $sdkVer.find('.last-date');
                        var $lastLog = $sdkVer.find('.last-log');
                        var $lastUrl = $sdkVer.find('.last-url');

                        var $sdkHistory = $sdkVer.find('.history ul');

                        var i = 0, len = result.length;
                        var htmlStr = '';
                        var liClass = '';
                        for(i; i<len; i++){
                            var it = result[i];
                            if(i === 0){
                                $lastVer.text('V'+ it.ver);
                                $lastSize.text(it.size);
                                $lastDate.text(it.show_time);
                                $lastLog.html(it.info);
                                $lastUrl.attr('href', it.url);
                                continue;
                            }

                            if(i === 1){
                                liClass = 'first';
                            }else if(i === len-1){
                                liClass = 'last';
                            }else{
                                liClass = '';
                            }
                            htmlStr += '<li class="'+ liClass +'">'+
                                '<div class="ver-info">'+
                                '<a class="" href="#"><span class="ver">V'+ it.ver +'</span>/<span class="size">'+ it.size +'</span></a>'+
                                '</div>'+
                                '<div class="detail">'+
                                '<div class="update-log">'+
                                '<a href="'+ it.url +'" class="download btn">下载</a>'+
                                '<div class="log">'+ it.info +
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</li>';

                        }

                        $sdkHistory.html(htmlStr);

                    }
                }
            });

            $.ajax({
                url: 'http://117.78.3.250/getMdSdk?length=2',
                // url: 'http://192.168.13.183:81/getMdSdk?length=10',
                dataType: 'jsonp',
                success: function(data){
                    if(data.status){
                        var result = data.body;
                        var $sdkVer = $('#mod-sdk-ver');
                        var $lastVer = $sdkVer.find('.last-ver');
                        var $lastSize = $sdkVer.find('.last-size');
                        var $lastDate = $sdkVer.find('.last-date');
                        var $lastLog = $sdkVer.find('.last-log');
                        var $lastUrl = $sdkVer.find('.last-url');

                        var $sdkHistory = $sdkVer.find('.history ul');

                        var i = 0, len = result.length;
                        var htmlStr = '';
                        var liClass = '';
                        for(i; i<len; i++){
                            var it = result[i];
                            if(i === 0){
                                $lastVer.text('V'+ it.ver);
                                $lastSize.text(it.size);
                                $lastDate.text(it.show_time);
                                $lastLog.html(it.info);
                                $lastUrl.attr('href', it.url);
                                continue;
                            }
                            if(i === 1){
                                liClass = 'first';
                            }else if(i === len-1){
                                liClass = 'last';
                            }else{
                                liClass = '';
                            }
                            htmlStr += '<li class="'+ liClass +'">'+
                                '<div class="ver-info">'+
                                '<a class="" href="#"><span class="ver">V'+ it.ver +'</span>/<span class="size">'+ it.size +'</span></a>'+
                                '</div>'+
                                '<div class="detail">'+
                                '<div class="update-log">'+
                                '<a href="'+ it.url +'" class="download btn">下载</a>'+
                                '<div class="log">'+ it.info +
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                        }

                        $sdkHistory.html(htmlStr);

                    }
                }
            });
            /*apploader*/
            $.ajax({
                url: 'http://117.78.3.250/getLoader',
                // url: 'http://192.168.13.183:8081/getLoader',
                dataType: 'jsonp',
                success: function(data){
                    if(data.status){
                        var result = data.body;
                        var $apploader = $('#apploader-ver');
                        var $lastVer = $apploader.find('.last-ver');
                        var $lastSize = $apploader.find('.last-size');
                        var $lastDate = $apploader.find('.last-date');
                        var $lastLog = $apploader.find('.last-log');
                        var $lastUrl = $apploader.find('.last-url');

                        var $loaderHistory = $apploader.find('.history ul');

                        var i = 0, len = result.length;
                        var htmlStr = '';
                        var liClass = '';
                        for(i; i<len; i++){
                            var it = result[i];
                            if(i === 0){
                                $lastVer.text('V'+ it.ver);
                                $lastSize.text(it.size);
                                $lastDate.text(it.show_time);
                                $lastLog.html(it.info);
                                $lastUrl.attr('href', it.url);
                                continue;
                            }

                            if(i === 1){
                                liClass = 'first';
                            }else if(i === len-1){
                                liClass = 'last';
                            }else{
                                liClass = '';
                            }
                            htmlStr += '<li class="'+ liClass +'">'+
                                '<div class="ver-info">'+
                                '<a class="" href="#"><span class="ver">V'+ it.ver +'</span>/<span class="size">'+ it.size +'</span></a>'+
                                '</div>'+
                                '<div class="detail">'+
                                '<div class="update-log">'+
                                '<a href="'+ it.url +'" class="download btn">下载</a>'+
                                '<div class="log">'+ it.info +
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</li>';

                        }

                        $loaderHistory.html(htmlStr);

                    }
                }
            });

        }

        //videos and codes
        var $vCourse = $('.v-course');
        var chapterArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二一','二二','二三','二四','二五','二六','二七','二八','二九','三十','三一','三二','三三','三四','三五','三六','三七','三八','三九','四十','四一','四二','四三','四四','四五','四六','四七','四八','四九','五十','五一','五二','五三','五四','五五','五六','五七','五八','五九','六十','六一','六二','六三','六四','六五','六六','六七','六八','六九','六十','七一','七二','七三','七四','七五','七六','七七','七八','七九'];
        var typeLen = [6,6,6],getLen = 5;
        if($vCourse.length){
            $.ajax({
                url: 'http://117.78.3.250/getTypeVideo',
                // url: 'http://192.168.13.183:8081/getTypeVideo',
                dataType: 'jsonp',
                success: function(data){
                    if(data.status){
                        var result = data.body,
                            maxLen = 6;
                        for (var j = 0; j < result.length; j++) {
                            var htmlStr = '<div class="veo-classify">';
                            var dataLen = result[j].length;
                            maxLen = dataLen < maxLen ? dataLen : maxLen;
                            for (var i = 0; i < maxLen; i++) {
                                if (i == 0) {
                                    htmlStr += '<div class="veo-header">'+
                                        '<img class="pic" src="'+result[j][i].icon+'">'+
                                        '<div class="info">'+
                                        '<h5 class="veo-title">'+result[j][i].title+'</h5>'+
                                        '<p class="brief">'+result[j][i].brief+'</p>'+
                                        '</div>'+
                                        '</div>'+
                                        '<ul class="veo-list">';
                                }else{
                                    htmlStr += '<li>'+
                                        '<span class="float-l">第'+chapterArr[i-1]+'节</span>'+
                                        '<span class="float-l veo-line"></span>'+
                                        '<a href="'+result[j][i].url+'" class="float-l veo-name">'+result[j][i].title+'</a>'+
                                        '</li>';
                                };
                            };
                            var len = result[j].length;
                            if (len > 6) {
                                htmlStr += '<li class="veo-more">'+
                                    '<span class="get-more" data-type="'+result[j][0].type+'">'+
                                    '<i class="icon arr-b"></i>'+
                                    '<span class="arr-name">更多</span>'+
                                    '</span>'+
                                    '</li>';
                            };

                            htmlStr += '</ul></div>';
                            if (j%2) {
                                $vCourse.find('.odd').append(htmlStr);
                            }else{
                                $vCourse.find('.even').append(htmlStr);
                            };

                        };
                        $('.v-course .get-more').click(function(){
                            var $this = $(this),
                                type = $this.attr('data-type'),
                                ishide = $this.attr('data-hide'),
                                start = typeLen[type];
                            if (ishide == '1') {
                                $this.parents('.veo-list').find('.remove').remove();
                                $this.attr('data-hide',0)
                                $this.find('.icon').removeClass('arr-t');
                                $this.find('.arr-name').text('更多');
                                typeLen[type] = 6;
                                return;
                            };
                            $.ajax({
                                url: 'http://117.78.3.250/getVideo?length='+getLen+'&type='+type+'&start='+start,
                                // url: 'http://192.168.13.183:8081/getVideo?length='+getLen+'&type='+type+'&start='+start,
                                dataType: 'jsonp',
                                success: function(data){
                                    if(data.status){
                                        var result = data.body,liStr = '',count = data.num;

                                        for (var i = 0; i < result.length; i++) {
                                            liStr += '<li class="remove">'+
                                                '<span class="float-l">第'+chapterArr[typeLen[type]-1]+'节</span>'+
                                                '<span class="float-l veo-line"></span>'+
                                                '<a href="'+result[i].url+'" class="float-l veo-name">'+result[i].title+'</a>'+
                                                '</li>';
                                            typeLen[type] = typeLen[type]+1;
                                            if (typeLen[type] == count) {
                                                $this.attr('data-hide',1)
                                                $this.find('.icon').addClass('arr-t');
                                                $this.find('.arr-name').text('收起');

                                            };
                                        };
                                        $this.parents('.veo-more').before(liStr);

                                    }else{
                                        alert(data.msg)
                                    }
                                }
                            })
                        })

                    }
                }
            });

        }

        var $expCode = $('#example-code');
        if($expCode.length){
            $.ajax({
                url: 'http://117.78.3.250/getCaseVideo?length=100',
                // url: 'http://192.168.13.183:81/getCaseVideo?length=100',
                dataType: 'jsonp',
                success: function(data){
                    if(data.status){
                        var result = data.body;
                        var top1Obj = result.top1[0];
                        var top2Obj = result.top2[0];
                        var list = result.list;

                        var i = 0, len = list.length;

                        var htmlStr = '<div class="apidemo col-sm-12">'+
                            '<div class="pull-left">'+
                            '<img src="'+ top1Obj.icon +'" class="icon">'+
                            '<div class="img-right">'+
                            '<a class="cus-title" href="'+top1Obj.bbs_url+'" target="_blank" title="'+top1Obj.name+'">'+ top1Obj.name +'</a>'+
                            '<h2 class="sname" title="'+top1Obj.provider+'">提供者：'+ top1Obj.provider +'</h2>'+
                            '<a href="'+ top1Obj.case_url +'">下载('+ top1Obj.size +')</a>'+
                            '</div>'+
                            '</div>'+
                            '<div class="pull-left right">'+
                            '<p class="intro">'+ top1Obj.info +'</p>'+
                            '</div>'+
                            '</div>';
                        // delete later start
                        htmlStr += '<div class="apidemo col-sm-12">'+
                            '<div class="pull-left">'+
                            '<img src="'+ top2Obj.icon +'" class="icon">'+
                            '<div class="img-right">'+
                            '<a class="cus-title" href="'+top2Obj.bbs_url+'" target="_blank" title="'+top2Obj.name+'">'+ top2Obj.name +'</a>'+
                            '<h2 class="sname" title="'+top2Obj.provider+'">提供者：'+ top2Obj.provider +'</h2>'+
                            '<a href="'+ top2Obj.case_url +'">下载('+ top2Obj.size +')</a>'+
                            '</div>'+
                            '</div>'+
                            '<div class="pull-left right">'+
                            '<p class="intro">'+ top2Obj.info +'</p>'+
                            '</div>'+
                            '</div>';
                        // delete later end
                        for(i; i<len; i++){
                            var it = list[i];
                            htmlStr += '';
                            htmlStr += '<div class="custom-app col-sm-6">'+
                                '<div class="pull-left">'+
                                '<img src="'+ it.icon +'" class="icon" />'+
                                '<div class="img-right">'+
                                '<a class="cus-title" href="'+it.bbs_url+'" target="_blank" title="'+it.name+'">'+ it.name +'</a>'+
                                '<h2 class="sname" title="'+it.provider+'">提供者：'+ it.provider +'</h2>'+
                                '<a href="'+ it.case_url +'">下载('+ it.size +')</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                        }
                        $expCode.html(htmlStr);

                    }
                }
            });
        }
        var $layoutBtn = $('#layout-btn');
        var $navbarText = $('.navbar-text');
        $layoutBtn.on('click', function(event) {
            $layoutBtn.toggleClass('close');
            $navbarText.toggleClass('active');
            event.preventDefault();
        });

        //首页播放视频
        if($('#gplayer').length){
            var myvideo;
            $('#guide').on('click', 'a, .guide-poster', function(){
                var url = $(this).attr('data-url');
                var $gplayer = $('#gplayer .wrap');
                if(!myvideo) {
                    var htmlStr = ''+
                        '<video id="h5video" class="video-js vjs-default-skin vjs-big-play-centered"'+
                        'controls preload="none" width="800" height="600" poster="" data-setup="{}">'+
                        '<source src="'+ url +'" type="video/mp4" />'+
                        '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>'+
                        '</video>';

                    $gplayer.html(htmlStr);
                    videojs("h5video", {}, function () {
                        myvideo = this;
                        setTimeout(function () {
                            myvideo && myvideo.play();
                        }, 300);
                    });
                }else{
                    myvideo && myvideo.play();
                    $(".modalx .vjs-control-bar").css("visibility","visible");
                }
                $(".modalx").css("visibility","visible");

                return false;
            });
            $('#gplayer').on("click", '.close', function(){
                if(myvideo) {
                    myvideo.pause();
                    myvideo.dispose();
                    myvideo=null;
                }
                $(".modalx .vjs-control-bar").css("visibility","hidden");
                $(".modalx").css("visibility","hidden");

            });
        }
    });
})(jQuery, hljs);
