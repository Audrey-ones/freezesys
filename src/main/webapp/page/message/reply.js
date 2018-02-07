var $;
layui.config({
    base : "../../js/"
}).use(['form','layer','layedit'],function(){
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        layedit = layui.layedit;
    $ = layui.jquery;

    //消息回复
    var editIndex = layedit.build('msgReply',{
        tool: ['face'],
        height:100
    });

    //提交回复
    var message = [];
    $(".send_msg").click(function(){
        if(layedit.getContent(editIndex) != ''){
            var replyHtml = '',msgStr;
            replyHtml += '<tr>';
            replyHtml += '  <td class="msg_info">';
            replyHtml += '    <img src="../../images/face.jpg" width="50" height="50">';
            replyHtml += '    <div class="user_info">';
            replyHtml += '        <h2>请叫我马哥</h2>';
            replyHtml += '        <p>'+layedit.getContent(editIndex)+'</p>';
            replyHtml += '    </div>';
            replyHtml += '  </td>';
            replyHtml += '  <td class="msg_time">'+formatTime(new Date())+'</td>';
            replyHtml += '  <td class="msg_reply"></td>';
            replyHtml += '</tr>';
            $(".msgReplyHtml").prepend(replyHtml);
            $("#LAY_layedit_1").contents().find("body").html('');
        }else{
            layer.msg("请输入回复信息");
        }
    })
})

function formatTime(_time){
    var year = _time.getFullYear();
    var month = _time.getMonth()+1<10 ? "0"+(_time.getMonth()+1) : _time.getMonth()+1;
    var day = _time.getDate()<10 ? "0"+_time.getDate() : _time.getDate();
    var hour = _time.getHours()<10 ? "0"+_time.getHours() : _time.getHours();
    var minute = _time.getMinutes()<10 ? "0"+_time.getMinutes() : _time.getMinutes();
    return year+"-"+month+"-"+day+" "+hour+":"+minute;
}


