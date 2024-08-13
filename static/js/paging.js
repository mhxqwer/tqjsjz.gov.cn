function showPagingNav(blockid, page) {
	if (!blockid || !page) {
		return;
	}
	if (page * 1 < 1) {
		page = 1;
	}
	var jsonObj = strToJsonObj($("#pagingProp_" + blockid).val());
	if (!jsonObj) {
		return;
	}
	var totalPages = getObjectPro(jsonObj, "totalPages");
	if (page * 1 > totalPages) {
		page = totalPages;
	}

	var AppUrl = getObjectPro(jsonObj, "AppUrl");
	var webid = getObjectPro(jsonObj, "webid");
	var colid = getObjectPro(jsonObj, "colid");
	var tid = getObjectPro(jsonObj, "tid");
	var keyword = encodeURI(getObjectPro(jsonObj, "keyword")); // 中文参数要转码
	var btime = getObjectPro(jsonObj, "btime");
	var etime = getObjectPro(jsonObj, "etime");
	var fix = getObjectPro(jsonObj, "fix");
	var scid = getObjectPro(jsonObj, "scid");
	var para = "?page=" + page + (keyword ? "&keyword=" + keyword : "") + (btime ? "&btime=" + btime : "") + (etime ? "&etime=" + etime : "") + ($.isNumeric(fix) ? "&fix=" + fix : "") + ($.isNumeric(scid) ? "&scid=" + scid : ""); // 单元内容来源
	// http://{domain}/columns/66f68c0d-5652-4151-ad67-35769410737a/templates/0a5978b1-67a7-4dbd-89b3-94e473caa0d7/blocks/261b4d60-55d3-4ba3-8f12-7f7de7348c2c?page=2
	var url = AppUrl + "/columns/" + colid + "/templates/" + tid + "/blocks/" + blockid + para; // 单元内容来源
	var id = "pagingCont_" + blockid; // 替换内容的对象id->pagingCont_310acbda-9026-49a0-953c-c03d166625e0
	getUrlVal(url, id);
}

$("#b, #e").datetimepicker({
    changeMonth: true,
    changeYear: true,
    showSecond: true,
    dateFormat: "yy-mm-dd",
    timeFormat: "hh:mm:ss",
});

// 按分类结果汇总时searchThis函数的最后一个参数为true时切换显示全部分类
function searchThis(c, r1, w, clk, scid, all) {
	if (all) {
		c = null;
	} else {
		c = c ? c : getUrlParamValue("c");
	}
	var q = getUrlParamValue("q");
	var b = getUrlParamValue("b");
	var e = getUrlParamValue("e");
	var r = getUrlParamValue("r");
	var fix = getUrlParamValue("fix");
	if (!$.isNumeric(scid)) {
	    scid = getUrlParamValue("scid");
	}
	if (clk) { // 点击按钮时从下拉框获取时间范围
		q = $("#q").val();
		b = $("#b").val();
		e = $("#e").val();
		r = $("#r").val();
		fix = $("input[id='fix']:checked").val();
	} else { // 从选项卡获取
		q = $("#q").val();
		r = r1 > -1 ? r1 : r;
		fix = $("input[id='fix']:checked").val();
	}
	if (!q) { // 没有输入检索关键字
		return;
	}
	q = encodeURI(q); // 处理中文参数
	var rp = (r ? "&r=" + (r*1) : "");
	if (!rp) {
		rp = (r1 > -1 ? "&r=" + (r1*1) : ""); // 要考虑r=0的情况
	}
	var search = window.location.search;
	var s = search.substring(0, search.indexOf("?"));
	if (s != null) {
		s = s + "?p=1" + (q ? "&q=" + q : "") + (b ? "&b=" + b : "") + (e ? "&e=" + e : "") + (c ? "&c=" + c : "") + rp + ($.isNumeric(fix) ? "&fix=" + fix : "") + ($.isNumeric(scid) ? "&scid=" + scid : "");
		if (w) {
			// window.open(s);
			location.href = s;
		} else {
			location.href = s;
		}
	}
	return;
}

setSearchParam();
function setSearchParam() {
	var q = getUrlParamValue("q");
	var b = getUrlParamValue("b");
	var e = getUrlParamValue("e");
	var r = getUrlParamValue("r");
	var fix = getUrlParamValue("fix");
	if (q) {
		$("#q").val(q);
	}
	if (b) {
		$("#b").val(b);
	}
	if (e) {
		$("#e").val(e);
	}
	if (r) {
		$("input[type='radio'][id='r'][value='" + r + "']").attr("checked", "checked");// 设置value=r的一项为选中
	}
	if (fix) {
		$('input[id="fix"]').eq(fix).attr('checked', 'true'); // 设置序号为fix选中
	}
}

function gotoSearch(thisdomain, c, qId, fixId, scid) { // 域名/栏目colid/关键字id/范围id/搜索分类id
	var q0 = $("#" + qId).val();
	if (!q0) {
		alert("请输入搜索关键字");
		return;
	}
	if (q0 == "+") {
		alert("请输入关键字1+关键字2+关键字3以实现多个关键字的组合搜索");
		return;
	}
	var q = encodeURI(q0); // 处理中文参数
	location.href = thisdomain + "/s?q=" + q + "&fix=" + $("input[id='" + fixId + "']:checked").val() + (c ? "&c=" + c : "") + ($.isNumeric(scid) ? "&scid=" + scid : "");
}

function gotoSearchByFix(thisdomain, c, qId, fix, scid) { // 域名/栏目colid/关键字id/fix数值/搜索分类id
	var q0 = $("#" + qId).val();
	if (!q0) {
		alert("请输入搜索关键字");
		return;
	}
	if (q0 == "+") {
		alert("请输入关键字1+关键字2+关键字3以实现多个关键字的组合搜索");
		return;
	}
	var q = encodeURI(q0); // 处理中文参数
	location.href = thisdomain + "/s?q=" + q + "&fix=" + fix + (c ? "&c=" + c : "") + ($.isNumeric(scid) ? "&scid=" + scid : "");
}
