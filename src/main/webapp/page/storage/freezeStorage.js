layui.config({
    base : "js/"
}).use(['form','layer','jquery'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    console.log($("#divepipeId").val())
    form.on("submit(addStorage)",function(data){
        $.ajax({
            url : "/straw",
            type : "post",
            dataType : "json",
            data : {
                "medicalRecord":$(".medicalRecord").val(),
                "femaleName":$(".femaleName").val(),
                "maleName":$(".maleName").val(),
                "sampleType":$(".sampleType option").eq($(".sampleType").val()).text(),
                "sampleAmount":$(".sampleAmount").val(),
                "freezeNum":$(".freezeNum").val(),
                "freezeTime":$(".freezeTime").val(),
                "expireTime":$(".expireTime").val(),
                "barcodeNum":"无",
                "nitNum":$(".nitNum").text(),
                "tubNum":$(".tubNum").text(),
                "divepipeNum":$(".divepipeNum").text(),
                "freezeStatus":"未解冻",
                "operator":"无",
                "strawNum":$(".strawNum").val(),
                "remark":"无"
            },
            success : function (data) {
                if (data == 1){
                    //弹出loading
                    var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("新建冷冻存储成功！");
                        var divepipeId = $("#divepipeId").val();
                        $.ajax({
                            url : "/nit/"+divepipeId,
                            type : "get",
                            dataType : "json",
                            success : function (data) {
                                console.log(data);
                                if (data.flagNum == 0){
                                    layer.closeAll("iframe");
                                    //刷新父页面
                                    parent.location.reload();
                                }else{
                                    $(".flagNum").text(data.flagNum);
                                    $(".medicalRecord").val("");
                                    $(".femaleName").val("");
                                    $(".maleName").val("");
                                    $(".sampleAmount").val("");
                                    $(".strawNum").val("");
                                    $(".freezeNum").val("");
                                    $(".freezeTime").val("");
                                    $(".expireTime").val("");
                                    window.location.reload();
                                }


                            }
                        });
                    },2000);
                }else {
                    layer.msg("套管已存满，请重新选择套管！");
                    $(".divepipeNum").val("");
                }

            }
        })

        return false;
    })

})
