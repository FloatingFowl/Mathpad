var gistPrivacy = (function () {

	var makeDrop = function (response) {
		response = response.data;
		sel = document.getElementById("sel1");
		for (var i = 0; i < response.length; i++) {
			op = document.createElement("option");
			op.innerHTML = response[i].head;
			sel.appendChild(op);
		}
	};

	var gponLoad = function () {
		$.ajax({
			method: "GET",
			url: auth.base_url+"viewG",
			success: function (response) {
				makeDrop(response);
			},
			async: false,
		});
	};

	var doit = function () {
		var s1 = document.getElementById("sel1").value;
		var s2 = document.getElementById("sel2").value;
		var data = {
			"head": s1,
			"privacy": s2
		};
		console.log(data);
		$.ajax({
			url: auth.base_url+"setPrivacyAPI",
			data: data,
			async: false,
			success: function (response) {
				alert("Privacy Set!");
			},
			method: 'GET',
		});
	};

	var display2 = function (response) {
		var mainseg = document.getElementById("display");
		mainseg.innerHTML = "";
		for (var i = 0; i < response.data.length; i++) {
			var mseg = document.createElement("div");
			mseg.className = "ui segment";
			var segh = document.createElement("div");
			segh.className = "ui header";
			segh.innerHTML = response.data[i].head;
			mseg.appendChild(segh);
			var segc = "";
			var str = response.data[i].data;
			var spl = str.split("\n");
			for (var j in spl) {
				segc += "<p>" + spl[j] + "</p>";
			}
			mseg.innerHTML += segc;
			mainseg.appendChild(mseg);
		}
		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	};

	var gistDo = function () {
		var v1 = $("#sel1").val();
		var hdd = document.getElementById("gistheading");
		hdd.innerHTML = v1;
		var data = {
			"head": v1
		}
		$.ajax({
			type: "GET",
			url: auth.base_url+"viewGistAPI",
			data: data,
			success: function (response) {
				display2(response);
			},
			async: false,
		});
	};

	var ret = {};
	ret.gponLoad = gponLoad;
	ret.doit = doit;
	ret.gistDo = gistDo;
	return ret;
})();
