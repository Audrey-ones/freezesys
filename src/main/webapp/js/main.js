layui.config({
	base : "js/"
}).use(['form','element','layer','laypage','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
        laypage = layui.laypage,
		$ = layui.jquery;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})

	$.ajax({
		url : "/getCount",
		type : "get",
		dataType : "json",
		success : function (data) {
            $(".strawsNum span").text(data.strawCount+"条");
			$(".nitsNum span").text(data.nitCount+"个");
            $(".patientsNum span").text(data.patientCount+"位");
        }
	})

    //加载页面数据
    var divepipeData = '';
    $.get("/allDivepipe", function(data){
        //正常加载信息
        divepipeData = data;
        console.log(divepipeData);
        //执行加载数据的方法
        divepipeList();
    })

    //加载数据
    function divepipeList(that) {
        //渲染数据
        function renderData(data,curr) {
            var dataHtml = '';
            if (!that){
                currData = divepipeData.concat().splice(curr*nums-nums, nums);
            }else {
                currData = that.concat().splice(curr*nums-nums, nums);
            }
            if (currData.length != 0){
                for (var i=0; i<currData.length; i++){
                    dataHtml += '<tr>'
                        + '<td></td>>'
                        + '<td>' + currData[i].nitNum + '</td>'
                        + '<td>' + currData[i].tubNum + '</td>'
                        + '<td>' + currData[i].divepipeNum + '</td>'
                        + '<td>' + currData[i].flagNum + '</td>'
                        + '<td>'
                        +   '<a class="layui-btn layui-btn-mini patient_edit" data-id="'+data[i].patientId+'"><i class="iconfont icon-edit patient_edit"></i>编辑 </a>'
                        +   '<a class="layui-btn layui-btn-danger layui-btn-mini patient_del" data-id="'+data[i].patientId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
                        + '</td>'
                        + '</tr>>';
                }
            }else {
                dataHtml += '<tr><th colspan="12">暂无数据</th></tr>'
            }
            return dataHtml;
        }

        //分页
        var nums = 10;//每页出现的数据量
        if (that){
            divepipeData = that;
        }
        laypage({
            cont : "page",
            pages : Math.ceil(divepipeData.length/nums),
            jump : function (obj) {
                $(".divepipe_content").html(renderData(divepipeData,obj.curr));
                $('.divepipe_list thead input[type="checked"]').prop("checked",false);
                form.render();
            }
        })
    }


   /* //剩余位置数量
    $.get("../json/nitsList.json",
        function(data){
            $(".emptyNum span").text(data.length+"个");
        }
    )

	//麦管存储记录
	$.get("../json/strawsList.json",
		function(data){
            $(".strawsNum span").text(data.length+"条");
		}
	)

	//液氮罐总数
    $.get("../json/nitsList.json",
        function(data){
            $(".nitsNum span").text(data.length+"个");
        }
    )


	//病人总数
    $.get("../json/patientsList.json",
        function(data){
            $(".patientsNum span").text(data.length+"位");
        }
    )*/



	/*//数字格式化
	$(".panel span").each(function(){
		$(this).html($(this).text()>9999 ? ($(this).text()/10000).toFixed(2) + "<em>万</em>" : $(this).text());	
	})

	//系统基本参数
	if(window.sessionStorage.getItem("systemParameter")){
		var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
		fillParameter(systemParameter);
	}else{
		$.ajax({
			url : "../json/systemParameter.json",
			type : "get",
			dataType : "json",
			success : function(data){
				fillParameter(data);
			}
		})
	}

	//填充数据方法
 	function fillParameter(data){
 		//判断字段数据是否存在
 		function nullData(data){
 			if(data == '' || data == "undefined"){
 				return "未定义";
 			}else{
 				return data;
 			}
 		}
 		$(".version").text(nullData(data.version));      //当前版本
		$(".author").text(nullData(data.author));        //开发作者
		$(".homePage").text(nullData(data.homePage));    //网站首页
		$(".server").text(nullData(data.server));        //服务器环境
		$(".dataBase").text(nullData(data.dataBase));    //数据库版本
		$(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
		$(".userRights").text(nullData(data.userRights));//当前用户权限
 	}*/

})
