$(document).ready(function(){
    //一键创建
    var $createCertForm = $('.create_cert_form');
    var $optionsCertInputs = $('.options_cert_inputs');
    var $iOSCertForm = $('.iOS-cert-form');
    var $AndroidCertForm = $('.Android-cert-form');

    //证书图片
    var $iosProv = $('.ios-prov');
    var $iosP12 = $('.ios-p12');
    var $andCert = $('.and-cert');
    var $iwatchProv = $('.iwatch-prov');
    //编辑安卓证书
    $('.btn-Android-edt').on('click', function(event) {
        $AndroidCertForm.find('.input-pkgname').removeAttr('disabled');
        // $AndroidCertForm.find('.input-text-cert').removeAttr('disabled');
        $AndroidCertForm.find('.upload-cert-labels').addClass('active');
        $AndroidCertForm.find('.upload-cert-btns').addClass('active');
    });
    $('.btn-Android-cancel').on('click', function(event) {
        $AndroidCertForm.find('.input-text-cert').each(function(index, el) {
            $(el).attr('disabled', 'disabled');
        });
        if(!$andCert.hasClass('has-cert')){
            $andCert.removeAttr('data-url');
            $andCert.addClass('active');
        }

        $AndroidCertForm.find('.upload-cert-labels').removeClass('active');
        $AndroidCertForm.find('.upload-cert-btns').removeClass('active');
        $('label.error').each(function(index, el) {
            $(el).remove();
        });
        event.preventDefault();
    });

    //编辑iOS证书
    $('.btn-iOS-edt').on('click', function(event) {
        $iOSCertForm.find('.input-text-cert').each(function(index, el) {
            $(el).removeAttr('disabled');
        });
        $iOSCertForm.find('.upload-cert-labels').addClass('active');
        $iOSCertForm.find('.upload-cert-btns').addClass('active');
    });
    var resetFrm = function(){
        $iOSCertForm.find('.input-text-cert').each(function(index, el) {
            $(el).attr('disabled', 'disabled');
        });
        if(!$iosProv.hasClass('has-cert')){
            $iosProv.find(':hidden').val('');
            $iosProv.addClass('active');
        }
        if(!$iosP12.hasClass('has-cert')){
            $iosP12.find(':hidden').val('');
            $iosP12.addClass('active');
        }
        $iOSCertForm.find('.upload-cert-labels').removeClass('active');
        $iOSCertForm.find('.upload-cert-btns').removeClass('active');
        $('label.error').each(function(index, el) {
            $(el).remove();
        });
    };
    $('.btn-iOS-cancel').on('click', function(event) {
        resetFrm();
        event.preventDefault();
    });
    //清除证书
    $('.btn-iOS-del').on('click', function(event){
        if(confirm(i18n.t('cadCert.delCertConfirm'))){
            $.post('/delIosCer', {appId: appid}, function(data){
                if(data.status){
                    resetFrm();
                    $iOSCertForm.find('.input-text-cert').val('');
                    $iOSCertForm.find('.cert-imgbox-inner :hidden').val('');
                    $iOSCertForm.find('.cert-imgbox-inner').addClass('active');
                }
            });
        }
        return false;
    });


})