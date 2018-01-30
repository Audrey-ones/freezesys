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
    var addNitsArray = [],addNits;
    form.on("submit(addNits)",function(data){
        //是否添加过信息
        if(window.sessionStorage.getItem("addNits")){
            addNitsArray = JSON.parse(window.sessionStorage.getItem("addNits"));
        }
        //显示、审核状态
        /*var isShow = data.field.show=="on" ? "checked" : "",
            newsStatus = data.field.shenhe=="on" ? "审核通过" : "待审核";*/

        addNits = '{"nitNum":"'+$(".nitNum").val()+'",';  //文章名称
        addNits += '"version":"'+$(".version").val()+'",'; //发布时间
        addNits += '"antibodyType":"'+$(".antibodyType").val()+'",';
        addNits += '"status":"'+"未启用"+'",';
        addNits += '"tubAmount":"'+$(".tubAmount").val()+'",';
        addNits += '"drivepipeAmount":"'+$(".drivepipeAmount").val()+'",';
        addNits += '"strawAmount":"'+$(".strawAmount").val()+'"}';
        addNitsArray.unshift(JSON.parse(addNits));
        window.sessionStorage.setItem("addNits",JSON.stringify(addNitsArray));
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            top.layer.close(index);
            top.layer.msg("添加液氮罐成功！");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        },2000);
        return false;
    })

})
