layui.config({
    base : "js/"
}).use(['form','layer','jquery','laydate'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        laydate = layui.laydate,
        $ = layui.jquery;

    //创建一个编辑器
    //var editIndex = layedit.build('news_content');
    var addStrawsArray = [],addStraws;
    form.on("submit(addStraws)",function(data){
        //是否添加过信息
        if(window.sessionStorage.getItem("addStraws")){
            addStrawsArray = JSON.parse(window.sessionStorage.getItem("addStraws"));
        }
        //显示、审核状态
        /*var isShow = data.field.show=="on" ? "checked" : "",
            newsStatus = data.field.shenhe=="on" ? "审核通过" : "待审核";*/

        addStraws = '{"medicalRecord":"'+$(".medicalRecord").val()+'",';  //病历号
        addStraws += '"freezeTime":"'+$(".freezeTime").val()+'",';	 //冷冻时间
        addStraws += '"femaleName":"'+$(".femaleName").val()+'",'; //发布时间
        addStraws += '"maleName":"'+$(".maleName").val()+'",';
        addStraws += '"expireTime":"'+$(".expireTime").val()+'",';
        addStraws += '"sampleType":"'+$(".sampleType option").eq($(".sampleType").val()).text()+'",'; //开放浏览
        addStraws += '"sampleAmount":"'+$(".sampleAmount").val()+'",';
        addStraws += '"nitNum":"'+$(".nitNum").val()+'",';
        addStraws += '"tubNum":"'+$(".tubNum").val()+'",';
        addStraws += '"drivepipeNum":"'+$(".drivepipeNum").val()+'",';
        addStraws += '"freezeStatus":"'+"未解冻"+'",';
        addStraws += '"opName":"'+"无"+'",';
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
        },2000);
        return false;
    })

})
