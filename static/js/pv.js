function countPV(url) {
	$.ajax({
		crossOrigin: true,
		url: url,
		success: function(result) {
			var code = getObjectPro(result, "code");
			var msg = getObjectPro(result, "msg");
			if (code * 1 == 200) {
				// alert(msg);
				// alert(getObjectPro(result, "data"));
			} else {
				// alert(msg);
			}
		}
	});
}

function showPV(url, id) {
	$.ajax({
		crossOrigin: true,
		url: url,
		success: function(result) {
			$("#" + id)[0].innerHTML = result;
		}
	});
}