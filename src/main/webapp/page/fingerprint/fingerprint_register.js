//主页获取保存在cookie里的用户昵称
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

/**
 * 检查用户是否已经登记指纹
 */
checkIsRegister();
function checkIsRegister() {
    $.ajax({
        url : "/fingerprint/check",
        type : "post",
        dataType : "json",
        data : {
            userId : user.userId
        },
        success : function (data) {
            console.log(data)
            if (data != null){
                /*$("#tip").text("您已经进行指纹登记了！请勿重复操作！");
                $("#tip_flag").css("display","block");*/
                $("#isRegister").css("display","block");
            }else{
                $("#tip_flag").css("display","block");
                $("#fpRegisterDiv").css("display","block");
            }
        }
    })
}

/**
 * 获取所有用户的指纹模板，赋值给info作为形参传递
 */
var info;
function getAllTemplate() {
    $.ajax({
        url : "/fingerprint/allTemp",
        type : "get",
        dataType : "json",
        async: false,
        success : function (data) {
            info = data;
        }
    });
    return info;
}

/**
 * 指纹登记，把指纹模板存进数据库
 * @param template
 */
function fingerprintRegister(data,template) {
    //设置一个标志，判断循环比对结束后时候是否找到相应的指纹模板信息
    var flag_ = false;
    for (var i=0; i<data.length; i++){
        //调用指纹比对的回调函数
        doVerify(data[i].fingerprintTemp,template,function (result) {
            console.log(result)
            if (result <= 100){
                flag_ = true;
                console.log("执行到啦，k的值为："+flag_);
            }
        })
    }
    if (flag_ == true){
        swal({
            title:'指纹登记失败，请换一个手指登记！',
            type:'error',
            timer:1000,
            showConfirmButton:false
        });
    }else {
        $.ajax({
            url : "/fingerprint/register",
            type : "post",
            dataType : "json",
            data : {
                fingerprintTemp : template,
                userId : user.userId
            },
            success : function (data) {
                //console.log("调用方法后获取模板："+template)
                //console.log(user.nickname)
                swal({
                    title:'指纹登记成功！',
                    type:'success',
                    timer:1000,
                    showConfirmButton:false
                });
                setTimeout(function () {
                    location.reload();
                },2000);
            }
        })
    }


}
