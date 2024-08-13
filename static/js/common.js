jQuery(function($) { // jQuery UI日期选择器Datepicker的中文设置
	$.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '上个月',
		nextText: '下个月',
		currentText: '今天',
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
			'十月', '十一月', '十二月'],
		monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
			'九月', '十月', '十一月', '十二月'],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		yearSuffix: '年',
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		changeYear: true,
		changeMonth: true
	};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

window.onload = function() {
	$("#beginDate, #endDate, #birthday").datepicker();
}

// 获取url内容并给对象赋值 geturl("url地址", "c978e741-fe75-437b-9e06-1d7bb92b1eeb");
function getUrlVal(url, id) { // 注意：参数包含中文时记得用encodeURI()转码
	$.ajax({
		crossOrigin: true,
		url: url,
		success: function(data) {
			$("#" + id).html(data);
		},
		error: function(req, text, type) {
			alert("操作失败，" + req + "/" + text + "/" + type + "。");
		}
	});
}

function getObjectPro(obj, key) { // 获得对象的某个属性的值ֵ
	for (var name in obj) {
		if (key == name) {
			return obj[name];
		}
	}
}

function strToJsonObj(s) {
	return JSON.parse(s);
}

function jsonObjToStr(jsonObj) {
	return JSON.stringify(jsonObj);
}

