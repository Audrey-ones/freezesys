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
        //是否添加过信息
        /*if(window.sessionStorage.getItem("addStraws")){
            addStrawsArray = JSON.parse(window.sessionStorage.getItem("addStraws"));
        }*/
        //显示、审核状态
        /*var isShow = data.field.show=="on" ? "checked" : "",
            newsStatus = data.field.shenhe=="on" ? "审核通过" : "待审核";*/

       /* var straw = {
            "medicalRecord":$(".medicalRecord").val(),
            "femaleName":$(".femaleName").val(),
            "maleName":$(".maleName").val(),
            "sampleType":$(".sampleType").val(),
            "sampleAmount":$(".sampleAmount").val(),
            "freezeNum":$(".freezeNum").val(),
            "freezeTime":$(".freezeTime").val(),
            "expireTime":$(".expireTime").val(),
            "barcodeNum":"无",
            "nitNum":$(".nitNum").val(),
            "tubNum":$(".tubNum").val(),
            "divepipeNum":$(".divepipeNum").val(),
            "freezeStatus":$(".freezeStatus").val(),
            "operator":"无",
            "strawNum":$(".strawNum").val(),
            "remark":"无"
        }*/
        /*var thawTime = new Date().toLocaleString();
        console.log(thawTime);*/
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
                "expireTime":$(".expireTime").val(),
                "barcodeNum":"无",
                "nitNum":$(".nitNum").val(),
                "tubNum":$(".tubNum").val(),
                "divepipeNum":$(".divepipeNum").val(),
                "thawTime":"无",
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

       /*addStraws = '{"medicalRecord":"'+$(".medicalRecord").val()+'",';  //病历号
        addStraws += '"femaleName":"'+$(".femaleName").val()+'",'; //女方姓名
        addStraws += '"maleName":"'+$(".maleName").val()+'",';//男方姓名
        addStraws += '"sampleType":"'+$(".sampleType option").eq($(".sampleType").val()).text()+'",'; //样本类型
        addStraws += '"sampleAmount":"'+$(".sampleAmount").val()+'",';//样本数量
        addStraws += '"freezeTime":"'+$(".freezeTime").val()+'",';//冷冻时间
        addStraws += '"expireTime":"'+$(".expireTime").val()+'",';//到期时间
        addStraws += '"nitNum":"'+$(".nitNum").val()+'",';//液氮罐编号
        addStraws += '"tubNum":"'+$(".tubNum").val()+'",';//吊桶编号
        addStraws += '"divepipeNum":"'+$(".divepipeNum").val()+'",';//套管编号
        addStraws += '"freezeStatus":"'+"未解冻"+'",';//解冻状态
        addStraws += '"operator":"'+"无"+'",';
        addStraws += '"strawNum":"'+$(".strawNum").val()+'"}';
        addStrawsArray.unshift(JSON.parse(addStraws));
        window.sessionStorage.setItem("addStraws",JSON.stringify(addStrawsArray));
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            top.layer.close(index);
            top.layer.msg("历史存储录入成功！");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        },2000);*/
        return false;
    })

})
