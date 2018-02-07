layui.config({
    base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    //加载页面数据
    var nitsData = '';
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
                    success : function(data){
                        if(window.sessionStorage.getItem("addNits")){
                            var addNits = window.sessionStorage.getItem("addNits");
                            nitsData = JSON.parse(addNits).concat(data);
                        }else{
                            nitsData = data;
                        }
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
            layer.msg("请输入需要查询的内容");
        }
    })

    //添加文章
    $(".nitsAdd_btn").click(function(){
        var index = layui.layer.open({
            title : "添加液氮罐",
            type : 2,
            content : "nitAdd.html",
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

    //批量删除
    $(".batchDel").click(function(){
        var $checkbox = $('.news_list tbody input[type="checkbox"][name="checked"]');
        var $checked = $('.news_list tbody input[type="checkbox"][name="checked"]:checked');
        if($checkbox.is(":checked")){
            layer.confirm('确定删除选中的信息？',{icon:3, title:'提示信息'},function(index){
                var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
                setTimeout(function(){
                    //删除数据
                    for(var j=0;j<$checked.length;j++){
                        for(var i=0;i<nitsData.length;i++){
                            if(nitsData[i].newsId == $checked.eq(j).parents("tr").find(".news_del").attr("data-id")){
                                nitsData.splice(i,1);
                                nitsList(nitsData);
                            }
                        }
                    }
                    $('.news_list thead input[type="checkbox"]').prop("checked",false);
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
    $("body").on("click",".news_edit",function(){  //编辑
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

    //编辑选中的液氮罐信息
    $("body").on("click",".nit_edit",function () {
        var _this = $(this);
        for(var i=0; i<nitsData.length; i++){
            if (nitsData[i].nitId == _this.attr("data-id")){
                //获取当前点击的病人ID
                var nitId = nitsData[i].nitId;
                console.log(nitId)
                var index = layui.layer.open({
                    title : "编辑病人信息",
                    type : 2,
                    content : "nitEdit.html",
                    success : function (layero,index) {
                        //获取子页面
                        var body = layui.layer.getChildFrame('body', index);
                        body.find("#nitId").val(nitId);
                        $.ajax({
                            url : "/nits/"+nitId,
                            type : "get",
                            dataType : "json",
                            success : function (data) {
                                console.log(data)
                                body.find(".nitNum").val(data.nitNum);
                                body.find(".version").val(data.version);
                                /*$(".sampleType option").eq($(".sampleType").val()).text()*/
                                body.find(".antibodyType").val(data.antibodyType);
                                body.find(".status option").eq(data.status).text();
                                body.find(".remark").val(data.remark);
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

    //删除液氮罐
    $("body").on("click",".nit_del",function(){
        var _this = $(this);
        layer.confirm('小主，你真的要删除我吗？',{icon:3, title:'提示信息'},function(index){
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
                        +  '<a class="layui-btn layui-btn-mini nit_edit" data-id="'+data[i].nitId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
                        +  '<a class="layui-btn layui-btn-danger layui-btn-mini nit_del" data-id="'+data[i].nitId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
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
})
