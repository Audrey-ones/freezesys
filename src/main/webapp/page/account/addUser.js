var $;
layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;

 	form.on("submit(addUser)",function(data){
 		$.ajax({
			url : '/user',
			type : 'post',
			dataType : 'json',
			data : {
				"account" : $(".account").val(),
                "nickname" : $(".nickname").val(),
                "password" : "123456",
				"role" : "普通用户",
                "nitDel" : $(".nitDel option").eq($(".nitDel").val()).text(),
                "strawDel" : $(".strawDel option").eq($(".strawDel").val()).text(),
                "patientDel" : $(".patientDel option").eq($(".patientDel").val()).text(),
                "remark" : "无"
			},
			success : function (data) {
				if (data == 0){
					layer.msg("用户名已存在，请重新输入！");
                    $(".account").val("");
				}else {
                    //弹出loading
                    var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("用户添加成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    },2000);
				}
            }
		});

 		return false;
 	})
	
})
