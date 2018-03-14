layui.config({
    base : "js/"
}).use(['form','layer','jquery'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    //创建一个编辑器
    //var editIndex = layedit.build('news_content');
    var addStrawsArray = [],addStraws;
    form.on("submit(addStraws)",function(data){

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
                "sampleNum":$(".sampleNum").val(),
                "freezeNum":$(".freezeNum").val(),
                "freezeTime":$(".freezeTime").val(),
                "expireTime":"无",
                "barcodeNum":"无",
                "nitNum":$(".nitNum").val(),
                "tubNum":$(".tubNum").val(),
                "divepipeNum":$(".divepipeNum").val(),
                "thawTime":"无",
                "freezeStatus":"未解冻",
                "operator":"无",
                "strawNum":$(".strawNum").val(),
                "remark":"无",
                "addType":0
            },
            success : function (data) {
                if (data == 1){
                    //弹出loading
                    var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("历史存储录入成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
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
