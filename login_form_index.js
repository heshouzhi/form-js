function Form(objs) {
  var that = this;
  that.objs = objs;

  var iconButton = objs.iconButton
  var position = ''
  var icon = ''
  if(iconButton) {
    position = iconButton.position /* bottom图标在底部， center在中间 */
    icon = iconButton.icon
  }


  var bottom = '50px'
  var getAlertId = function() {
    if (!that.id || that.id == '') {
        return  Math.floor(Math.random() * (new Date()).getTime());
    } else {
        return that.id;
    }
  };

  that.id = getAlertId();

  var creatIconButton = function() {
    var hover = iconButton.form
    var node = "<div id='dobber_"+that.id+"' class='click_show_icon'><i class='iconfont "+icon+"'></i><span class='click_show_icon_hover'>"+hover+"</span></div>"
    return node;
  };

  var creatFormList = function() {
    var list = objs.formList;
    var background = 'rgba(0,0,0,.4)'
    if(IsPC()) {
      background = 'none'
    }
    var close = ''
    var style = ''
    var head = "<div class='form-js-head-wrap'><p class='form-js-head-title'>体验登记</p><p class='form-js-head-describe'>填写信息并描述需求，我们会尽快与您联系</p></div>"
    if(iconButton){
      close = "<i class='iconfont iconcrm-pc-42 mobile_close_button'></i>"
    } else {
      style = 'width: 100%; margin-right: 0'
    }
    var node = "<div class='form_mask'>"+
    "<div id='form_list_"+that.id+"' class='form-js-from-wrap'><div class='form-js-from-wrap-triangle-right-center'></div><div class='form-js-from-wrap-triangle-right-bottom'></div>"+head+close+"<div>"
    var button = "<div id='submit_"+that.id+"' class='save-and-submit-button-wrap'><div class='save-and-submit-button save-and-submit-button-style'>保存并提交</div><span class='submit_info' id='submit_info'></span></div><div class='bottom_tip'>本页面由 <a href='www.baidu.com'>赢在销客</a> 提供技术支持  </div></div>"
    for(var i = 0; i < list.length; i++) {
      if(list[i].required) {
        if(list[i].type == 'area') {
          node = node + "<div style='"+style+"' class='form-js-from-list form-js-from-list-row'>"+
            "<span class='form-js-required-true'>*</span>"+
            "<span class='form-js-label'>"+list[i].label+"</span>"+
            "<span class='form-js-required'></span>"+
            "<input type='text' required='required' placeholder='"+list[i].placeholder+"' /></div>"
        } else {
          node = node + "<div style='"+style+"' class='form-js-from-list'>"+
          "<span class='form-js-required-true'>*</span>"+
          "<span class='form-js-label'>"+list[i].label+"</span>"+
          "<span class='form-js-required'></span>"+
          "<input type='text' required='required' placeholder='"+list[i].placeholder+"' /></div>"
        }

      } else {
        if(list[i].type == 'area') {
          node = node + "<div style='"+style+"' class='form-js-from-list form-js-from-list-row'>"+
          "<span class='form-js-label'>"+list[i].label+"</span>"+
          "<span class='form-js-required'></span>"+
          "<input type='text' placeholder='"+list[i].placeholder+"' /></div>"
        } else {
          node = node + "<div style='"+style+"' class='form-js-from-list'>"+
            "<span class='form-js-label'>"+list[i].label+"</span>"+
            "<span class='form-js-required'></span>"+
            "<input type='text' placeholder='"+list[i].placeholder+"' /></div>"
        }

      }
    }
    node = node + "</div>"+button+"</div>"
   return node;
  };

  that.show = function() {
    if(iconButton) {
      var icon_node = creatIconButton()
      $('body').append(icon_node)
      if(position == 'center') {
        var windowHeight = $(window).height();
        bottom = (windowHeight-50)/2+'px'
      }
      $('#dobber_'+that.id).css({'bottom': bottom, 'background': iconButton.background})
      $('#dobber_'+that.id).on('click', function(){
        var length = $('.form-js-from-wrap').length
        if(length>0) {
          close()
        } else {
          creatForm()
        }
      })
      return;
    }
    creatForm()

  };

  that.submitForm = function() {
    var flage = false
    $('.form-js-required').hide()
    $('.form-js-label').hide()
    var url= "https://{$data.template_domain}/Api/OpenSvrApi/add_opportunity";
    $('.form-js-from-list').each(function(index, item) {
      var value = $(item).find('input').val()
      var required = $(item).find('input').attr('required') == 'required'
      var label =  $(item).find('.form-js-label').html()

      var han_name = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      var han_phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      var han_company = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      var han_email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if(value) {
        if(label == '姓名') {
          if(!han_name.test(value)) {
            flage = true
            $(item).find('.form-js-required').html('请正确输入'+label)
            $(item).find('.form-js-required').show()
          }
        } else if(label == '手机号') {
          if(!han_phone.test(value)) {
            flage = true
            $(item).find('.form-js-required').html('请正确输入'+label)
            $(item).find('.form-js-required').show()
          }
        } else if(label == '公司名称') {
          if(!han_company.test(value)) {
            flage = true
            $(item).find('.form-js-required').html('请正确输入'+label)
            $(item).find('.form-js-required').show()
          }
        } else if(label == '邮箱') {
          if(!han_email.test(value)) {
            flage = true
            $(item).find('.form-js-required').html('请正确输入'+label)
            $(item).find('.form-js-required').show()
          }
        }
      } else {
        if(required){
          flage = true
          $(item).find('.form-js-required').html('请输入'+label)
          $(item).find('.form-js-required').show()
        }
      }
    })

    if(flage) {
      return false
    }

    $.post(url,{name:name,phone:phone,company:company,email:email,content:content,key:key,title:title},function(data){
      if(data.data == '0'){
        that.successHtml()
      }else{
          $('#submit_info').html(data.info);
          setTimeout(function(){
                  $('#submit_info').remove();
          }, 1500)

      }

    },'json');
  }

  that.successHtml = function() {
    var success = showSuccessHtml()
        $('#form_list_'+that.id).hide();
        $('.form_mask').prepend(success);
        var objHeight = getAutoHeight($('#submit_success'));
        var objWidth = getAutoWidth($('#submit_success'))
        $('#submit_success').css({'top':objHeight,'left':objWidth});

        setTimeout(function(){
          $('.form_mask').remove()
        }, 1500)
  }

  var showSuccessHtml = function() {
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

  var creatForm = function() {
    var form_node = creatFormList()
    var media_width = window.innerWidth
    $('body').append(form_node)
    if(iconButton) {
      $('#dobber_'+that.id).find('i').removeClass('iconcrm-pc-41').addClass('iconcrm-pc-42')
      if(position == 'center') {
        bottom = getAutoHeight($('#form_list_'+that.id))
        var center_bottom = getAutoHeight($('.form-js-from-wrap-triangle-right-center'))
        $('.form-js-from-wrap-triangle-right-bottom').css('display', 'none')
        $('.form-js-from-wrap-triangle-right-center').css('bottom', center_bottom)
        $('#form_list_'+that.id).css({'bottom': bottom, left: 'initial', right: '100px', marginLeft: '0'})
      } else {
        $('.form-js-from-wrap-triangle-right-center').css('display', 'none')
        $('.form-js-from-wrap-triangle-right-bottom').css('bottom', 0)
        $('#form_list_'+that.id).css({'bottom': bottom, left: 'initial', right: '100px', marginLeft: '0'})
      }
      if(media_width <= 767) {
        bottom = 0
        $('#form_list_'+that.id).css({'bottom': bottom, left: 0, right: 0, marginLeft: 0})
      }

    } else {
      bottom = 0
      if(media_width <= 767) {
        $('#form_list_'+that.id).css({'bottom': bottom, left: 0, right: 0, marginLeft: 0, top: 0})
      } else {
        $('#form_list_'+that.id).css({ left: '50%', right: '50%', marginLeft: '-275px', top: '60px', marginRight: '-275px'})
      }
      $('.form-js-from-wrap-triangle-right-center').hide()
      $('.form-js-from-wrap-triangle-right-bottom').hide()

    }



    $('.form-js-from-list input').on('focus', function(){
      $('.form-js-from-list').removeClass('form-js-from-list-focus')
      $(this).parent().addClass('form-js-from-list-focus')
      $(this).parent().find('.form-js-required').hide()

    })

    $('.mobile_close_button').on('click', function() {
      close()
    })

    $('#submit_'+that.id).on('click', function() {
      that.submitForm()
    })
  }

  var close = function() {
    $('#dobber_'+that.id).find('i').removeClass('iconcrm-pc-42').addClass('iconcrm-pc-41')
    $('.form_mask').remove()
  }


  var getAutoHeight = function(jqdom) {
    var windowHeight = $(window).height();
    var targetHeight = jqdom.outerHeight();
    console.log(windowHeight, targetHeightform_list_1360077833502)
    return (windowHeight-targetHeight)/2+'px';
  };

  var getAutoWidth = function(jqdom) {
    var windowWidth = $(window).width();
    var targetWidth = jqdom.outerWidth();
      return (windowWidth-targetWidth)/2+'px';
  };

  that.resize = function() {
    var media_width = window.innerWidth
    if(iconButton) {
      var position = objs.iconButton.position

      if(media_width >768) {
        if(position == 'bottom') {
          bottom = '50px'
          $('#form_list_'+that.id).css({'bottom': bottom, left: 'initial', right: '100px', marginLeft: '0'})
          $('.form-js-from-wrap-triangle-right-bottom').css('bottom', 0)
        } else {
          bottom = getAutoHeight($('#form_list_'+that.id))
          var icon_bottom = getAutoHeight($('#dobber_'+that.id))
          $('#dobber_'+that.id).css({'bottom': icon_bottom})
          $('#form_list_'+that.id).css({'bottom': bottom, left: '50%', right: '50%', marginLeft: '-275px'})
        }
      } else {
        bottom = 0
        $('#form_list_'+that.id).css({'bottom': bottom, left: 0, right: 0, marginLeft: 0})
      }
    } else {
      bottom = 0
      if(media_width <= 767) {
        $('#form_list_'+that.id).css({'bottom': bottom, left: 0, right: 0, marginLeft: 0, top: 0})
      } else {
        $('#form_list_'+that.id).css({ left: '50%', right: '50%', marginLeft: '-275px', top: '60px', marginRight: '-275px'})
      }
    }

  }

}
var crmForm = new Form({
  // iconButton: {
  //   hover_name: '体验等级',
  //   icon: 'iconcrm-pc-41',
  //   hover_icon: 'iconcrm-pc-42',
  //   background: '#33AAE2',
  //   position: 'center',
  //   form: '这是一个提醒'
  // },
  formList: [
    {required: true, type:  'text', label: '姓名', placeholder: '请输入您的真实姓名'},
    {required: true, type:  'text', label: '手机号', placeholder: '请输入您的手机号'},
    {required: true, type:  'text', label: '公司名称', placeholder: '请输入您的公司名称'},
    {required: false, type:  'text', label: '邮箱', placeholder: '请输入您的邮箱'},
    {required: false, type:  'area', label: '简单描述', placeholder: '请简单描述您的需求'},
  ]
})
crmForm.show()

function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
}
if(IsPC()) {
  window.addEventListener('resize',crmForm.resize);
}
