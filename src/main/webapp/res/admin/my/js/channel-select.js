//生成下拉框数据
var channelData = {};
$.ajax({
    type: "POST",
    url: "channel/list.action",
    async: false,
    data: {paginate: false},
    success: function (result) {
        channelData = result.data;
    }
});

function createOption(obj, disabledOptions,initText) {
    var options = "<option value=''>"+initText+"</option>";
    $.each(channelData, function (i) {
        if (this.channelId == 1 || this.channelId == 2) {
            //去掉推荐和热点
            return true;
        }
        // $.inArray(ele.arr);判断数组是否包含某个元素 返回-1表示不包含 包含则返回元素下标
        var index = $.inArray(this.channelId, disabledOptions);
        if (index == -1) {
            options += "<option  value=" + this.channelId + ">" + this.channelName + "</option>";
        }
        else {
            options += "<option disabled value=" + this.channelId + ">" + this.channelName + "</option>";
        }

    });
    obj.html(options);
}

createOption($("#channel-1"),[],'请选择分类一');


$("#add-channel").click(function () {
    var c2 = $("#channel-2-div").css("display");
    var c3 = $("#channel-3-div").css("display");
    var v1 = $("#channel-1").val();
    var v2 = $("#channel-2").val();
    var form = layui.form;
    if (v1 == "") {
        parent.layer.open({
            icon: 2,
            title: '消息'
            , content: '请先选择分类一'
        });
    }
    else if (c2 == "none") {
        createOption($("#channel-2"),[parseInt(v1)],'请选择分类二');
        //重新渲染
       // form.render();
        form.render('select');
       // form.render('select', "channel-2");
        $("#channel-2-div").show();

    }
    else if (v2 == "") {
        parent.layer.open({
            icon: 2,
            title: '消息'
            , content: '请先选择分类二'
        });
    }
    else if (c3 == "none") {
        createOption($("#channel-3"),[parseInt(v1),parseInt(v2)],'请选择分类三');
        //重新渲染
        form.render('select');
        $("#channel-3-div").show();
        $("#add-channel-div").hide();
    }
});
