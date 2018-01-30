layui.config({
    base : "js/"
}).use(["form","layer","jquery","laydate"],function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;
    
    var addPatientArray = [],addPatient;
    form.on("submit(addPatient)",function (data) {
        //是否添加过信息
        if (window.sessionStorage.getItem("addPatient")){
            addPatientArray = JSON.parse(window.sessionStorage.getItem("addPatient"))
        }

        addPatient = '{"medicalRecord":"'+$(".medicalRecord").val()+'",';
        addPatient += '"femaleName":"'+$(".femaleName").val()+'",';
        addPatient += '"maleName":"'+$(".maleName").val()+'",';
        addPatient += '"femaleIdNum":"'+$(".femaleIdNum").val()+'",';
        addPatient += '"maleIdNum":"'+$(".maleIdNum").val()+'",';
        addPatient += '"address":"'+$(".address").val()+'",';
        addPatient += '"phone":"'+$(".phone").val()+'",';
        addPatient += '"remark":"'+$(".remark").val()+'"}';
        addPatientArray.unshift(JSON.parse(addPatient));
        window.sessionStorage.setItem("addPatient",JSON.stringify(addPatientArray));
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍后',{icon: 16,time: false,shade: 0.8});
        setTimeout(function () {
            top.layer.close(index);
            top.layer.msg("添加病人信息成功！");
            layer.closeAll("iframe");
            //刷新父页面
            parent.location.reload();
        },2000);
        return false;

    })
})