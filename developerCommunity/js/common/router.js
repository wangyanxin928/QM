// ================================================================
//  author:文霞
//  createDate: 2016/09/05
//  description: 统计图表组件 路由定义
//  ===============================================================
define(function (require) {
    "use strict";
    return Backbone.Router.extend({
        routes: {
            "": "demo"
        },
        goIndex: function (requirePath, operationType, currentId, jsonObject) {
            require([requirePath], function (view) {
//      		var viewObj=(!currentId)?{model: {_opType:operationType}}:{model: {_opType:operationType,_currentId:currentId}};
                var viewObj = {model: {_opType: operationType, _currentId: currentId, _jsonObject: jsonObject}};
                var _view = new view(viewObj);
                $('.page-content-wrapper').html(_view.$el);
                //设置中间内容区域屏幕的高度,中间内容区域层的class必须是page-content
                _view.afterRender();
            });
        },
        demo:function(){
            this.goIndex("pages/demoView");
        }
    })
})