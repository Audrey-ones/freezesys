layui.config({
    base : "js/"
}).use(["form","layer","jquery"],function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    //添加验证规则
    form.verify({
        account : function(value, item){
            $.ajax({
                url : "http://localhost:8080/user",
                type : "get",
                dataType : "json",
                data : {
                    "account" : value
                },
                success : function (data) {
                    if(data != 1){
                        return "用户名已存在，请重新输入！";
                    }
                }
            });

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
            url : "http://localhost:8080/user",
            type : "post",
            dataType : "json",
            data : {
                "account" : $("#account").val(),
                "nickname" : $("#nickname").val(),
                "password" : $("#password").val(),
                "remark" : "无"
            },
            success : function (data) {
                //弹出loading
                var index = top.layer.msg('数据提交中，请稍后',{icon: 16,time: false,shade: 0.8});
                setTimeout(function () {
                    top.layer.close(index);
                    top.layer.msg("添加病人信息成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                },2000);
            }
        })

        return false;

    })
})