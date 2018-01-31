layui.config({
    base:"/js"
}).use(["form","layer","jquery","laypage"],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        laypage = layui.laypage,
        $ = layui.jquery;

    var patientData = '';
    $.get("http://localhost:8080/patients",function(data){
        //正常加载病人信息
        patientData = data;
        if (window.sessionStorage.getItem("addPatient")){
            var addPatient = window.sessionStorage.getItem("addPatient");
            patientData = JSON.parse(addPatient).concat(patientData);
        }
        //执行加载数据的方法
        patientsList();
    })

    //根据病历号、男女方姓名、男女方身份证、住址、电话进行查询
    $(".search_btn").click(function () {
        var patientsArray = [];
        if ($(".search_input").val() != ''){
            var index = layer.msg('查询中，请稍后',{icon: 16, time: false, shade: 0.8});
            setTimeout(function () {
               $.ajax({
                   url : "http://localhost:8080/patients",
                   type : "get",
                   dataType : "json",
                   success : function (data) {
                       if (window.sessionStorage.getItem("addPatient")){
                           var addPatient = window.sessionStorage.getItem("addPatient");
                           patientData = JSON.parse(addPatient).concat(data);
                       }else {
                           patientData = data;
                       }
                       for (var i=0; i<patientData.length; i++){
                           var patientStr = patientData[i];
                           var selectStr = $(".search_input").val();
                           function changeStr(data) {
                               var dataStr = '';
                               var showNum = data.split(eval("/" + selectStr + "/ig")).length - 1;
                               if (showNum > 1) {
                                   for (var j = 0; j < showNum; j++) {
                                       dataStr += data.split(eval("/" + selectStr + "/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
                                   }
                                   dataStr += data.split(eval("/" + selectStr + "/ig"))[showNum];
                                   return dataStr;
                               } else {
                                   dataStr = data.split(eval("/" + selectStr + "/ig"))[0] + "<i style='color: #03c339;font-weight: bold;'>" + selectStr + "</i>" + data.split(eval("/" + selectStr + "/ig"))[1];
                                   return dataStr;
                               }
                           }
                               //病历号
                               if (patientStr.medicalRecord.indexOf(selectStr)>-1){
                                   patientStr["medicalRecord"] = changeStr(patientStr.medicalRecord);
                               }
                               if (patientStr.femaleName.indexOf(selectStr)>-1){
                                   patientStr["femaleName"] = changeStr(patientStr.femaleName);
                               }
                               if (patientStr.maleName.indexOf(selectStr)>-1){
                                   patientStr["maleName"] = changeStr(patientStr.maleName);
                               }
                               if (patientStr.femaleIdNum.indexOf(selectStr)>-1){
                                   patientStr["femaleIdNum"] = changeStr(patientStr.femaleIdNum);
                               }
                               if (patientStr.maleIdNum.indexOf(selectStr)>-1){
                                   patientStr["maleIdNum"] = changeStr(patientStr.maleIdNum);
                               }
                               if (patientStr.address.indexOf(selectStr)>-1){
                                   patientStr["address"] = changeStr(patientStr.address);
                               }
                               if (patientStr.phone.indexOf(selectStr)>-1){
                                   patientStr["phone"] = changeStr(patientStr.phone);
                               }
                               if (patientStr.medicalRecord.indexOf(selectStr)>-1 || patientStr.femaleName.indexOf(selectStr)>-1
                                   || patientStr.maleName.indexOf(selectStr)>-1 || patientStr.femaleIdNum.indexOf(selectStr)>-1
                                   || patientStr.maleIdNum.indexOf(selectStr)>-1 || patientStr.address.indexOf(selectStr)>-1
                                   || patientStr.phone.indexOf(selectStr)>-1){
                                   patientsArray.push(patientStr);
                               }
                       }
                       patientData = patientsArray;
                       patientsList(patientData);
                   }

               })

               layer.close(index);
           },2000);
        }else {
            layui.msg("请输入需要查询的内容");
        }
    })


    //添加病人信息
    $(".patientAdd_btn").click(function () {
        var index = layui.layer.open({
            title : "添加病人信息",
            type : 2,
            content : "patientAdd.html",
            success : function (layero,index) {

            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })

    //加载数据
    function patientsList(that) {
        //渲染数据
        function renderData(data,curr) {
            var dataHtml = '';
            if (!that){
                currData = patientData.concat().splice(curr*nums-nums, nums);
            }else {
                currData = that.concat().splice(curr*nums-nums, nums);
            }
            if (currData.length != 0){
                for (var i=0; i<currData.length; i++){
                    dataHtml += '<tr>'
                    /*+ '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>>'*/
                    + '<td>' + currData[i].medicalRecord + '</td>>'
                    + '<td>' + currData[i].femaleName + '</td>'
                    + '<td>' + currData[i].maleName + '</td>'
                    + '<td>' + currData[i].femaleIdNum + '</td>'
                    + '<td>' + currData[i].maleIdNum + '</td>'
                    + '<td>' + currData[i].address + '</td>'
                    + '<td>' + currData[i].phone + '</td>'
                    + '<td>' + currData[i].remark + '</td>'
                    + '<td>'
                    +   '<a class="layui-btn layui-btn-mini patient_edit"><i class="iconfont icon-edit"></i>编辑 </a>'
                    +   '<a class="layui-btn layui-btn-danger layui-btn-mini patient_del" data-id="'+data[i].patientId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
                    + '</td>'
                    + '</tr>>';
                }
            }else {
                dataHtml += '<tr><th colspan="12">暂无数据</th></tr>'
            }
            return dataHtml;
        }

        //分页
        var nums = 10;//每页出现的数据量
        if (that){
            patientData = that;
        }
        laypage({
            cont : "page",
            pages : Math.ceil(patientData.length/nums),
            jump : function (obj) {
                $(".patient_content").html(renderData(patientData,obj.curr));
                $('.patients_list thead input[type="checked"]').prop("checked",false);
                form.render();
            }
        })
    }
})