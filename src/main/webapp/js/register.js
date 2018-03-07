layui.config({
    base : "js/"
}).use(["form","layer","jquery"],function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    //添加验证规则
    form.verify({
        account : function(value, item){
            if(value.length < 3){
                return "用户名长度不能小于3位";
            }

        },
        nickname : function(value, item){
            if(value.length < 2){
                return "昵称长度不能小于2位";
            }

        },
        password : function(value, item){
            if(value.length < 6){
                return "密码长度不能小于6位";
            }
        },
        confirmPwd : function(value, item){
            if(!new RegExp($("#password").val()).test(value)){
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    form.on("submit(register)",function (data) {

        $.ajax({
            url : "/user",
            type : "post",
            dataType : "json",
            data : {
                "account" : $("#account").val(),
                "nickname" : $("#nickname").val(),
                "password" : $("#password").val(),
                "role" : "普通用户",
                "nitDel" : "不可操作",
                "strawDel" : "不可操作",
                "patientDel" : "不可操作",
                "remark" : "无"
            },
            success : function (data) {
                if (data == 1){
                    //弹出loading
                    //var index = top.layer.msg('数据提交中，请稍后',{icon: 16,time: false,shade: 0.8});
                    layer.msg("注册成功！");
                    setTimeout(function () {
                        //跳转到登录界面
                        location.href='login.html';
                    },2000);
                }else{
                    layer.msg("用户名已存在，请重新输入！");
                    $("#account").val("");
                    $("#password").val("");
                    $("#confirmPwd").val("");
                }

            }
        })

        return false;

    })
})