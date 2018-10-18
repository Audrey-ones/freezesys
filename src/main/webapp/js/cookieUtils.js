//设置cookie
function setCookie(name,value) {
    var exp=new Date();
    exp.setTime(exp.getTime()+2*24*60*60*1000);//有效时间
    document.cookie=name+"="+JSON.stringify(value);
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