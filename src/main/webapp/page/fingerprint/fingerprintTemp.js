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

/*function fingerprintMatch(template) {
    $.ajax({
        url : "/fingerprint/allTemp",
        type : "get",
        dataType : "json",
        success : function (data) {
            //console.log(data)
            var flag;
            for (var i=0; i<data.length; i++){
                console.log(data[i].fingerprintTemp)
                $.ajax( {
                    type : "POST",
                    url : "http://127.0.0.1:22001/ZKBIOOnline/fingerprint/verify",
                    dataType : "json",
                    data:JSON.stringify({'reg':data[i].fingerprintTemp,
                        'ver':template}),
                    async: false,
                    success : function(data)
                    {
                        //返回码
                        var ret = null;
                        ret = data.ret;
                        //接口调用成功返回时
                        if(ret == 0)
                        {
                            if (data.score == 100){
                                alert("登录成功！");
                            }else {
                                alert("指纹不匹配，请重新尝试！")
                            }
                        }
                        else
                        {
                            //alert("ret:" + data.ret);
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown)
                    {
                        alert("请安装指纹驱动或启动该服务!");
                    }
                });
            }

        }
    })

    console.log("调用方法后获取模板："+template)
}*/


function fingerprintMatch(template) {
    var info;
    $.ajax({
        url : "/fingerprint/allTemp",
        type : "get",
        dataType : "json",
        async: false,
        success : function (data) {
            info = data;
           /* for (var i=0; i<data.length; i++){
                console.log(data[i].fingerprintTemp)
                $.ajax( {
                    type : "POST",
                    url : "http://127.0.0.1:22001/ZKBIOOnline/fingerprint/verify",
                    dataType : "json",
                    data:JSON.stringify({'reg':data[i].fingerprintTemp,
                        'ver':template}),
                    async: false,
                    success : function(data)
                    {
                        //返回码
                        var ret = null;
                        ret = data.ret;
                        //接口调用成功返回时
                        if(ret == 0)
                        {
                            info = data.score;
                            /!*if (data.score == 100){
                                alert("登录成功！");
                            }else {
                                alert("指纹不匹配，请重新尝试！")
                            }*!/
                        }
                        else
                        {
                            //alert("ret:" + data.ret);
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown)
                    {
                        alert("请安装指纹驱动或启动该服务!");
                    }
                });
            }*/
        }
    });

    /*console.log(info);*/

    /*if (info == 100){
        alert("登录成功！");
    }else {
        alert("指纹不匹配，请重新尝试！")
    }*/
    doVerify(info,template);

    console.log("调用方法后获取模板："+template)
}


function doVerify(data,template) {
    console.log(data)
    console.log("123"+template)
    var flag;
    for (var i=0; i<data.length; i++){
        //console.log(regTemplate.length)
        $.ajax( {
            type : "POST",
            url : "http://127.0.0.1:22001/ZKBIOOnline/fingerprint/verify",
            dataType : "json",
            data:JSON.stringify({'reg':data[i].fingerprintTemp,
                'ver':template}),
            async: false,
            success : function(data)
            {
                //返回码
                var ret = null;
                ret = data.ret;
                //接口调用成功返回时
                if(ret == 0)
                {
                    flag = data.score;
                }
                else
                {
                    //alert("ret:" + data.ret);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown)
            {
                alert("请安装指纹驱动或启动该服务!");
            }
        });
    }

    console.log(flag)
    if (flag == 100){
        alert("登录成功！");
    }else {
        alert("指纹不匹配，请重新尝试！")
    }
}

function fingerprintRegister(template) {
    $.ajax({
        url : "/fingerprint/register",
        type : "post",
        dataType : "json",
        data : {
            fingerprintTemp : template,
            userId : user.userId
        },
        success : function (data) {
            console.log("调用方法后获取模板："+template)
            console.log(user.nickname)
        }
    })

}