layui.config({
    base : "../../js/"
}).use(['form','layer','upload'],function(){
    var form = layui.form();
    var layer = parent.layer === undefined ? layui.layer : parent.layer;
    var $ = layui.jquery;
    var $form = $('form');

    //读取cookies
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr=document.cookie.match(reg)){
            return arr[2];
        }else {
            return null;
        }
    }

    //获取用户登录存在cookie的信息
    if (getCookie('user')){
        var user=JSON.parse(getCookie('user'));
        $("#account").val(user.account);
        $("#nickname").val(user.nickname);
    }

    //添加验证规则
    form.verify({
        oldPwd : function(value, item){
            if (getCookie('user')){
                if(value != user.password){
                    return "密码错误，请重新输入！";
                }
            }

        },
        newPwd : function(value, item){
            if(value.length < 6){
                return "密码长度不能小于6位";
            }
        },
        confirmPwd : function(value, item){
            /*if(!new RegExp($("#newPwd").val()).test(value)){
                return "两次输入密码不一致，请重新输入！";
            }*/
            if($("#newPwd").val() != value){
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    //判断是否修改过头像，如果修改过则显示修改后的头像，否则显示默认头像
    if(window.sessionStorage.getItem('userFace')){
        $("#userFace").attr("src",window.sessionStorage.getItem('userFace'));
    }else{
        $("#userFace").attr("src","../../images/face.jpg");
    }

    //提交个人资料
    form.on("submit(changeUser)",function(data){
        var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            layer.msg("提交成功！");
        },2000);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })



    //修改密码
    form.on("submit(changePwd)",function(data){
        $.ajax({
            url : "/changepwd",
            type : "post",
            dataType : "json",
            data : {
                "userId" : user.userId,
                "password" : $("#newPwd").val()
            },
            success : function (data) {
                var index = layer.msg('密码修改成功，请重新登录！',{icon:6,time:false,shade:0.8});
                setTimeout(function(){
                    layer.close(index);
                    parent.location.href='../../login.html';
                    //$(".pwd").val('');
                },2000);
            }
        })
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })

})
