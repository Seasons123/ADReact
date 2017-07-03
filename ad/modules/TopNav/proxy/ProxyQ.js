import config from '../../config.json';

var ProxyQ = {
    getProxyServer:function(){
        if (config.devServer !== undefined && config.devServer !== null)
        {
            if (config.devServer.proxy !== undefined && config.devServer.proxy !== null) {
                //只添加第一个proxy的值
                var proxyServer
                for (var field in config.devServer.proxy) {
                    var re = /\/(.*?)\//;
                    proxyServer= re.exec(field)[1];
                    break;
                }
                return proxyServer;
            }
        }
    },
    keyInArray: function (val, key, arr) {
        var index = -1;
        arr.map(function (item, i) {
            if (item[key] == val) {
                index = i;
            }

        });
        if (index !== -1) {
            return index;
        }
        else {
            return false;
        }
    },

    getPrefix:function(){
        if(App.getModel()=="debug")
        {
            return "/"+this.getProxyServer();
        }
        else
            return "";

    },
    es6Props: function (fields, ob) {
        var filter = new Object();
        var other = new Object();
        fields.map(function (field, i) {
            if (ob[field] !== undefined && ob[field] !== null)
                filter[field] = ob[field];
            else
                other[field] = ob[field];
        });
        return ({filter: filter, other: other});

    },
    queryNode: {

        login:function(type,url,params,dataType,callback){
            var proxyUrl=url;
            var user=params;

            $.ajax({
                type    : type !== undefined && type !== null ? type : 'POST',
                url     : proxyUrl,
                dataType: dataType !== undefined && dataType !== null ? dataType : 'json',
                data:"grant_type=password&password=" + user.password + "&username=" +user.username,
                headers: {
                    'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache   : false,
                success : function (response) {


                    if (callback !== undefined && callback !== null)
                        callback(response);
                },
                error   : function (xhr, status, err) {

                    console.error("error=" + err);
                    var $modal=$("#root_modal");
                    var content;
                    var errType;
                    if(xhr.status==404||xhr.status=="404")
                    {
                        content="错误描述:        "+xhr.responseText;
                        errType="";
                        switch(xhr.statusText)
                        {
                            case "Not Found":
                                errType="发生错误:"+"path not found";
                                break;
                            default:
                                break;
                        }
                    }
                    else if (xhr.status == 502 || xhr.status == "502") {
                        content = "错误描述:        " + xhr.responseText;
                        errType = "发生错误:" + "无效的服务器指向";

                    }
                    else {

                    }
                    $modal.find(".modal-body").text(content);
                    $modal.find(".modal-title").text(errType);
                    $modal.modal('show');
                }
            });
        }


    },
    queryHandle: function (type, url, params, dataType, callback) {
        var proxyUrl = url;
        if(App.getModel()=="debug")
        {
            proxyUrl = "/" + this.getProxyServer() + proxyUrl;
        }
        if (App.getLoadModel() == "true") {
            App.load();
        }
        $.ajax({
            type    : type !== undefined && type !== null ? type : 'POST',
            url     : proxyUrl,
            dataType: dataType !== undefined && dataType !== null ? dataType : 'json',
            data    : params,
            cache   : false,
            success : function (response) {
                //取消加载遮罩
                if (App.getLoadModel() == "true") {
                    App.unload();
                }
                var $modal=$("#root_modal");
                var content;
                var errType="";
                var catched=false;
                if((response.re!==undefined&&response.re!==null)&&(response.re==-1||response.re=="-1"||response.re==2||response.re=="2"))
                {
                    if(response.content!==undefined&&response.content!==null&&response.content!="")
                    {
                        catched = true;
                        content = response.content;
                    }
                }else{
                    if (response.re!=1&&
                        response.arr == undefined && response.arr == null &&
                        response.array==undefined&&response.array==null &&
                        response.data == undefined && response.data == null)
                    {
                        content="警告:   数据为空";
                        catched=true;
                    }
                    else{
                        if(Object.prototype.toString.call(response.data)=='[object Array]'&&response.data.length<1)
                        {
                            content = "警告:   数据为空";
                            catched=true;
                        }
                    }
                }
                if(catched==true)
                {   if(response.re==2||response.re=="2"){
                    $modal.find(".modal-body").html(content);
                    }else {
                    $modal.find(".modal-body").text(content);
                    }
                    $modal.find(".modal-title").text(errType);
                    $modal.modal("show");

                }

                if (callback !== undefined && callback !== null)
                    callback(response);
            },
            error   : function (xhr, status, err) {
                if (App.getLoadModel() == "true") {
                    App.unload();
                }
                console.error("error=" + err);
                var $modal=$("#root_modal");
                var content;
                var errType;
                if(xhr.status==404||xhr.status=="404")
                {
                    content="错误描述:        "+xhr.responseText;
                    errType="";
                    switch(xhr.statusText)
                    {
                        case "Not Found":
                            errType="发生错误:"+"path not found";
                            break;
                        default:
                            break;
                    }
                }
                else if (xhr.status == 502 || xhr.status == "502") {
                    content = "错误描述:        " + xhr.responseText;
                    errType = "发生错误:" + "无效的服务器指向";

                }
                else {

                }
                $modal.find(".modal-body").text(content);
                $modal.find(".modal-title").text(errType);
                $modal.modal('show');
            }
        });

    }


};


module.exports = ProxyQ;