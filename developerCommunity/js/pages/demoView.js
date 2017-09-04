// ================================================================
//  author:文霞
//  createDate: 2016/09/06
//  description: 基础组件——表单验证
//  ===============================================================
define(function (require) {
    "use strict";
    var tpl = require('text!tpl/demoTpl.html'),
        template = _.template(tpl), _this;
    var MyValidate = require('validate');
    require('bootstrapdatepicker');
    require('daterangepicker_cn');
    //'bootstrapdatepicker', 'daterangepicker_cn'
    return Backbone.View.extend({
      	className:"page-content",//如果不添加会document中多一级div
        initialize: function () {
            _this = this;
            this.render();
        },
        render: function () {
            this.$el.html(template(this.model));
            return this;
        },
        afterRender:function(){
        	this.validator=this.validateForm();
            //如要初始化当前View中的全部复选按钮，使用下面的代码
            BasePluginsUTIL.initCheck();
            //如要初始化当前View中的全部单选按钮，使用下面的代码
            BasePluginsUTIL.initCheck();
            //如要初始化当前View中的全部select，使用下面的代码
            BasePluginsUTIL.initSelect();
            //如要初始化当前View中的全部DatePicker，使用下面的代码
            BasePluginsUTIL.initDatePicker();
        },
        events: {
            "click #btnSaveData": "saveFormData",
        },
        saveFormData:function(){
        	var me=this;
        	//执行验证
            if (!$("#myForm1").valid()) {
            	me.validator.focusInvalid();
                return;
            }
            BasePluginsUTIL.toastrAlert('success', '提示', "验证成功，可以提交表单了");
        },
        //验证表单
        validateForm: function () {
            var me = this;
            var formId = "myForm1";
            var opration = {
                rules: {
                    XH: {
                        required: true,
                        stringCheck: true,
                        minlength: 2,
                        maxlength: 50
                    },
                    XM: {
                        required: true,
                        stringCheck: true,
                        minlength: 1,
                        maxlength: 20
                    },
                    XMPY: {
                        required: true,
                        isEnglish: true,
                        minlength: 2,
                        maxlength: 30
                    },
                    CSDM: {
                        required: true,
                        stringCheck: true,
                        minlength: 2,
                        maxlength: 50
                    },
                    JG: {
                        required: true,
                        stringCheck: true
                    },
                    GJDQM: {
                        required: true,
                        stringCheck: true
                    },
                    XZZ: {
                        required: true,
                        stringCheck: true
                    },
                    HKSZD: {
                        required: true,
                        stringCheck: true
                    },
                    TXDZ:{
                        required:true,
                        stringCheck:true
                    },                    
                    YZBM:{
                        required:true,
                        isZipCode:true
                    }
                },
                messages: {
                   XH: {
                        required: "请输入学号",
                        isRightfulString: "只能输入字母和数字等字符",
                        minlength: "学号最少2个字",
                        maxlength: "学号最多50个字"
                    },
                    XM: {
                        required: "请输入姓名",
                        stringCheck: "只能输入中文英文和下划线等字符",
                        minlength: "姓名最少2个字",
                        maxlength: "姓名最多50个字"
                    },
                    XMPY: {
                        required: "请输入姓名拼音",
                        isEnglish: "只能输入英文",
                        minlength: "姓名拼音最少2个字",
                        maxlength: "姓名拼音最多50个字"
                    },
                    CSDM: {
                        required: "请输入出生地",
                        stringCheck: "只能输入中文英文和下划线等字符",
                        minlength: "出生地最少2个字",
                        maxlength: "出生地最多50个字"
                    },
                    JG: {
                        required: "请输入籍贯",
                        minlength: "籍贯最少2个字",
                        maxlength: "籍贯最多50个字"
                    },
                    GJDQM: {
                        required: "请输入国籍/地区",
                        minlength: "国籍/地区最少2个字",
                        maxlength: "国籍/地区最多50个字"
                    },
                    XZZ: {
                        required: "请输入现住址",
                        minlength: "现住址最少2个字",
                        maxlength: "现住址最多50个字"
                    },
                    HKSZD: {
                        required: "请输入户口所在地",
                       	minlength: "户口所在地最少2个字",
                        maxlength: "户口所在地最多50个字"
                    },
                    TXDZ:{
                        required:"请输入通信地址",
                        stringCheck:"只能输入中文英文和下划线等字符"
                    },
                    YZBM:{
                        required:"请输入邮政编码",
                        isZipCode:"请正确填写您的邮政编码"
                    }
                }
            };
            return BasePluginsUTIL.ValidateForm(me, formId, opration);
        },
    });
});