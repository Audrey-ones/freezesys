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

var app = angular.module("nitApp",[]);
app.controller("nitCtrl",["$scope","nitService",function ($scope,nitService) {
    $scope.show=true;
    $scope.tr_show=false;

    //刷新页面
    $scope.reloadPage = function () {
        window.location.reload();
    };

    //分割数组（把大数组分割成小数组）
    function sliceArr(page,size,data) {
        var result = [];
        for (var i=0; i<Math.ceil(data.length/size);i++){
            if (i == page){
                var start = i*size;
                var end = start+size;
                result = data.slice(start,end);
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
            $scope.nitList = list;
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
        if (typeof obj == "undefined" || obj == null || obj == ""){
            return true;
        }else {
            return false;
        }
    }

    //加载页面液氮罐信息
    nitService.loadNitList(function (data) {
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

        //模糊查询液氮罐信息
        $scope.nitLike = function (keyword) {
            if (!isEmpty(keyword)){
                nitService.loadLikeNit(keyword,function (data) {
                    if (data.length != 0){
                        pagination(data.length,data);
                        $scope.tr_show=false;
                        $scope.show=true;
                    }else {
                        $scope.nitList=data;
                        $scope.tr_show=true;
                        $scope.show=false;
                    }
                })
            }else {
                layer.msg("请输入关键字");
            }

        };

        //新增液氮罐信息
        $scope.addNit = function () {
            var index = layui.layer.open({
                title : "添加液氮罐",
                type : 2,
                content : "nitAdd.html",
                success : function (layero, index) {
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            })
            layui.layer.full(index);
        }

        //编辑选中的液氮罐信息
        $scope.editNit = function (nit) {
            var index = layui.layer.open({
                title : "编辑病人信息",
                type : 2,
                content : "nitEdit.html",
                success : function (layero, index) {
                    //获取子页面
                    var body = layui.layer.getChildFrame('body',index);
                    body.find("#nitId").val(nit.nitId);
                    body.find(".nitNum").val(nit.nitNum);
                    body.find(".version").val(nit.version);
                    body.find(".antibodyType").val(nit.antibodyType);
                    body.find(".status").val(nit.status);
                    body.find(".remark").val(nit.remark);
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            })
            layui.layer.full(index);
        }

        //删除液氮罐
        $scope.delNit = function (key,nit) {
            if (user.nitDel == "可操作"){
                layer.confirm('小主，你真的要删除我吗？删除我将会一并删除该液氮罐中的麦管记录哦~',{icon:3,title:'温馨提示'},function (index) {
                    nitService.deleteNit(nit.nitId,function (data) {
                        layer.msg("删除成功！");
                        $scope.nitList.splice(key,1);
                    });
                    layer.close(index);
                });
            }else {
                layer.msg("您没有删除该液氮罐的权限！");
            }
        }

    })
}]);

app.service("nitService",["$http",function ($http) {
    this.loadNitList = function (callback) {
        $http({
            url : '/nits',
            method : 'GET'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };

    this.deleteNit = function (nitId,callback) {
        $http({
            url : '/nits/'+nitId,
            method : 'POST'
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    }

    this.loadLikeNit = function (keyword,callback) {
        $http({
            url : '/nits/like',
            method : 'GET',
            params :{
                keyword : keyword
            }
        }).then(function (value) {
            if (callback){
                callback(value.data);
            }
        })
    };

}]);

/*layui.config({
    base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
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

    //加载页面数据
    var nitsData = '';
    loadNits();
    function loadNits() {
        $.get("/nits", function(data){
            //正常加载信息
            nitsData = data;
            if(window.sessionStorage.getItem("addNits")){
                var addNits = window.sessionStorage.getItem("addNits");
                nitsData = JSON.parse(addNits).concat(nitsData);
            }
            //执行加载数据的方法
            nitsList();

        })
    }

    //查询
    $(".search_btn").click(function(){
        var nitArray = [];
        if($(".search_input").val() != ''){
            var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
                $.ajax({
                    url : "/nits",
                    type : "get",
                    dataType : "json",
                    success : function(nitsData){
                        for(var i=0;i<nitsData.length;i++){
                            var nitsStr = nitsData[i];
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
                            //液氮罐编号
                            if(nitsStr.nitNum.indexOf(selectStr) > -1){
                                nitsStr["nitNum"] = changeStr(nitsStr.nitNum);
                            }
                            //液氮罐型号
                            if(nitsStr.version.indexOf(selectStr) > -1){
                                nitsStr["version"] = changeStr(nitsStr.version);
                            }
                            //抗体类型
                            if(nitsStr.antibodyType.indexOf(selectStr) > -1){
                                nitsStr["antibodyType"] = changeStr(nitsStr.antibodyType);
                            }
                            //液氮罐状态
                            if(nitsStr.status.indexOf(selectStr) > -1){
                                nitsStr["status"] = changeStr(nitsStr.status);
                            }
                            if(nitsStr.nitNum.indexOf(selectStr)>-1 || nitsStr.version.indexOf(selectStr)>-1
                                || nitsStr.antibodyType.indexOf(selectStr)>-1 || nitsStr.status.indexOf(selectStr)>-1){
                                nitArray.push(nitsStr);
                            }
                        }
                        nitsData = nitArray;
                        nitsList(nitsData);
                    }
                })

                layer.close(index);
            },2000);
        }else{
            /!*layer.msg("请输入需要查询的内容");*!/
            loadNits();
        }
    })



    //审核文章
    $(".audit_btn").click(function(){
        var $checkbox = $('.news_list tbody input[type="checkbox"][name="checked"]');
        var $checked = $('.news_list tbody input[type="checkbox"][name="checked"]:checked');
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



    //批量删除液氮罐
    $(".batchDel").click(function(){
        var $checkbox = $('.nits_list tbody input[type="checkbox"][name="checked"]');
        var $checked = $('.nits_list tbody input[type="checkbox"][name="checked"]:checked');
        if (user.nitDel == "可操作"){
            if($checkbox.is(":checked")){
                layer.confirm('确定删除选中的液氮罐？将一并删除该液氮罐中的麦管记录',{icon:3, title:'提示信息'},function(index){
                    var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        //删除数据
                        for(var j=0;j<$checked.length;j++){
                            for(var i=0;i<nitsData.length;i++){
                                if(nitsData[i].nitId == $checked.eq(j).parents("tr").find(".nit_del").attr("data-id")){
                                    $.ajax({
                                        url : "/nits/" + nitsData[i].nitId,
                                        type : "post",
                                        dataType : "json",
                                        success : function (data) {
                                            //layer.msg("删除成功！");
                                        }
                                    });
                                    nitsData.splice(i,1);
                                    nitsList(nitsData);
                                }
                            }
                        }
                        $('.nits_list thead input[type="checkbox"]').prop("checked",false);
                        form.render();
                        layer.close(index);
                        layer.msg("删除成功");
                    },2000);
                })
            }else{
                layer.msg("请选择需要删除的液氮罐");
            }
        }else {
            layer.msg("您没有批量删除液氮罐的权限！");
        }

    })

    //删除液氮罐
    $("body").on("click",".nit_del",function(){
        var _this = $(this);
        if (user.nitDel == "可操作"){
            layer.confirm('小主，你真的要删除我吗？将一并删除该液氮罐中的麦管记录',{icon:3, title:'提示信息'},function(index){
                //_this.parents("tr").remove();
                for(var i=0;i<nitsData.length;i++){
                    if(nitsData[i].nitId == _this.attr("data-id")){
                        $.ajax({
                            url : "/nits/" + nitsData[i].nitId,
                            type : "post",
                            dataType : "json",
                            success : function (data) {
                                layer.msg("删除成功！");
                            }
                        });
                        //同时在表格中移除被删除的信息
                        nitsData.splice(i,1);
                        nitsList(nitsData);
                    }
                }
                layer.close(index);
            });
        }else {
            layer.msg("您没有删除该液氮罐的权限！");
        }

    })

    function nitsList(that){
        //渲染数据
        function renderDate(data,curr){
            var dataHtml = '';
            if(!that){
                currData = nitsData.concat().splice(curr*nums-nums, nums);
            }else{
                currData = that.concat().splice(curr*nums-nums, nums);
            }
            if(currData.length != 0){
                for(var i=0;i<currData.length;i++){
                    dataHtml += '<tr>'
                        +'<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
                        +'<td>'+currData[i].nitNum+'</td>'
                        +'<td>'+currData[i].version+'</td>'
                        +'<td>'+currData[i].antibodyType+'</td>'
                        +'<td>'+currData[i].status+'</td>'
                        +'<td>'+currData[i].tubAmount+'</td>'
                        +'<td>'+currData[i].divepipeAmount+'</td>'
                        +'<td>'+currData[i].strawAmount+'</td>'
                        +'<td>'
                        +  '<a class="layui-btn layui-btn-mini nit_edit" data-id="'+currData[i].nitId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
                        +  '<a class="layui-btn layui-btn-danger layui-btn-mini nit_del" data-id="'+currData[i].nitId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
                        +'</td>'
                        +'</tr>';
                }
            }else{
                dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
            }
            return dataHtml;
        }

        //分页
        var nums = 10; //每页出现的数据量
        if(that){
            nitsData = that;
        }
        laypage({
            cont : "page",
            pages : Math.ceil(nitsData.length/nums),
            jump : function(obj){
                $(".nits_content").html(renderDate(nitsData,obj.curr));
                $('.nits_list thead input[type="checkbox"]').prop("checked",false);
                form.render();
            }
        })
    }
})*/
