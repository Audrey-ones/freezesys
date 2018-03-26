layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

    //获取保存在cookie里的用户，非管理员不显示用户管理页面
    var user;
    if (getCookie('user')){
        user=JSON.parse(getCookie('user'));
        if (user.role != "超级管理员"){
        	$("#userPage").css("display","none");
		}

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

    var usersData = '';
    loadUsers();
    //加载用户数据
    function loadUsers() {
        $.get("/allUsers", function(data){
            usersData = data;
            //执行加载数据的方法
            usersList();
        });
    }

	//查询
	$(".search_btn").click(function(){
		var userArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "/allUsers",
					type : "get",
					dataType : "json",
					success : function(usersData){
						for(var i=0;i<usersData.length;i++){
							var usersStr = usersData[i];
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
		            		//用户名
		            		if(usersStr.account.indexOf(selectStr) > -1){
			            		usersStr["account"] = changeStr(usersStr.account);
		            		}
		            		//用户邮箱
		            		if(usersStr.nickname.indexOf(selectStr) > -1){
			            		usersStr["nickname"] = changeStr(usersStr.nickname);
		            		}
		            		if(usersStr.account.indexOf(selectStr)>-1 || usersStr.nickname.indexOf(selectStr)>-1){
		            			userArray.push(usersStr);
		            		}
		            	}
		            	usersData = userArray;
		            	usersList(usersData);
					}
				})
            	
                layer.close(index);
            },2000);
		}else{
			loadUsers();
		}
	})

	//添加用户
	$(".usersAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加用户",
			type : 2,
			content : "addUser.html",
			success : function(layero, index){
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})

    //全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断用户是否全部选中来确定全选按钮是否选中
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

    //编辑用户消息
	$("body").on("click",".users_edit",function(){
		var _this = $(this);
		for (var i=0; i<usersData.length; i++){
			if (usersData[i].userId == _this.attr("data-id")){
				//获取当前用户的ID
				var userId = usersData[i].userId;
				var index = layui.layer.open({
					title : "编辑病人信息",
					type : 2,
					content : "userEdit.html",
					success : function (data) {
						//获取子页面
						var body = layui.layer.getChildFrame('body',index);
						body.find("#userId").val(userId);
						$.ajax({
							url : "/users/"+userId,
							type : "get",
							dataType : "json",
							success : function (data) {
								body.find("#account").val(data.account);
								body.find(".nickname").val(data.nickname);
								body.find(".password").val(data.password);
								body.find(".nitDel").val(data.nitDel);
                                body.find(".strawDel").val(data.strawDel);
                                body.find(".patientDel").val(data.patientDel);
                            }
						})
                    }
				})
				//改变窗口大下时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
				$(window).resize(function () {
					layui.layer.full(index);
                })
				layui.layer.full(index);
			}
		}
	})

	//删除一个用户
	$("body").on("click",".users_del",function(){
		var _this = $(this);
		layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
			for(var i=0;i<usersData.length;i++){
				if(usersData[i].userId == _this.attr("data-id")){
					$.ajax({
						url : "/users/"+usersData[i].userId,
						type : "post",
						dataType : "json",
						success : function (data) {
							layer.msg("删除成功！");
                        }
					});
                    //同时在表格中移除被删除的信息
                    usersData.splice(i,1);
                    usersList(usersData);
				}
			}
			layer.close(index);
		});
	})

	function usersList(that){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
            if(!that){
                currData = usersData.concat().splice(curr*nums-nums, nums);
            }else{
                currData = that.concat().splice(curr*nums-nums, nums);
            }
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					dataHtml += '<tr>'
			    	+  '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+  '<td>'+currData[i].account+'</td>'
			    	+  '<td>'+currData[i].nickname+'</td>'
			    	+  '<td>'+currData[i].role+'</td>'
			    	+  '<td>'+currData[i].nitDel+'</td>'
			    	+  '<td>'+currData[i].strawDel+'</td>'
			    	+  '<td>'+currData[i].patientDel+'</td>'
			    	+  '<td>'
					+    '<a class="layui-btn layui-btn-mini users_edit" data-id="'+currData[i].userId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
					+    '<a class="layui-btn layui-btn-danger layui-btn-mini users_del" data-id="'+currData[i].userId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
			        +  '</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		laypage({
			cont : "page",
			pages : Math.ceil(usersData.length/nums),
			jump : function(obj){
				$(".users_content").html(renderDate(usersData,obj.curr));
				$('.users_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
        
})