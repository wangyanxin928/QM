/**
 * the main entry point
 */
require.config({
    baseUrl: "js",
    paths: {
        common: 'common',
        pages: 'pages',
        tpl: '../tpl',

        //第三方js
        // jQuery
        jquery: 'lib/jquery.min',
        jquerymigrate: 'lib/jquery-migrate.min',



        //text
        text: 'lib/text',
        // underscore
        underscore: 'lib/underscore-1.6.0.min',
        understr: 'lib/underscore.string',

        // Backbone
        backbone: 'lib/backbone-1.1.2.min',

        app: "lib/app",

        // BootStrap
        bootstrap: 'plugins/bootstrap/js/bootstrap.min',

        layout: "plugins/layout/scripts/layout",
        metronic: "plugins/layout/scripts/metronic",
        quicksidebar: "plugins/layout/scripts/quick-sidebar",
        jqslimscroll: 'plugins/jquery-slimscroll/jquery.slimscroll.min',
        bHoverDropdown:'plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min',


        //---------------------------组件---------------------------------------

        bootstrapdatepicker: 'plugins/bootstrap-datepicker/js/bootstrap-datepicker.min',
        'daterangepicker_cn': 'plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',

        //单选多选
        icheck: 'plugins/icheck/icheck.min',
        //下拉选择
        bootstrapselect: 'plugins/bootstrap-select/bootstrap-select.min',
        //提示信息
        toastr: 'plugins/bootstrap-toastr/toastr.min',
        //模态框弹层
        modalmanager: 'plugins/bootstrap-modal/js/bootstrap-modalmanager',
        modal: 'plugins/bootstrap-modal/js/bootstrap-modal',
        //进度条
        pace: 'plugins/pace/pace.min',
        //表单验证
        validate: 'plugins/jquery-validation/js/jquery.validate.min',
        //开关选择器
        'bootstrap-switch': 'plugins/bootstrap-switch/js/bootstrap-switch.min',

        //图表相关插件  20170713 add by 文霞
        echarts:'plugins/echarts/echarts-3.6.2',
        bmap:'plugins/echarts/bmap.min',
        macarons:'plugins/echarts/macarons',
        myDrawChart:'plugins/MyDrawChart',
        fairmindChart:'plugins/MyDrawChart1',

        //echarts--map
        'echarts-map-China':'plugins/echarts/map/china'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        jquerymigrate: {
            deps: ['jquery']
        },
        jqslimscroll: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        },
        app: {
            deps: ['jqslimscroll']
        },
        layout: {
            deps: ['app']
        },
        daterangepicker_cn: {
            deps: ['bootstrapdatepicker']
        },
        toastr: {
            deps: ['jquery']
        },
        myDrawChart1:{
            deps: ['echarts','macarons']
        }
    }
});
require(['common/util'], function () {

    require(['backbone', 'jquery', 'underscore', 'jquerymigrate', 'bootstrap', 'jqslimscroll', 'layout', 'metronic', 'quicksidebar'],
        function (Backbone, $, _) {
            //初始化所有组件依赖
            require([ 'toastr', 'icheck', 'bootstrapselect', 'modalmanager', 'modal', 'pace', 'validate',
                'bootstrap-switch','bHoverDropdown'], function (Toastr) {
                require(['common/router','common/basePublicUtil'], function (Router) {
                    BasePluginsUTIL.handleInit();//用于初始化isRTL变量(从右到左显示)，下面初始化datepicker时用到
                    BasePluginsUTIL.handleOnResize();//在窗口大小调整之后初始化布局
                    BasePluginsUTIL.initValidate();//初始化所有验证规则
                    BasePluginsUTIL.initMenu();//初始化首页左侧菜单事件
//                  //初始化弹出提示
                    BasePluginsUTIL.toastr = Toastr;
                    //初始化进度条
                    /*
                     Pace.start：开始显示进度条，如果你不是使用AMD或者Browserify来加载模块的话，这个会默认执行。
                     Pace.restart：进度条重新加载以及显示。
                     Pace.stop：隐藏进度条以及停止加载。
                     Pace.track：监测一个或者多个请求任务。
                     Pace.ignore：忽略一个或者多个请求任务。*/
					Pace.start();
                    Metronic.init(); // init metronic core components
                    Layout.init(); // init current layout
                    QuickSidebar.init(); // init quick sidebar

					BasePluginsUTIL.FC.router = new Router();
                    Backbone.history.start();
                    
                })
            })

        });
    // }
})