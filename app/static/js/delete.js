var deletesafe = (function () {

	var display = function (heading, rest) {
		var h = document.getElementById("head");
		h.innerHTML = heading;
		var plist = rest.split("\n");
		var box = document.getElementById("content");
		box.innerHTML = "";
		for (var ite in plist) {
			box.innerHTML = box.innerHTML + "<p>" + plist[ite] + "</p";
		}
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	}

	var makeDrop = function (a) {
		a = a.data;
		id = document.getElementById("select");
		id.innerHTML = "";
		for (var i = 0; i < a.length; i++) {
			var op = document.createElement("option");
			op.innerHTML = a[i].head;
			id.appendChild(op);
		}
	};

	var delete_onload = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url+"view",
			success: function (response) {
				makeDrop(response);
			},
			async: false,
		});
	};

	var del_ete = function (data) {
		var dat = {
			"head": data
		};
		$.ajax({
			type: "GET",
			url: auth.base_url+"delete",
			data: dat,
			success: function (response) {
				console.log(response);
				alert("Scratch deleted");
				delete_onload();
			},
			async: false,
		});
	};

	var prev = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url+"view",
			success: function (response) {
				var v = $("#select").val();
				var a = response.data;
				for (var i = 0; i < a.length; i++) {
					console.log(a[i].head)
					if (a[i].head == v) {
						display(v, a[i].data);
						break;
					}
				}
			},
			async: false,
		});
	}

	var ret = {};
	ret.delete_onload = delete_onload;
	ret.del_ete = del_ete;
	ret.prev = prev;
	return ret;

})();
