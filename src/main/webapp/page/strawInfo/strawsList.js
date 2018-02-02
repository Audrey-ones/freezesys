layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var strawsData = '';
	$.get("http://localhost:8080/straws", function(data){
        //正常加载信息
        strawsData = data;
        /*if(window.sessionStorage.getItem("addStraws")){
            var addStraws = window.sessionStorage.getItem("addStraws");
            strawsData = JSON.parse(addStraws).concat(strawsData);
        }*/
        //执行加载数据的方法
        strawsList();
	})

	//查询
	$(".search_btn").click(function(){
		var strawArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "http://localhost:8080/straws",
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
			layer.msg("请输入需要查询的内容");
		}
	})

	//添加文章
	$(".newsAdd_btn").click(function(){
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

	//推荐文章
	/*$(".recommend").click(function(){
		var $checkbox = $(".news_list").find('tbody input[type="checkbox"]:not([name="show"])');
		if($checkbox.is(":checked")){
			var index = layer.msg('推荐中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
                layer.close(index);
				layer.msg("推荐成功");
            },2000);
		}else{
			layer.msg("请选择需要推荐的文章");
		}
	})*/

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

	//批量删除
	$(".batchDel").click(function(){
		var $checkbox = $('.straws_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.straws_list tbody input[type="checkbox"][name="checked"]:checked');
		if($checkbox.is(":checked")){
			layer.confirm('确定删除选中的信息？',{icon:3, title:'提示信息'},function(index){
				var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	//删除数据
	            	for(var j=0;j<$checked.length;j++){
	            		for(var i=0;i<strawsData.length;i++){
							if(strawsData[i].newsId == $checked.eq(j).parents("tr").find(".news_del").attr("data-id")){
                                strawsData.splice(i,1);
								strawsList(strawsData);
							}
						}
	            	}
	            	$('.straws_list thead input[type="checkbox"]').prop("checked",false);
	            	form.render();
	                layer.close(index);
					layer.msg("删除成功");
	            },2000);
	        })
		}else{
			layer.msg("请选择需要删除的文章");
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
 
	//操作
	$("body").on("click",".straws_edit",function(){  //编辑
		layer.alert('您点击了文章编辑按钮，由于是纯静态页面，所以暂时不存在编辑内容，后期会添加，敬请谅解。。。',{icon:6, title:'文章编辑'});
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

	$("body").on("click",".news_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();
			for(var i=0;i<strawsData.length;i++){
				if(strawsData[i].newsId == _this.attr("data-id")){
                    strawsData.splice(i,1);
					strawsList(strawsData);
				}
			}
			layer.close(index);
		});
	})

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
                    +  '<a class="layui-btn layui-btn-mini straws_edit"><i class="iconfont icon-edit"></i> 编辑</a>'
                    +  '<a class="layui-btn layui-btn-danger layui-btn-mini news_del" data-id="'+data[i].newsId+'"><i class="iconfont icon-edit"></i> 解冻</a>'
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
