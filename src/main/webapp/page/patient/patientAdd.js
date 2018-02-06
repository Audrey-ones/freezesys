layui.config({
    base : "js/"
}).use(["form","layer","jquery","laydate"],function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    form.on("submit(addPatient)",function (data) {

        $.ajax({
            url : "/patients",
            type : "post",
            dataType : "json",
            data : {
                "medicalRecord" : $(".medicalRecord").val(),
                "femaleName" : $(".femaleName").val(),
                "maleName" : $(".maleName").val(),
                "femaleIdNum" : $(".femaleIdNum").val(),
                "maleIdNum" : $(".maleIdNum").val(),
                "address" : $(".address").val(),
                "phone" : $(".phone").val(),
                "remark" : $(".remark").val()
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