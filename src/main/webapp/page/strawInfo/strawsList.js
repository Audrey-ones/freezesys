layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var strawsData = '';
	loadStraw();
	function loadStraw() {
        $.get("/straws", function(data){
            //正常加载信息
            strawsData = data;
            /*if(window.sessionStorage.getItem("addStraws")){
                var addStraws = window.sessionStorage.getItem("addStraws");
                strawsData = JSON.parse(addStraws).concat(strawsData);
            }*/
            //执行加载数据的方法
            strawsList();
        })
    }

	//查询
	$(".search_btn").click(function(){
		var strawArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "/straws",
					type : "get",
					dataType : "json",
					success : function(data){
						if(window.sessionStorage.getItem("addStraws")){
							var addStraws = window.sessionStorage.getItem("addStraws");
                            strawsData = JSON.parse(addStraws).concat(data);
						}else{
                            strawsData = data;
						}
						for(var i=0;i<strawsData.length;i++){
							var strawsStr = strawsData[i];
							var selectStr = $(".search_input").val();
		            		function changeStr(data){
		            			var dataStr = '';
		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
		            			if(showNum > 1){
									for (var j=0;j<showNum;j++) {
		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
		            				}
		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
		            				return dataStr;
		            			}else{
		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/"+selectStr+"/ig"))[1];
		            				return dataStr;
		            			}
		            		}
                            //病历号
                            if(strawsStr.freezeNum.indexOf(selectStr) > -1){
                                strawsStr["freezeNum"] = changeStr(strawsStr.freezeNum);
                            }
		            		//病历号
		            		if(strawsStr.medicalRecord.indexOf(selectStr) > -1){
                                strawsStr["medicalRecord"] = changeStr(strawsStr.medicalRecord);
		            		}
		            		//女方姓名
		            		if(strawsStr.femaleName.indexOf(selectStr) > -1){
                                strawsStr["femaleName"] = changeStr(strawsStr.femaleName);
		            		}
		            		//样品类型
		            		if(strawsStr.sampleType.indexOf(selectStr) > -1){
                                strawsStr["sampleType"] = changeStr(strawsStr.sampleType);
		            		}
		            		//冷冻时间
		            		if(strawsStr.freezeTime.indexOf(selectStr) > -1){
                                strawsStr["freezeTime"] = changeStr(strawsStr.freezeTime);
		            		}
		            		//到期时间
		            		if(strawsStr.expireTime.indexOf(selectStr) > -1){
                                strawsStr["expireTime"] = changeStr(strawsStr.expireTime);
		            		}
                            //冷冻状态
                            if(strawsStr.freezeStatus.indexOf(selectStr) > -1){
                                strawsStr["freezeStatus"] = changeStr(strawsStr.freezeStatus);
                            }
		            		if(strawsStr.freezeNum.indexOf(selectStr)>-1 || strawsStr.medicalRecord.indexOf(selectStr)>-1
								|| strawsStr.femaleName.indexOf(selectStr)>-1 || strawsStr.sampleType.indexOf(selectStr)>-1
								|| strawsStr.freezeTime.indexOf(selectStr)>-1 || strawsStr.expireTime.indexOf(selectStr)>-1
								|| strawsStr.freezeStatus.indexOf(selectStr)>-1){
                                strawArray.push(strawsStr);
		            		}
		            	}
                        strawsData = strawArray;
		            	strawsList(strawsData);
					}
				})
            	
                layer.close(index);
            },2000);
		}else{
			loadStraw();
		}
	})

	//添加麦管信息
	$(".strawAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "历史存储录入",
			type : 2,
			content : "strawAdd.html",
			success : function(layero, index){
				/*layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});*/
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})


	//审核文章
	$(".audit_btn").click(function(){
		var $checkbox = $('.straws_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.straws_list tbody input[type="checkbox"][name="checked"]:checked');
		if($checkbox.is(":checked")){
			var index = layer.msg('审核中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	for(var j=0;j<$checked.length;j++){
            		for(var i=0;i<newsData.length;i++){
						if(newsData[i].newsId == $checked.eq(j).parents("tr").find(".news_del").attr("data-id")){
							//修改列表中的文字
							$checked.eq(j).parents("tr").find("td:eq(3)").text("审核通过").removeAttr("style");
							//将选中状态删除
							$checked.eq(j).parents("tr").find('input[type="checkbox"][name="checked"]').prop("checked",false);
							form.render();
						}
					}
            	}
                layer.close(index);
				layer.msg("审核成功");
            },2000);
		}else{
			layer.msg("请选择需要审核的文章");
		}
	})

    //主页获取保存在cookie里的用户昵称
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

	//批量解冻
	$(".batchDel").click(function(){
		var $checkbox = $('.straws_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.straws_list tbody input[type="checkbox"][name="checked"]:checked');
		if($checkbox.is(":checked")){
			layer.confirm('确定解冻这个麦管？解冻后不可恢复！',{icon:3, title:'提示信息'},function(index){
				var index = layer.msg('解冻中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	//更改解冻状态
	            	for(var j=0;j<$checked.length;j++){
	            		for(var i=0;i<strawsData.length;i++){
							if(strawsData[i].strawId == $checked.eq(j).parents("tr").find(".straw_del").attr("data-id")){
                                /*strawsData.splice(i,1);
								strawsList(strawsData);*/
                                $.ajax({
                                    url : "/updateFreezeStatus",
                                    type : "post",
                                    dataType : "json",
                                    data : {
                                        "strawId" : strawsData[i].strawId,
                                        "freezeStatus" : "已解冻",
                                        "operator" : user.nickname
                                    },
                                    success : function (data) {

                                    }
                                })
							}
						}
	            	}
	            	$('.straws_list thead input[type="checkbox"]').prop("checked",false);
	            	form.render();
	                layer.close(index);
					layer.msg("解冻成功");
	            },2000);
	        })
		}else{
			layer.msg("请选择需要解冻的麦管");
		}
	})

	//全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})

	//是否展示
	form.on('switch(isShow)', function(data){
		var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
			layer.msg("展示状态修改成功！");
        },2000);
	})
 
	//编辑麦管信息
	$("body").on("click",".straws_edit",function(){  //编辑
        var _this = $(this);
        for(var i=0; i<strawsData.length; i++){
            if (strawsData[i].strawId == _this.attr("data-id")){
                //获取当前点击的病人ID
                var strawId = strawsData[i].strawId;
                var index = layui.layer.open({
                    title : "编辑麦管信息",
                    type : 2,
                    content : "strawEdit.html",
                    success : function (layero,index) {
                        //获取子页面
                        var body = layui.layer.getChildFrame('body', index);
                        body.find("#strawId").val(strawId);
                        $.ajax({
                            url : "/straws/"+strawId,
                            type : "get",
                            dataType : "json",
                            success : function (data) {
                                console.log(data)
                                body.find(".sampleAmount").val(data.sampleAmount);
                                body.find(".freezeNum").val(data.freezeNum);
                                body.find(".freezeTime").val(data.freezeTime);
                                body.find(".expireTime").val(data.expireTime);
                                body.find(".strawNum").val(data.strawNum);
                                var patientId = data.patientId;
                                var divepipeId = data.divepipeId;
                                body.find("#patientId").val(patientId);
                                body.find("#divepipeId").val(divepipeId);
                                $.ajax({
									url : "/patients/"+patientId,
									type : "get",
									dataType : "json",
									success : function (patientData) {
                                        body.find(".medicalRecord").val(patientData.medicalRecord);
                                        body.find(".femaleName").val(patientData.femaleName);
                                        body.find(".maleName").val(patientData.maleName);
                                    }
								});
                                $.ajax({
                                    url : "/nit/"+divepipeId,
                                    type : "get",
                                    dataType : "json",
                                    success : function (numData) {
                                        body.find(".nitNum").val(numData.nitNum);
                                        body.find(".tubNum").val(numData.tubNum);
                                        body.find(".divepipeNum").val(numData.divepipeNum);
                                    }
                                });
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

	$("body").on("click",".news_collect",function(){  //收藏.
		if($(this).text().indexOf("已收藏") > 0){
			layer.msg("取消收藏成功！");
			$(this).html("<i class='layui-icon'>&#xe600;</i> 收藏");
		}else{
			layer.msg("收藏成功！");
			$(this).html("<i class='iconfont icon-star'></i> 已收藏");
		}
	})

    //解冻一条记录（逻辑删除）
	$("body").on("click",".straw_del",function(){
		var _this = $(this);
		layer.confirm('确定解冻这个麦管？解冻后不可恢复！',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();
			for(var i=0;i<strawsData.length;i++){
				if(strawsData[i].strawId == _this.attr("data-id")){
				    $.ajax({
                        url : "/updateFreezeStatus",
                        type : "post",
                        dataType : "json",
                        data : {
                            "strawId" : strawsData[i].strawId,
                            "freezeStatus" : "已解冻",
                            "operator" : user.nickname
                        },
                        success : function (data) {
                            if (data == 1){
                                layer.msg("解冻成功！");
                                setTimeout(function(){
                                    //刷新父页面
                                    parent.location.reload();
                                },2000);
                            }else {
                                layer.msg("您已经解冻过该记录，请勿重复解冻！");
                            }

                        }
                    })
                    /*strawsData.splice(i,1);
					strawsList(strawsData);*/
				}
			}
			layer.close(index);
		});
	})

    function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()+1) + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() ;
        return Y+M+D+h+m;
    }

	function strawsList(that){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
			if(!that){
				currData = strawsData.concat().splice(curr*nums-nums, nums);
			}else{
				currData = that.concat().splice(curr*nums-nums, nums);
			}
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
				    /*var freezeTime = timestampToTime(currData[i].freezeTime);*/
				    console.log(data)
					dataHtml += '<tr>'
			    	+'<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+'<td>'+currData[i].strawNum+'管'+currData[i].nitNum+'-'+currData[i].tubNum+'-'+currData[i].divepipeNum+'</td>'
					+'<td>'+currData[i].freezeNum+'</td>'
			    	+'<td>'+currData[i].medicalRecord+'</td>'
					+'<td>'+currData[i].femaleName+'</td>'
					+'<td>'+currData[i].sampleType+'</td>'
					+'<td>'+currData[i].sampleAmount+'</td>'
					+'<td>'+currData[i].freezeTime+'</td>'
					+'<td>'+currData[i].expireTime+'</td>'
					+'<td>'+currData[i].freezeStatus+'</td>'
					+'<td>'+currData[i].operator+'</td>'
                    +'<td>'
                    +  '<a class="layui-btn layui-btn-mini straws_edit" data-id="'+data[i].strawId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
                    +  '<a class="layui-btn layui-btn-danger layui-btn-mini straw_del" data-id="'+data[i].strawId+'"><i class="fa fa-snowflake-o"></i> 解冻</a>'
                    +'</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="12">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		if(that){
            strawsData = that;
		}
		laypage({
			cont : "page",
			pages : Math.ceil(strawsData.length/nums),
			jump : function(obj){
				$(".straws_content").html(renderDate(strawsData,obj.curr));
				$('.straws_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
})
