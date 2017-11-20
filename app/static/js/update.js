var update = (function () {

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

	var update_make = function (response) {
		var a = response.data;
		var id = document.getElementById("sel");
		id.innerHTML = "<option val="
		" selected hidden disabled>Choose header</option>";
		for (var i = 0; i < a.length; i++) {
			var op = document.createElement("option");
			op.innerHTML = a[i].head;
			id.appendChild(op);
		}
		id.innerHTML = "<option val='' selected hidden disabled>Choose header...</option>" + id.innerHTML;
		document.getElementById("but2").disabled = true;
		document.getElementById("but3").disabled = true;
	};

	var update_menu = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url + "view",
			success: function (response) {
				update_make(response);
			},
			async: false,
		});
	};

	var update_get = function () {
		var v = document.getElementById("sel").value;
		$.ajax({
			type: "GET",
			url: auth.base_url + "view",
			success: function (response) {
				var a = response.data;
				for (var i = 0; i < a.length; i++) {
					if (a[i].head == v) {
						t1.value = v;
						t2.value = a[i].data;
						break;
					}
				}
				document.getElementById("but2").disabled = false;
				document.getElementById("but3").disabled = false;
			},
			async: false,
		});
		update_pre();
	};

	var update_send1 = function () {
		var v1 = $('#sel').val();
		var v2 = document.getElementById("t2").value;
		v2 = v2.trim()
		v2 = v2.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');
		var v3 = document.getElementById("t1").value;
		v3.trim()
		v3 = v3.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		if (v3.length == 0) {
			alert("Header should contain some value.")
			return;
		}
		var data = {
			"oldh": v1,
			"newh": v3,
			"data": v2
		};
		$.ajax({
			type: "GET",
			url: auth.base_url + "update",
			data: data,
			success: function (response) {
				alert("Scratch Updated");
				document.getElementById("but2").disabled = true;
				document.getElementById("but3").disabled = true;
				document.getElementById("t1").value = "";
				document.getElementById("t2").value = "";
			},
			async: false,
		});
		display("", "");
	};

	var update_pre = function () {
		var s = document.getElementById("t2").value;

		s = s.trim()
		s = s.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		var head = document.getElementById("t1").value;

		head.trim()
		head = head.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		display(head, s);
	};

	var ret = {};
	ret.update_send1 = update_send1;
	ret.update_get = update_get;
	ret.update_pre = update_pre;
	ret.update_menu = update_menu;
	return ret;

})();
