layui.config({
    base : "js/"
}).use(['form','layer','jquery','laydate'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        laydate = layui.laydate,
        $ = layui.jquery;

    var addNitsArray = [],addNits;
    form.on("submit(addNits)",function(data){
        //是否添加过信息
        /*if(window.sessionStorage.getItem("addNits")){
            addNitsArray = JSON.parse(window.sessionStorage.getItem("addNits"));
        }*/

        /*var nit = {
            "nitNum": $(".nitNum").val(),
            "version": $(".version").val(),
            "antibodyType": $(".antibodyType").val(),
            "status": "未使用",
            "tubAmount": parseInt($(".tubAmount").val()),
            "divepipeAmount": parseInt($(".divepipeAmount").val()),
            "strawAmount": parseInt($(".strawAmount").val()),
            "strawAmount": "无"
        }*/
        $.ajax({
            url : "/nits",
            type : 'post',
            dataType : "json",
            data : {
                'nitNum': $(".nitNum").val(),
                'version': $(".version").val(),
                'antibodyType': $(".antibodyType").val(),
                'status': '未使用',
                'tubAmount': $(".tubAmount").val(),
                'divepipeAmount': $(".divepipeAmount").val(),
                'strawAmount': $(".strawAmount").val(),
                'remark': '无'
            },
            success : function (data) {
                //弹出loading
                var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                setTimeout(function(){
                    top.layer.close(index);
                    top.layer.msg("添加液氮罐成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                },2000);
            }

        })

        /*addNits = '{"nitNum":"'+$(".nitNum").val()+'",';  //液氮罐编号
        addNits += '"version":"'+$(".version").val()+'",'; //液氮罐型号
        addNits += '"antibodyType":"'+$(".antibodyType").val()+'",';//抗体类型
        addNits += '"status":"'+"未启用"+'",';//液氮罐状态
        addNits += '"tubAmount":"'+$(".tubAmount").val()+'",';
        addNits += '"divepipeAmount":"'+$(".divepipeAmount").val()+'",';
        addNits += '"strawAmount":"'+$(".strawAmount").val()+'"}';
        addNitsArray.unshift(JSON.parse(addNits));
        window.sessionStorage.setItem("addNits",JSON.stringify(addNitsArray));*/

        return false;
    })

})
