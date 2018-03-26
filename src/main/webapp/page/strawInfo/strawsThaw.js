layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

    $(".reload").click(function () {
        window.location.reload();
    });

    //获取保存在cookie里的用户
    var user;
    if (getCookie('user')){
        user=JSON.parse(getCookie('user'));

    }
    //读取cookies
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr=document.cookie.match(reg)){
            return arr[2];
        }else {
            return null;
        }
    }

	//首次加载解冻信息
    firstLoadThawInfo();
	function firstLoadThawInfo() {
        var dataHtml = '<tr><td colspan="12" style="color: #1AA094">您未扫描，暂无解冻信息</td></tr>';
        $(".straws_content").html(dataHtml);

        //在下拉框设置解冻者昵称
        $.ajax({
            url : "/nickname",
            type : "get",
            dataType : "json",
            success : function (data) {
                console.log(data)
                for (var i=0; i<data.length; i++){
                    $("#operator").append("<option value='"+data[i].nickname+"'>"+data[i].nickname+"</option>");
                }
            }
        })
        /*var grade=$("#operator");
        grade.append("<option value='0'>一年级</option>");            //添加下拉列表
        grade.append("<option value='1'>二年级</option>");
        grade.append("<option value='2'>三年级</option>");
        $("<option value='3'>四年级</option>").appendTo(grade);          //添加下拉列表
        $("<option></option>").val("4").text("五年级").appendTo(grade);    //添加下拉列表
        $("<option></option>").val("5").text("六年级").prependTo(grade);    //追加下拉列表到开头
        $("option[value='1']").remove();   //移除value值为1的下拉选项
        grade.val("2");          //设置默认的选中状态
        var maxGradeIndex=grade.find("option:last").attr("value");      //获取最后一个下拉选项的value值属性
        var gradeText=grade.find("option:first").text();   //获取最后一个下拉选项的文本内容*/

    }

	//查询条形码信息
	$(".search_btn").click(function(){
        console.log($("#operator").val())
		if($(".search_input").val() != ''){
            $.ajax({
                url : "/strawByBarcodeNum",
                type : "post",
                dataType : "json",
                data : {
                    barcodeNum : $(".search_input").val()
                },
                success : function (data) {
                    console.log(new Date().toLocaleString())
                    layer.confirm("扫描到的条形码信息为病历号："+data.medicalRecord+"，女方姓名："
                        +data.femaleName+"，存储位置："+data.strawNum+"管"+data.nitNum+"-"+data.tubNum+"-"
                        +data.divepipeNum+"，确认解冻这条麦管记录？",{icon: 3,title:'提示信息'},function (index) {
                        $.ajax({
                            url : "/scanningThawing",
                            type : "post",
                            dataType : "json",
                            data : {
                                strawId : data.strawId,
                                operator : $("#operator").val(),
                                thawTime : new Date().toLocaleString()
                            },
                            success : function (data) {
                                strawsList(data);
                            }
                        });
                        layer.close(index);
                    });
                }
            })

			/*var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "/straws",
					type : "get",
					dataType : "json",
					success : function(data){
		            	strawsList(data);
					}
				})
            	
                layer.close(index);
            },2000);*/
		}else{
            firstLoadThawInfo();
		}
	})



	function strawsList(currData){
		//渲染数据
        var dataHtml = '';
        for(var i=0;i<currData.length;i++){
            dataHtml += '<tr>'
            +'<td>'+currData[i].strawNum+'管'+currData[i].nitNum+'-'+currData[i].tubNum+'-'+currData[i].divepipeNum+'</td>'
            +'<td>'+currData[i].freezeNum+'</td>'
            +'<td>'+currData[i].medicalRecord+'</td>'
            +'<td>'+currData[i].femaleName+'</td>'
            +'<td>'+currData[i].sampleType+'</td>'
            +'<td>'+currData[i].sampleAmount+'</td>'
            +'<td>'+currData[i].sampleNum+'</td>'
            +'<td>'+currData[i].freezeTime+'</td>'
            +'<td>'+currData[i].thawTime+'</td>'
            +'<td>'+currData[i].freezeStatus+'</td>'
            +'<td>'+currData[i].operator+'</td>'
            +'</tr>';
        }
        $(".straws_content").html(dataHtml);
	}
})
