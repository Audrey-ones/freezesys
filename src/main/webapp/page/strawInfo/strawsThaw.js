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
    }

    //查询所有解冻信息
    $(".allThawRecord").click(function () {
        $.get("/allThawRecord",function (data) {
            console.log(data);
            displayAllThawStraw(data);
        })
    })

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
                    if (data.result == 0){//这条记录已解冻
                        layer.msg("该记录已解冻，请勿重复操作!");
                    }
                    if (data.result == 1){//正常返回
                        layer.confirm("扫描到的条形码信息为病历号："+data.straw.medicalRecord+"，女方姓名："
                            +data.straw.femaleName+"，存储位置："+data.straw.strawNum+"管"+data.straw.nitNum+"-"+data.straw.tubNum+"-"
                            +data.straw.divepipeNum+"，确认解冻这条麦管记录？",{icon: 3,title:'提示信息'},function (index) {
                            $.ajax({
                                url : "/scanningThawing",
                                type : "post",
                                dataType : "json",
                                data : {
                                    strawId : data.straw.strawId,
                                    operator : $("#operator").val(),
                                    thawTime : new Date().toLocaleString()
                                },
                                success : function (data) {
                                    layer.msg("解冻成功！");
                                    displayThawStraw(data);
                                }
                            });
                            layer.close(index);
                        });
                    }
                    if (data.result == 2){//无效的条形码
                        layer.msg("条形码无效，请请重新扫描输入!");
                        $(".search_input").val("");
                    }
                }
            })

		}else{
            layer.msg("请输入扫描的条形码信息！");
		}
	})


    //显示一条解冻记录
	function displayThawStraw(currData){
		//渲染数据
        var dataHtml = '<tr>'
                +'<td>'+currData.strawNum+'管'+currData.nitNum+'-'+currData.tubNum+'-'+currData.divepipeNum+'</td>'
                +'<td>'+currData.freezeNum+'</td>'
                +'<td>'+currData.medicalRecord+'</td>'
                +'<td>'+currData.femaleName+'</td>'
                +'<td>'+currData.sampleType+'</td>'
                +'<td>'+currData.sampleAmount+'</td>'
                +'<td>'+currData.sampleNum+'</td>'
                +'<td>'+currData.freezeTime+'</td>'
                +'<td>'+currData.thawTime+'</td>'
                +'<td>'+currData.freezeStatus+'</td>'
                +'<td>'+currData.operator+'</td>'
                +'</tr>';
        $(".straws_content").html(dataHtml);
	}

    //显示全部解冻记录
    function displayAllThawStraw(currData){
	    var dataHtml = '';
        //渲染数据
        for (var i=0; i<currData.length; i++){
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
