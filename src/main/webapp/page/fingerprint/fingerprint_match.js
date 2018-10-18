
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


function fingerprintMatch(data,template) {
    //设置一个标志，判断循环比对结束后时候是否找到相应的指纹模板信息
    var flag_ = false;
    var fingerprint = null;
    for (var i=0; i<data.length; i++){
        //调用指纹比对的回调函数
        doVerify(data[i].fingerprintTemp,template,function (result) {
            console.log(result)
            if (result <= 100){
                fingerprint = data[i];
                flag_ = true;
                console.log("执行到啦，k的值为："+flag_);
            }
        })
    }
    console.log(fingerprint);
    if (flag_ == true){
        $.ajax({
            url : "/fingerprint/user",
            type : "post",
            dataType : "json",
            data : {
                userId : fingerprint.userId
            },
            success : function (data) {
                console.log(data);
                if (data.user != null){
                    setCookie("user",data.user);//用户基本信息计入cookie
                    setCookie("token",data.token);//令牌token计入cookie
                    swal({
                        title:'登录成功！',
                        type:'success',
                        timer:1000,
                        showConfirmButton:false
                    });
                    setTimeout(function () {
                        location.href='index.html';
                    },2000);
                }

            }
        })

    }else {
        swal({
            title:'指纹不匹配，请重新尝试！',
            type:'error',
            timer:1000,
            showConfirmButton:false
        });
    }
}

/**
 * 把用户信息写入cookie
 * @param name
 * @param value
 */
function setCookie(name,value) {
    var exp=new Date();
    exp.setTime(exp.getTime()+2*24*60*60*1000);//有效时间
    document.cookie=name+"="+JSON.stringify(value);
}



/*function fingerprintMatch(template) {
    /!*var info;
    $.ajax({
        url : "/fingerprint/allTemp",
        type : "get",
        dataType : "json",
        async: false,
        success : function (data) {
            info = data;
        }
    });

    doVerify(info,template);

    console.log("调用方法后获取模板："+template)*!/
}*/


/*function doVerify(data,template) {
    console.log(data)
    console.log("123"+template)
    var flag;
    for (var i=0; i<data.length; i++){
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
                    if (flag == 100){
                        /!*alert("登录成功！");*!/
                        location.href='../../index.html';
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

    /!*console.log(flag)
    if (flag == 100){
        alert("登录成功！");
    }else {
        alert("指纹不匹配，请重新尝试！")
    }*!/
}*/

