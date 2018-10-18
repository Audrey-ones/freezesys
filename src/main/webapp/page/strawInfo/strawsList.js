//创建保存页码数组的函数
function setPage(length, amount, num, first) {
    //length数据总条数
    //amount每页数据条数
    //num保留的页码数
    //first第一页的页码
    var pages = []; //创建分页数组
    var page = Math.ceil(length / amount);
    if (page <= num) {
        for (var i = 1; i <= page; i++) {
            pages.push(i);
        }
    }
    if (page > num) {
        for (var i = first; i < first + num; i++) {
            pages.push(i);
        }
    }
    return pages;
}

var app = angular.module("strawApp",[]);
app.controller("strawCtrl",["$scope","strawService",function ($scope,strawService) {
    $scope.show=true;
    $scope.tr_show=false;

    $scope.findStraw = function () {
        strawService.loadStrawList(function (data) {
            pagination(data.length,data);
            $scope.show = true;
        })
    };

    //刷新页面
    $scope.reloadPage = function () {
        window.location.reload();
    };

    //分割数组（把一个大数组分割成小数组）
    function sliceArr(page,size,arr) {
        var result = [];
        for (var i=0; i<Math.ceil(arr.length/size); i++){
            if (i == page){
                var start = i*size;
                var end = start+size;
                result = arr.slice(start,end);
            }
        }
        return result;
    }

    //分页
    function pagination(length,data) {
        $scope.firstPage = 1;
        $scope.pageNum = 5;
        $scope.page = 1;
        var amount = length;
        var each = 10;
        $scope.sub = function (page) {
            var list = sliceArr(page-1,each,data);
            $scope.strawList = list;
            $scope.lastPage = Math.ceil(amount / each);
            if (page >= $scope.pageNum) {
                $scope.firstPage = page - Math.floor($scope.pageNum / 2);
            } else {
                $scope.firstPage = 1;
            }
            if ($scope.firstPage > $scope.lastPage - $scope.pageNum) {
                $scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
            }
            $scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
            $scope.page = page;

        };
        $scope.sub(1);
    }

    //加载数据
    strawService.loadStrawList(function (data) {
        if (data.length == 0){
            $scope.tr_show = true;
            $scope.show = false;
        }else {
            pagination(data.length,data);
            $scope.tr_show = false;
            $scope.show = true;
        }
    });

    layui.use(['form','layer','jquery'],function () {
        var form = layui.form(),
            layer = layui.layer,
            $ = layui.jquery;

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

        //历史存储录入
        $scope.addStraw = function () {
            var index = layer.open({
                title : "历史存储录入",
                type : 2,
                content : "strawAdd.html",
                success : function (layero, index) {

                }
            });
            $(window).resize(function () {
                layer.full(index);
            });
            layer.full(index);
        };

        //编辑麦管信息
        $scope.editStraw = function (straw) {
            if (straw.freezeStatus != "已解冻"){
                strawService.loadStrawById(straw.strawId,function (data) {
                    console.log(data);
                    var index = layer.open({
                        title : "编辑麦管信息",
                        type : 2,
                        content : "strawEdit.html",
                        success : function (layero , index) {
                            //获取子页面
                            var body = layer.getChildFrame('body',index);
                            body.find(".nitNum").val(straw.nitNum);
                            body.find(".tubNum").val(straw.tubNum);
                            body.find(".divepipeNum").val(straw.divepipeNum);
                            body.find(".strawNum").val(straw.strawNum);
                            body.find("#strawId").val(straw.strawId);
                            body.find(".medicalRecord").val(straw.medicalRecord);
                            body.find(".femaleName").val(straw.femaleName);
                            body.find(".maleName").val(straw.maleName);
                            body.find(".sampleAmount").val(straw.sampleAmount);
                            body.find(".sampleNum").val(straw.sampleNum);
                            body.find(".freezeNum").val(straw.freezeNum);
                            body.find(".freezeTime").val(straw.freezeTime);
                            body.find(".expireTime").val(straw.expireTime);
                            //设置下拉框的默认值
                            body.find(".sampleType").val(straw.sampleType);
                            body.find("#patientId").val(data.patientId);
                            body.find("#divepipeId").val(data.divepipeId);
                        }
                    });
                    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                    $(window).resize(function () {
                        layer.full(index);
                    });
                    layer.full(index);

                });
            }else {
                layer.msg("该记录已经被解冻了哦~不可进行编辑操作！");
            }

        };

        //解冻麦管（逻辑删除）
        $scope.delStraw = function (straw) {
            if (user.strawDel == "可操作"){
                if (straw.freezeStatus != "已解冻"){
                    layer.confirm('确定解冻这个麦管？解冻后不可恢复！',{icon:3, title:'温馨提示'},function (index) {
                        //var thawTime = new Date().toLocaleString();
                        strawService.deleteStraw(straw.strawId,"已解冻",user.nickname,function (data) {
                            if (data == 1){
                                layer.msg("解冻成功！");
                                setTimeout(function(){
                                    //刷新父页面
                                    parent.location.reload();
                                },2000);
                            }
                        });
                        layer.close(index);
                    });
                }else {
                    layer.msg("该记录已经被解冻啦，请勿重复解冻！");
                }

            }else {
                layer.msg("您没有解冻该麦管的权限哦！");
            }
        };

    })
}]);

app.service("strawService",["$http",function ($http) {
    this.loadStrawList = function (callback) {
        $http({
            url : '/straws',
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };

    this.loadAllStraws = function (callback) {
        $http({
            url : '/straws/like',
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };
    this.loadStrawById = function (strawId,callback) {
        $http({
            url : '/straws/'+strawId,
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };
    this.deleteStraw = function (strawId,freezeStatus,operator,callback) {
        $http({
            url : '/updateFreezeStatus',
            method : 'POST',
            params : {
                strawId : strawId,
                freezeStatus : freezeStatus,
                operator : operator
            }
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    }
}]);