function isJSON(s) {
	if (typeof s == 'string') {
		try {
			var obj = JSON.parse(s);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	}
	return false;
}

function checkJSON(s) {
	alert(isJSON(s) ? "JSON格式正确" : "JSON格式错误");
}

function parseJSON(str) { // 格式化为易于阅读的HTML高亮的json字符串
	str = JSON.stringify(JSON.parse(str), null, 2); // 设置缩进为2个空格
	str = str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function(match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
}

// 返回密码强度级别  
function getPwdLevel(pwd) {
	if (pwd.length < 8)
		return 0;
	m = 0;
	for (i = 0; i < pwd.length; i++) {
		m |= checkCharMode(pwd.charCodeAt(i));
	}
	return bitTotal(m);
}

// 判断输入密码的类型  
function checkCharMode(one) {
	if (one >= 48 && one <= 57) // 数字  
		return 1;
	if (one >= 65 && one <= 90) // 大写  
		return 2;
	if (one >= 97 && one <= 122) // 小写  
		return 4;
	else
		return 8;
}

// 计算密码模式
function bitTotal(num) {
	m = 0;
	for (i = 0; i < 4; i++) {
		if (num & 1) m++;
		num >>>= 1;
	}
	return m;
}

function isMobile() {
	var o = document.getElementById("mobile");
	if (!o || !o.value) {
		alert("请输入手机号码");
		return false;
	}
	return isMobileX(o.value);
}

function isMobileX(mobileCode) {
	var r = false;
	if (!mobileCode) {
		alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"); // 请填写正确的手机号码
		return r;
	}
	r = !!mobileCode.match(/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/);
	if (!r) {
		alert("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"); // 请填写正确的手机号码
		return r;
	}
	return r;
}

function isValidDate(s) {
	return new RegExp(
		"^[1-2]\\d{3}-(0?[1-9]||1[0-2])-(0?[1-9]||[1-2][0-9]||3[0-1])$")
		.test(s); // yyyy-MM-dd
}

function maskNum(o) {
	if (!o || o.value * 1 < 0) {
		return;
	}
	checkInputNum(o);
}

function checkInputNum(o) {
	o.value = o.value.replace(/[^\d]/g, '');
	if (o.min && (o.value * 1 < o.min * 1)) {
		o.value = o.min * 1;
	}
	if (o.max && (o.value * 1 > o.max * 1)) {
		o.value = o.max * 1;
	}
}

function toggle(id) {
	$("#" + id).toggle();
}

function getUrlParamValue(name) { // 获取url中参数值
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substring(1).match(reg);  // 匹配目标参数
	if (r != null) {
		return decodeURI(r[2]);
	}
	return "";
}

var highLightGet_IK = ""; // 全局变量 - 避免重复读取分词

function highLight(id) {
	var q = getUrlParamValue("q");
	if (!q) {
		q = $.cookie("q");
	}
	var s = $("#" + id).html();
	if (!q || !s) {
		return;
	}
	$.cookie("q", q);
	if (s.indexOf(q) > -1) { // 若内容中包含搜索关键字则直接高亮此关键字
		highLighIk(id, s, q);
	} else {
		if (!highLightGet_IK) { // 分词记录为空
			highLightGet("/ik", id, s, q);
		}
		highLighCycle(id, s); // 高亮多个分词
	}
}

function highLightGet(url, id, s, q) { // 分词高亮
	$.ajax({
		url: url + "?q=" + encodeURI(q),
		type: "GET",
		async: false,
		success: function(result) {
			// alert("ik => " + result);
			highLightGet_IK = result;
		},
		error: function(error) {
			alert("操作失败，" + jsonObjToStr(error) + "。");
		}
	})
}

function highLighCycle(id, s) { // 循环高亮分词
	if (!highLightGet_IK) {
		return;
	}
	var array = highLightGet_IK.split(" ");
	array.sort(); // 分词按照长度进行排序
	for (var i = array.length-1; i >= 0; i--) {
		var q = array[i];
		if (!q || s.indexOf(q) < 0 || q.length < 1) { // 分词为空或长度小于1或内容不包含分词
			continue;
		}
		s = highLighIk(id, s, q);
	}
}

function highLighIk(id, s, q) { // 高亮分词
	var x = "<span style='color: red;'>" + q + "</span>";
	s = s.split(q).join(x);
	$("#" + id).html(s);
	return s;
}

function getItemVal(id) {
	var s = "";
	var fo = $("#" + id);
	var type = fo.attr("type");
	if (type == "radio" || type == "checkbox") { // 属于单选和多选类型
		$('input[id="' + id + '"]:checked').each(function() {
			v = ($(this).val() + "").split(",")[0]; // 多选按钮初始化时存在多个值连在一起的情况a,b,c
			// alert("v => " + v);
			if (s.indexOf(v) == -1) { // 不加入重复值
				s += (s.length > 0 ? "," : "") + v;
			}
		});
	} else {
		s = fo.val();
	}
	return s;
}

function setItemVal(id, v) {
	var fo = $("#" + id);
	var type = fo.attr("type");
	switch (type) {
		case "radio": $('input[id="' + id + '"][value="' + v + '"]').attr("checked", 'checked'); break;
		case "checkbox":
			setCheckboxVal(id, false);
			var sv = v.split(",");
			for (var i = 0; i < sv.length; i++) {
				// alert(i + " -> " +sv[i]);
				$("input[id='" + id + "']:checkbox[value='" + sv[i] + "']").attr('checked', true);
			}
			break;
		default: fo.val(v); break;
	}
}

function setCheckboxVal(id, v) { // 设置某个多选框的所有值 - 全选或全取消
	$('input:checkbox[id=' + id + ']').attr("checked", v);
}

function remainWords(o, remainId) { // 显示某个输入控件还可以输入多少个字
	var contentRemaining = document.getElementById(remainId);
	if (o && contentRemaining) {
		contentRemaining.innerText = o.maxLength - o.value.length;
	}
}

// 限制上传文件的大小
function limtFileSize(id, maxNum) { // 限制 maxNum MB
	if (!maxNum) {
		maxNum = 10;
	}
	var fo = $("#" + id);
	file = fo[0].files[0];
	var size = file.size;
	var maxSize = 1048576; // 1 MB
	if (size > maxSize * maxNum) {
		alert("上传文件限制最大为 " + maxNum + " MB");
		fo.val(""); // 清除已选择的文件
	}
}

// 按照 查询编码/姓名@手机号码 进行查询：http://域名/s?c=c3f668cf-9052-437d-a1b1-5015a1048006&x=1&q=20231216105011311@testuser
// url传参：http://域名/s?c=c3f668cf-9052-437d-a1b1-5015a1048006&x=1
function searchGuestbook(url) {
	if (!url) {
		return;
	}
	var guestCode = $("#guestCode").val();
	var guestName = $("#guestName").val();
	if (guestCode.length < 17 || guestCode.length > 19) { // 查询编码长度为17~19
		alert("请输入正确的查询编码");
		return;
	}
	if (guestName.length < 1) {
		alert("请输入留言人姓名");
		return;
	}
	location.href = url + "&q=" + guestCode +"@" + guestName;
}

// 按照 查询编码/姓名@手机号码 进行查询：http://域名/s?c=c3f668cf-9052-437d-a1b1-5015a1048006&x=1&q=20231216105011311@testuser@手机号码
// url传参：http://域名/s?c=c3f668cf-9052-437d-a1b1-5015a1048006&x=1
function searchGuestbookByMobile(url) {
	if (!url) {
		return;
	}
	var guestCode = $("#guestCode").val();
	var guestName = $("#guestName").val();
	var guestMobile = $("#guestMobile").val();
	if (guestCode.length < 17 || guestCode.length > 19) {
		alert("请输入正确的查询编码");
		return;
	}
	if (guestName.length < 1) {
		alert("请输入留言人姓名");
		return;
	}
	if (!isMobileX(guestMobile)) {
		return;
	}
	location.href = url + "&q=" + guestCode +"@" + guestName +"@" + guestMobile;
}