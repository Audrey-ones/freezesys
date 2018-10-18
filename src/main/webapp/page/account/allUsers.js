var app = angular.module("userApp",[]);
app.controller("userCtrl",["$scope","userService",function ($scope,userService) {
	userService.loadUserList(function (data) {
        if (data.length == 0){
            $scope.tr_show = true;
        }else {
            $scope.userList = data;
            $scope.tr_show = false;
        }
    });

    //根据关键字查询用户（用户名或用户昵称）
	$scope.selectUser = function (keyword) {
		userService.findUserByKeyword(keyword,function (data) {
			if (data.length != 0){
                $scope.userList = data;
                $scope.tr_show = false;
			}else {
                $scope.userList = data;
				$scope.tr_show = true;
			}

        })
    };
	
	//清除指纹
	$scope.clearFingerprint = function (user) {
		userService.deleteFingerprint(user.userId,function (data) {
			console.log(data);
			if (data == 1){
				layer.msg("成功清除该用户的指纹信息！");
			}else {
				layer.msg("该用户还没有进行指纹登记哦~");
			}

		});
    };

	//刷新页面
	$scope.reloadPage = function () {
		window.location.reload();
    };
	
	layui.use(['layer','jquery'],function () {
		var layer = layui.layer,
			$ = layui.jquery;

        //获取保存在cookie里的用户，非管理员不显示用户管理页面
        var user;
        if (getCookie('user')){
            user=JSON.parse(getCookie('user'));
            if (user.role == "超级管理员"){
                $("#userPage").css("display","block");
            }

        }
        //读取cookies
        /*function getCookie(name) {
            var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr=document.cookie.match(reg)){
                return arr[2];
            }else {
                return null;
            }
        }*/

        //添加用户
		$scope.addUser = function () {
			var index = layer.open({
				title : "添加用户",
				type : 2,
				content : "addUser.html",
				success : function (layero, index) {

                }
			});

			//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
			$(window).resize(function () {
				layer.full(index);
            })
			layer.full(index);
        }

        //编辑用户
		$scope.editUser = function (user) {
			var index = layer.open({
				title : "编辑用户",
				type : 2,
				content : "userEdit.html",
				success : function (layero, index) {
					//获取子页面
					var body = layer.getChildFrame('body',index);
                    body.find("#userId").val(user.userId);
                    body.find("#account").val(user.account);
                    body.find(".nickname").val(user.nickname);
                    body.find(".password").val(user.password);
                    body.find(".nitDel").val(user.nitDel);
                    body.find(".strawDel").val(user.strawDel);
                    body.find(".patientDel").val(user.patientDel);
                }
			});
			//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
			$(window).resize(function () {
				layer.full(index);
            });
			layer.full(index);
        };

        //删除用户
		$scope.delUser = function (key,user) {
			layer.confirm('确定删除此用户？',{icon: 3,title: '温馨提示'},function (index) {
				userService.deleteUser(user.userId,function (data) {
					layer.msg("删除成功！");
					$scope.userList.splice(key,1);
                });
				layer.close(index);
            });
        };

    })
}]);

app.service("userService",["$http",function ($http) {
	this.loadUserList = function (callback) {
		$http({
			url : '/allUsers',
			method : 'GET'
		}).then(function (value) {
			if (callback){
				callback(value.data);
			}
		})
    };

	this.deleteUser = function (userId,callback) {
		$http({
			url : '/users/'+userId,
			method : 'POST'
		}).then(function (value) {
			if (callback){
				callback(value.data);
			}
		})
    };

	this.findUserByKeyword = function (keyword,callback) {
		$http({
			url : '/users/keyword',
			method : 'GET',
			params : {
				keyword : keyword
			}
		}).then(function (value) {
			if (callback){
				callback(value.data);
			}
		})
    }
    
    this.deleteFingerprint = function (userId,callback) {
		$http({
			url : '/users/fingerprint/' + userId,
			method : 'post'
		}).then(function (value) {
			if (callback){
				callback(value.data);
			}
		})
    }
}]);
