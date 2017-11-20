var gistDelete = (function () {

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

	var makeDrop = function (response) {
		response = response.data;
		sel = document.getElementById("sel");
		sel.innerHTML = "";
		for (var i = 0; i < response.length; i++) {
			op = document.createElement("option");
			op.innerHTML = response[i].head;
			sel.appendChild(op);
		}
	};

	var gdonLoad = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url+"viewG",
			success: function (response) {
				makeDrop(response);
			},
			async: false,
		});
	};

	var delGist = function () {
		var head = document.getElementById("sel").value;
		var data = {
			"head": head
		}
		$.ajax({
			url: auth.base_url+"deleteGist",
			data: data,
			method: 'GET',
			success: function (response) {
				gdonLoad();
				$("#display").html("");
				$("#gistheading").html("");
			},
		})
	};

	var gistDo = function () {
		var v1 = $("#sel").val();
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
	ret.delGist = delGist;
	ret.gdonLoad = gdonLoad;
	ret.gistDo = gistDo;
	return ret;

})();
