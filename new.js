function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    if(typeof(callback)=='function'){
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}
function dynamicLoadCss(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}
if (typeof jQuery != 'undefined') {

}
else
{
dynamicLoadJs("https://{$data.template_domain}{$data.template}/jquery.min.js",function(){});
}

dynamicLoadCss('https://{$data.template_domain}{$data.template}/form_template.css')

var form = (function() {
'use strict';

var Form = function(params) {

    var p = this;
    //参数定义
    p.params = {
        title: '{$data.form}',
        btnText: '确定',
        btnAction: null,
        btnCancelText: '取消',
        btnCancelAction: null,
        mask:true,
        headerColor:"#33AAE2",
        position:"{$data.position2}",
        direction:"{$data.position1}",          
        formContent:[{$data.field1}],
        formContent_en:[{$data.field2}],
        formContent_de:[{$data.field3}],
        formContent_to:[{$data.field4}],
        formKey:["{$data.key}"],
    };

    for (var param in params) {
        p.params[param] = params[param];

    }

    var getAlertId = function() {
        if (!p.id || p.id == '') {
            return 'alert_' + Math.floor(Math.random() * (new Date()).getTime());
        } else {
            return p.id;
        }
    };

    p.id = getAlertId();

    var dobberIcon = function(){
        var dobberHtml =' <form><input type="hidden" name="ext_key_key" value="'+p.params.formKey+'"/><input type="hidden" name="ext_key_title" value="'+p.params.title+'"/><div class="button_icon" id="dobber_'+p.id+'">'+
                        '<i class="iconfont icon-CRM-icofont-141" style="font-size: 40px"></i>'+
                        '<p>{$data.button}</p>'+
                    '</div>'
                     
        return dobberHtml
    }

    var inputList = function(){
        var inputHtml = ''
        for(var i = 0 ; i < p.params.formContent.length;i++){
            if(p.params.formContent_de[i] == 1){
                inputHtml = 
                inputHtml+
                 '<li style="float: inherit">'+
                    '<label style="width:75px;display: block;margin-bottom: 5px;color:#333"> <span style="color:red">*</span>'+p.params.formContent[i]+'</label>'+
                    '<input type="text" id="input_'+i+'" required="required" placeholder="" name="ext_key_'+p.params.formContent_en[i]+'"  style="color:black;width:243px;height: 25px;padding-left: 5px;">'+
                    '<p class="errpr_tips" id="error_tips_'+p.params.formContent_en[i]+'"></p>'+
                '</li>'
            }
            else{
            inputHtml = 
            inputHtml+
             '<li style="float: inherit">'+
                '<label style="width:75px;display: block;margin-bottom: 5px;color:#333"> '+p.params.formContent[i]+'</label>'+
                '<input type="text" id="input_'+i+'"  placeholder="" name="ext_key_'+p.params.formContent_en[i]+'"  style="color:black;width:243px;height: 30px;padding-left: 5px;float: ">'+
                '<p class="errpr_tips" id="error_tips_'+p.params.formContent_en[i]+'"></p>'+
            '</li>'
            }  
           
        }
        console.log(inputHtml)
        if(p.params.formContent_to == 1){
        inputHtml = inputHtml+
                        '<div style="padding:15px 20px">'+
                            '<label style="display: block;margin-bottom: 5px;color: #333"> <span style="color:red">*</span>简单描述</label>'+
                            '<textarea name="ext_key_content" required="required" rows="5" style="width: 99%;display: block;color:black;"></textarea>'+
                            '<p id="error_tips_content"></p>'+
                          '</div>'+
                          '<div style="margin:10px 20px 25px;text-align: center">'+
                            '<button type="button" id="btn-success'+p.id+'" style="line-height:17px;border:none;background: #33AAE2;color: #fff;padding:7px 50px;border-radius: 5px;cursor:pointer;z-index:999">提交</button>'+
                          '</div>'
        }
        else if(p.params.formContent_to == 2){
                    inputHtml = inputHtml+
                        '<div style="padding:15px 20px">'+
                            '<label style="displa y: block;margin-bottom: 5px;color: #333">简单描述</label>'+
                            '<textarea name="ext_key_content" rows="5" style="width: 99%;display: block;color:black;"></textarea>'+
                            '<p id="error_tips_content"></p>'+
                          '</div>'+
                          '<div style="margin:10px 20px 25px;text-align: center">'+
                            '<button type="button" id="btn-success'+p.id+'" style="line-height:17px;border:none;background: #33AAE2;color: #fff;padding:7px 50px;border-radius: 5px;cursor:pointer;z-index:999">提交</button>'+
                          '</div>'
        }
        else{
        inputHtml = inputHtml+
                                      '<div style="margin:10px 20px 25px;text-align: center">'+
                            '<button type="button" id="btn-success'+p.id+'" style="line-height:17px;border:none;background: #33AAE2;color: #fff;padding:7px 50px;border-radius: 5px;cursor:pointer;z-index:999;line-height: 1;">提交</button>'+
                            '<span class="submit_info" id="submit_info"></span>'
                          '</div>'
        }
        console.log(inputHtml)
        return inputHtml
    }

    var formTemplateHtml = function() {
        var formHtml = ''
        formHtml = 
            '<div class="form_mask" style="position: fixed;z-index:1000;top:0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,.4);">'+
                '<div class="form_container" style="position: absolute;background: #fff;font-size: 14px;border-radius: 5px;" id="'+p.id+'">'+
                  '<div class="form_header" style="padding:25px 20px 10px;background: #fff">'+
                    '<span style="font-size: 18px;color:#333">'+p.params.title+'</span> <span id="close_icon_'+p.id+'" style="cursor:pointer;position:absolute;top:15px;right:20px;font-size: 25px;color: #999">×</span>'+
                  '</div>'+
                  '<ul style="padding:0px;margin:0 0 15px 0;color: #999;width:550px" class="clearfix">'+
                    inputList()
                  '</ul>'+
                  
                '</div>'+
              '</div></form>'

        return formHtml;
    };

    //提交成功
    var submitSuccessHtml = function(){
        var successHtml = '';
        successHtml = 
            '  <div id="submit_success" style="position: absolute;background: #fff;font-size: 14px;border-radius: 5px;" >'+
                  '<div style="position: relative;padding:0 40px">'+
                    '<span id="success_close_icon" style="position: absolute;top:5px;right:15px;font-size: 25px;color: #DEDEDE">×</span>'+
                    '<p style="margin: 0;padding:30px 0;text-align: center;"><span style="color:#33AAE2;font-size: 20px;vertical-align: middle;" class="iconfont icon-CRM-icofont-141"></span> <span>提交成功</span> </p>'+
                    '<p style="margin:0 0 30px 0;color: #999;font-size: 13px">您的信息已提交，24小时内会联系您</p>'+
                  '</div>'+
                 
              '</div>'

        return successHtml
    }

    var errorAlert = function(){
        var errorHtml = '<div id="error_alert" style="font-size: 13px;color: red;background: #fff;padding:3px 10px;position: absolute;z-index:1001"></div>'
        return errorHtml
    }
    p.showErrorAlert = function(){
        var html = errorAlert()
        $('body').prepend(html);
        var objHeight = getAutoHeight($('#error_alert'));
        var objWidth = getAutoWidth($('#error_alert'));
        $('#error_alert').css('top', objHeight);
        $('#error_alert').css('left', objWidth);
    }

    p.showSuccessHtml = function(){
        var success = submitSuccessHtml()
        $('#'+p.id).hide();
        $('.form_mask').prepend(success);
        var objHeight = getAutoHeight($('#submit_success'));
        var objWidth = getAutoWidth($('#submit_success'))
        $('#submit_success').css({'top':objHeight,'left':objWidth});

        setTimeout(function(){
             fromDestroy()
        }, 1500)
    }

    p.showForm = function(){
        var htmlStr = dobberIcon();
        $('body').prepend(htmlStr);
        var objHeight = getAutoHeight($('#dobber_'+p.id));
        if(p.params.position == "bottom"){
            $('#dobber_'+p.id).css("bottom","50px")
        }else if(p.params.position == "center"){
            $('#dobber_'+p.id).css("bottom",objHeight)
        }
        if(p.params.direction == "left"){
            $('#dobber_'+p.id).css("left","30px")
        }else if(p.params.direction == "right"){
            $('#dobber_'+p.id).css("right","30px")
        }
        $('#dobber_'+p.id).show();
        $('#dobber_'+p.id).click(function(){
            showform()
         })
    }

    var getAutoHeight = function(jqdom) {
      var windowHeight = $(window).height();
      var targetHeight = jqdom.outerHeight();
        return (windowHeight-targetHeight)/2+'px';
    };
    var getAutoWidth = function(jqdom) {
      var windowWidth = $(window).width();
      var targetWidth = jqdom.outerWidth();
        return (windowWidth-targetWidth)/2+'px';
    };
    var showform = function () {
        var htmlStr = formTemplateHtml();
        $('body').prepend(htmlStr);
        $('#'+p.id).show();
        var objHeight = getAutoHeight($('#'+p.id));
        var objWidth = getAutoWidth($('#'+p.id))
        $('#'+p.id ).css('top', objHeight);
        $('#'+p.id ).css('left', objWidth);
        $('#btn-success'+p.id).click(function() {
            console.log('success')
            p.params.btnAction();
        });
       
        $('#close_icon_'+p.id).click(function() {
            console.log('close')
            fromDestroy()
        });
    };

    var fromDestroy = function () {
        $('#'+p.id).parent().remove();
        $('#'+p.id).remove();
    };
};

return Form;
})();

