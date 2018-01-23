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
    var addNewsArray = [],addNews;
    form.on("submit(addNews)",function(data){
        //是否添加过信息
        if(window.sessionStorage.getItem("addNews")){
            addNewsArray = JSON.parse(window.sessionStorage.getItem("addNews"));
        }
        //显示、审核状态
        /*var isShow = data.field.show=="on" ? "checked" : "",
            newsStatus = data.field.shenhe=="on" ? "审核通过" : "待审核";*/

        addNews = '{"nitNum":"'+$(".nitNum").val()+'",';  //文章名称
        addNews += '"version":"'+$(".version").val()+'",'; //发布时间
        addNews += '"antibodyType":"'+$(".antibodyType").val()+'",';
        addNews += '"status":"'+"未启用"+'",';
        addNews += '"tubAmount":"'+$(".tubAmount").val()+'",';
        addNews += '"drivepipeAmount":"'+$(".drivepipeAmount").val()+'",';
        addNews += '"strawAmount":"'+$(".strawAmount").val()+'"}';
        addNewsArray.unshift(JSON.parse(addNews));
        window.sessionStorage.setItem("addNews",JSON.stringify(addNewsArray));
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
