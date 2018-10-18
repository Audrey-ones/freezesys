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

var app=angular.module("patientApp",[]);
app.controller("patientCtrl",["$scope","patientService",function ($scope,patientService) {
    $scope.show=true;
    $scope.tr_show=false;

    //分割数组(将一个大数组分割)
    function sliceArr(page,size,arr) {
        var result = [];
        for (var i=0; i<Math.ceil(arr.length/size);i++){
            if (i == page){//当页数和i相同时，截取该页数的内容
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
        var amount = length;//数据总条数
        var each = 10;//每页显示的条数
        $scope.sub = function(page) {
            var list = sliceArr(page-1,each,data);
            $scope.patientList = list;
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
    function isEmpty(obj) {
        if (typeof obj == "undefined" || obj == "null" || obj == ""){
            return true;
        }else {
            return false;
        }
    }

    //加载页面病人信息
    patientService.loadPatients(function (data) {
        if (data.length == 0){
            $scope.tr_show = true;
            $scope.show = false;
        }else {
            pagination(data.length,data);
            $scope.tr_show = false;
            $scope.show = true;
        }
    });


    layui.use(["form","layer","jquery"],function(){
        var form = layui.form(),
            layer = parent.layer === undefined ? layui.layer : parent.layer,
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

        //模糊查询病人信息
        $scope.likeSelect = function (keyword) {
            if (!isEmpty(keyword)){
                patientService.loadLikePatient(keyword,function (data) {
                    if (data.length != 0){
                        pagination(data.length,data);
                        $scope.tr_show=false;
                        $scope.show=true;
                    }else {
                        $scope.patientList=data;
                        $scope.tr_show=true;
                        $scope.show=false;
                    }

                })
            }else {
                layer.msg("请输入关键字");
            }

        };

        //刷新页面
        $(".reload").click(function () {
            window.location.reload();
        });



        //添加病人信息
        $scope.addPatient = function () {
            var index = layui.layer.open({
                title : "添加病人信息",
                type : 2,
                content : "patientAdd.html",
                success : function (layero,index) {

                }
            });
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            })
            layui.layer.full(index);
        };

        //编辑病人信息
        $scope.editPatient = function (patient) {
            console.log(patient);
            var index = layui.layer.open({
                title : "编辑病人信息",
                type : 2,
                content : "patientEdit.html",
                success : function (layero,index) {
                    //获取子页面
                    var body = layui.layer.getChildFrame('body',index);
                    body.find("#patientId").val(patient.patientId);
                    body.find(".medicalRecord").val(patient.medicalRecord);
                    body.find(".femaleName").val(patient.femaleName);
                    body.find(".maleName").val(patient.maleName);
                    body.find(".femaleIdNum").val(patient.femaleIdNum);
                    body.find(".maleIdNum").val(patient.maleIdNum);
                    body.find(".address").val(patient.address);
                    body.find(".phone").val(patient.phone);
                    body.find(".remark").val(patient.remark);
                }
            });
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            })
            layui.layer.full(index);

        };

        //删除病人信息
        $scope.delPatient = function (key,patient) {
            if (user.patientDel == "可操作"){
                layer.confirm("确定删除我吗？删除我将一并删除我的所有麦管记录哦~请慎重考虑",{icon: 3,title :'温馨提示'},function (index) {
                    patientService.deletePatient(patient.patientId,function (data) {
                        layer.msg("删除成功！");
                        $scope.patientList.splice(key,1);
                    });
                    layer.close(index);
                });

            }else {
                layer.msg("您没有删除病人信息的权限哦！");
            }

        }


    });

}]);

app.service("patientService",["$http",function ($http) {
    this.loadPatients = function (callback) {
        $http({
            method:'GET',
            url:'/patients'
        }).then(function(data){
            if (callback) {
                callback(data.data);
            }
        });
    };

    this.deletePatient = function (patientId,callback) {
        $http({
            method:'POST',
            url:'/patients/'+patientId
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };

    this.loadLikePatient = function (keyword,callback) {
        $http({
            method:'GET',
            url:'/patients/like',
            params:{
                keys : keyword
            }
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    }

}]);

app.filter("strFilter",function () {
    return function (value) {
        var changed = value;
        if (value == null || value == ""){
            changed = "未填写";
        }
        return changed;
    }
});

/*var a = (function () {
    function shuchu() {
        console.log("闭包可以输出啦~");
    }
    return {
        s : shuchu
    };
})();

a.s();*/

/*var aaa = (function(){
    var a = 1;
    function bbb(){
        a++;
        alert(a);
    }
    function ccc(){
        /!*a++;
        alert(a);*!/
        console.log("闭包可以输出啦~");
    }
    return {
        b:bbb,             //json结构
        c:ccc
    }
})();
alert(aaa.a)//undefined
aaa.b();     //2
aaa.c()      //3*/