var Form = new form({
btnAction:function(){
  var url= "https://{$data.template_domain}/Api/OpenSvrApi/add_opportunity";
  var name= $('input[name="ext_key_name"]').val();
  var name_required = $('input[name="ext_key_name"]').attr('required');
  if(name_required == "required"){
    if(name == ""){
        <!-- Form.showErrorAlert(); -->
        $('#error_tips_name').html("联系人不能为空");
        $('#error_tips_name').css("visibility","visible")
        setTimeout(function(){
             $('#error_tips_name').css("visibility","hidden");
            $('#error_tips_name').html("");
        }, 2000)
        return false;
    }
    else{
      var han_name = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (!han_name.test(name)) {
            <!-- Form.showErrorAlert(); -->
            $('#error_tips_name').html("请正确输入姓名");
            $('#error_tips_name').css("visibility","visible")
            setTimeout(function(){
                $('#error_tips_name').css("visibility","hidden");
                $('#error_tips_name').html("");
            }, 2000)
            return false;
      }; 
    }
  }

  var phone= $('input[name="ext_key_phone"]').val();
  var phone_required = $('input[name="ext_key_phone"]').attr('required');
  if(phone_required == "required"){
    if(phone == ""){
        <!-- Form.showErrorAlert(); -->
        $('#error_tips_phone').html("手机号不能为空");
        $('#error_tips_phone').css("visibility","visible")
        setTimeout(function(){
             $('#error_tips_phone').css("visibility","hidden")

            $('#error_tips_phone').html("");
        }, 2000)            
        return false;
    }
    else{
      var han_phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!han_phone.test(phone)) {
            <!-- Form.showErrorAlert(); -->
            $('#error_tips_phone').html("请正确输入手机号"); 
             $('#error_tips_phone').css("visibility","visible")
            setTimeout(function(){
                $('#error_tips_phone').css("visibility","hidden")

                 $('#error_tips_phone').html("");
            }, 2000)
            return false;
      }; 
    }
  }
  var company= $('input[name="ext_key_company"]').val();
  var company_required = $('input[name="ext_key_company"]').attr('required');
  if(company_required == "required"){
    if(company == ""){
        <!-- Form.showErrorAlert(); -->
        $('#error_tips_company').html("公司不能为空");   
        $('#error_tips_company').css("visibility","visible")
        setTimeout(function(){
                $('#error_tips_company').css("visibility","hidden");
                 $('#error_tips_company').html("")
        }, 2000)
        return false;
    }
    else{
      var han_company = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (!han_company.test(company)) {
            <!-- Form.showErrorAlert(); -->
            $('#error_tips_company').html("请正确输入公司名称");
            $('#error_tips_company').css("visibility","visible")
            setTimeout(function(){
                $('#error_tips_company').css("visibility","hidden");
                 $('#error_tips_company').html("");
            }, 2000)
            return false;
      }; 
    }
  }
  var email= $('input[name="ext_key_email"]').val();
  var email_required = $('input[name="ext_key_email"]').attr('required');
  if(email_required == "required"){
    if(email == ""){
        <!-- Form.showErrorAlert(); -->
        $('#error_tips_email').html("邮箱不能为空");
        $('#error_tips_email').css("visibility","visible")
        setTimeout(function(){
                $('#error_tips_email').css("visibility","hidden")
                 $('#error_tips_email').html("");
        }, 2000)
        return false;
    }
    else{
     <!-- var han_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;-->
      var han_email = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (!han_email.test(email)) {
            <!-- Form.showErrorAlert(); -->
            $('#error_tips_email').html("请正确输入邮箱地址");
             $('#error_tips_email').css("visibility","visible")
            setTimeout(function(){
                $('#error_tips_email').css("visibility","hidden");
                 $('#error_tips_email').html("");
            }, 2000)
            return false;
      }; 
    }
  }
  var content= $('textarea[name="ext_key_content"]').val();
  var content_required = $('textarea[name="ext_key_content"]').attr('required');
  if(content_required == "required"){
    if(content == ""){
        <!-- Form.showErrorAlert(); -->
        $('#error_tips_content').html("描述不能为空");
        $('#error_tips_content').css("visibility","visible")
        setTimeout(function(){
                $('#error_tips_content').css("visibility","hidden");
                  $('#error_tips_content').html("");
        }, 2000)
        return false;
    }
  }
  var key= $('input[name="ext_key_key"]').val();
  var title= $('input[name="ext_key_title"]').val();
  $.post(url,{name:name,phone:phone,company:company,email:email,content:content,key:key,title:title},function(data){
    if(data.data == '0'){
        Form.showSuccessHtml();
    }else{
        <!-- Form.showErrorAlert(); -->
        $('#submit_info').html(data.info);
        setTimeout(function(){
                $('#submit_info').remove();
        }, 1500)

    }

  },'json');

}
})

Form.showForm()
