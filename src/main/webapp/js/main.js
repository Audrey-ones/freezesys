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

var app = angular.module("mainApp",[]);
app.controller("mainCtrl",["$scope","mainService",function ($scope,mainService) {
    $scope.show = true;
    $scope.tr_show = false;

    //获取数量
    mainService.loadCount(function (data) {
        $scope.data = data;
        /*console.log(data)*/
    });
    //刷新页面
    $scope.reloadMainPage = function () {
        window.location.reload();
    };

    //分割数组(将一个大数组分割)
    function sliceArr(page,size,arr) {
        var result = [];
        for (var i=0; i<Math.ceil(arr.length/size);i++){
            if (i == page){//当页数和i相同时，截取该页数的内容
                var start = i*size;
                var end = start+size;
                result=arr.slice(start,end);
            }
        }
        return result;
    }
    //分页
    function pagination(length,data) {
        $scope.firstPage = 1;
        $scope.pageNum = 3;
        $scope.page = 1;
        var amount = length;
        var each = 8;
        $scope.sub = function (page) {
            var list = sliceArr(page-1,each,data);
            $scope.diveList = list;
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

    //判断字符是否为空
    function isEmpty(obj){
        if(typeof obj == "undefined" || obj == null || obj == ""){
            return true;
        }else{
            return false;
        }
    }

    //加载数据显示
    mainService.loadDiveInfo(function (data) {
        pagination(data.length,data);
    });

    layui.use(['layer','jquery'],function () {
        var layer = layui.layer,
            $ = layui.jquery;

        //查询剩余麦管数目
        $scope.getStrawNum = function (flagNum) {
            /*if (flagNum == ""){
                layer.msg("请输入需要的麦管数");
            }else {
                mainService.loadDivepipeByFlagNum(flagNum,function (data) {
                    pagination(data.length,data);
                });
            }*/
            /*if (isNaN(flagNum)){
                console.log("不是数字哦")
            }else {
                console.log("是数字哦~")
            }*/
            if (!isEmpty(flagNum)){
                if (!isNaN(flagNum)){
                    mainService.loadDivepipeByFlagNum(flagNum,function (data) {
                        if (data.length != 0){
                            pagination(data.length,data);
                            $scope.tr_show = false;
                            $scope.show = true;
                        }else {
                            $scope.diveList = data;
                            $scope.tr_show = true;
                            $scope.show = false;
                        }

                    });
                }else {
                    layer.msg("请输入数字！");
                    $scope.flagNum = "";
                }
            }else {
                layer.msg("请输入需要的麦管数！");
            }

        };

        $(".panel a").on("click",function(){
            window.parent.addTab($(this));
        });

        //冷冻存储
        $scope.diveStorage = function (dive) {
            if (dive.flagNum != 0){
                var index = layer.open({
                    title : "冷冻存储",
                    type : 2,
                    content : "storage/freezeStorage.html",
                    success : function (layero, index) {
                        //获取子页面
                        var body = layer.getChildFrame('body',index);
                        body.find("#divepipeId").val(dive.divepipeId);
                        body.find(".nitNum").text(dive.nitNum);
                        body.find(".tubNum").text(dive.tubNum);
                        body.find(".divepipeNum").text(dive.divepipeNum);
                        body.find(".flagNum").text(dive.flagNum);
                    }
                });
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function () {
                    layer.full(index);
                });
                layer.full(index);
            }else {
                layer.msg("该套管已满，请重新选择位置！");
            }


        };

    })
}]);

app.service("mainService",["$http",function ($http) {
    this.loadCount = function (callback) {
        $http({
            url : '/getCount',
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };

    this.loadDiveInfo = function (callback) {
        $http({
            url : '/allDivepipe',
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };
    
    this.loadDivepipeByFlagNum = function (flagNum,callback) {
        $http({
            url : '/getDivepipeByFlagNum',
            method : 'GET',
            params : {
                flagNum : flagNum
            }
        }).then(function (value) { 
            if (callback){
                callback(value.data);
            }
        })
    }
}]);

