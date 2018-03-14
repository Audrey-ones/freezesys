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

    $(".reload").click(function () {
        window.location.reload();
    });

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
	loadData();
	function loadData() {
        $.get("/allDivepipe", function(data){
            //正常加载信息
            divepipeData = data;
            $(".record span").html("一共"+data.length+"条记录");
            //执行加载数据的方法
            divepipeList();
        })
    }

    //根据可存放麦管数目进行查询
    $(".search_btn").click(function () {
        if ($(".search_input").val() != ''){
            var index = layer.msg('查询中，请稍后',{icon: 16, time: false, shade: 0.8});
            setTimeout(function () {
                $.ajax({
                    url : "/getDivepipeByFlagNum",
                    type : "get",
                    dataType : "json",
                    data : {
                        flagNum : $(".search_input").val()
                    },
                    success : function (data) {
                        $(".record span").html("一共"+data.length+"条记录");
                        divepipeList(data);
                    }

                });
                layer.close(index);
            },2000);
        }else {
            loadData();
        }
    })

    //冷冻存储
    $("body").on("click",".freezeStorage",function () {
        var _this = $(this);
        for(var i=0; i<divepipeData.length; i++){
            if (divepipeData[i].divepipeId == _this.attr("data-id")){
                //获取当前点击的病人ID
                var divepipeId = divepipeData[i].divepipeId;
                var index = layui.layer.open({
                    title : "冷冻存储",
                    type : 2,
                    content : "storage/freezeStorage.html",
                    success : function (layero,index) {
                        //获取子页面
                        var body = layui.layer.getChildFrame('body', index);
                        body.find("#divepipeId").val(divepipeId);
                        $.ajax({
                            url : "/nit/"+divepipeId,
                            type : "get",
                            dataType : "json",
                            success : function (data) {
                                body.find(".nitNum").text(data.nitNum);
                                body.find(".tubNum").text(data.tubNum);
                                body.find(".divepipeNum").text(data.divepipeNum);
                                body.find(".flagNum").text(data.flagNum);
                                body.find("#divepipeId").val(data.divepipeId);
                            }
                        })
                    }
                })
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function () {
                    layui.layer.full(index);
                })
                layui.layer.full(index);
            }
        }

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
                        +   '<a class="layui-btn layui-btn-mini freezeStorage" data-id="'+currData[i].divepipeId+'"><i class="fa fa-snowflake-o"></i>&nbsp;冷冻存储 </a>'
                        + '</td>'
                        + '</tr>>';
                }
            }else {
                dataHtml += '<tr><td colspan="12">暂无记录</td></tr>'
            }
            return dataHtml;
        }

        //分页
        var nums = 8;//每页出现的数据量
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

})
