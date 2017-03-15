/**
 * Created by outstudio on 16/4/22.
 */
"use strict";
window.App = new Object();

window.Deploy = new Object();

window.App._instances = new Object();

window.App.getModel = function () {
    return "debug";
}
window.App.getLoadModel = function () {
    return "true";
}
window.App.load = function () {
    $("#loading").fakeLoader({prolong: true});
}
window.App.unload = function () {
    $("#loading").fadeOut();
}

window.Deploy.getResourceDeployPrefix = function () {
    return "";
}

window.App.getResourceDeployPrefix = function () {
    return "";
}

window.App.getDownloadDeployDeployPrefix = function () {
    return "";
}

window.App.getAppRoute = function () {
    return "";
}
window.App.swing = function (ob) {
    var $ob;
    if (Object.prototype.toString.call(ob) == '[object String]')
        $ob = $(ob);
    $ob.addClass('animated swing');
    $ob.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
            $ob.removeClass('animated swing');
            App._instances[$ob.selector] = setTimeout("App.swing('" + ob + "')", 1000);
        });
}
window.App.unSwing = function (ob) {
    var $ob;
    if (Object.prototype.toString.call(ob) == '[object String]')
        $ob = $(ob);
    if ($ob !== undefined && $ob !== null) {
        if (App._instances[ob] !== undefined && App._instances[ob] !== null) {
            clearTimeout(App._instances[ob]);
            delete App._instances[ob];
        }
    }

}
window.App.finish=function(ob) {
    if(ob!==undefined&&ob!==null)
    {
        var ele = document.getElementById('_mustdone');
        //fit to advance web-browser such as firefox,chrome
        var event=document.createEvent('CustomEvent');
        event.initCustomEvent('_finish',false,true,{label:ob.label,route:ob.route});
        ele.dispatchEvent(event);
    }
};

window.App.remodal=new Object();
window.App.remodal.inst=null;
window.App.remodal.content=function(content){
    var remodal=$("[data-remodal-id='re-modal']");
    $("#modal1Title").text(content);
}
window.App.remodal.show=function(){
    window.App.remodal.inst.open();
}
window.App.remodal.hide=function(){
    window.App.remodal.inst.close();
}

