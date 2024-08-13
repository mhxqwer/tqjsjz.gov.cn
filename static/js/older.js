var wza_ResourcePath = "https://www.sjz.gov.cn:9791/resource/site/1301000003/wza/";
var wza_Domain = "www.sjz.gov.cn";
var actual_domain = window.location.hostname;
if(wza_Domain.includes(actual_domain)){
    wza_Domain = actual_domain;
}
var link = document.createElement('link'); 
link.setAttribute('rel', 'stylesheet'); 
link.setAttribute('href', wza_ResourcePath+'older.css');
document.body.appendChild(link); 

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', wza_ResourcePath + 'jquerys.js'); 
document.body.appendChild(script);

 initOlder();
$(function () {
    initOlder();
})


function initOlder(){
setTimeout(function(){
    var olderflag = this.getCookie("olderflag");
    if (olderflag == "1") {
        $("#olderSwitch").text("关闭适老模式")
        $("body").addClass("olderClassX");

    } else {
        $("#olderSwitch").text("进入适老模式")
        $("body").removeClass("olderClassX");
    }
}, 500);
}

function setOlder(){
    var olderflag = this.getCookie("olderflag");
    if (olderflag == "0" || olderflag == null || olderflag == undefined) {
        setCookie("olderflag", "1");
        setCookie("wzaStatus", "true");
    } else {
        setCookie("olderflag", "0");
    }
    window.location.reload();
}

function getCookie(name) {
    var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
		begin = dc.indexOf(cname);
		if (begin != -1) {
			begin += cname.length;
			end = dc.indexOf(";", begin);
			if (end == -1) end = dc.length;
				return unescape(dc.substring(begin, end));
		}
	}
	return null;
}
function setCookie(name, value) {
    var days = 10;
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + ";path=/" + ";domain=" + wza_Domain;
}
