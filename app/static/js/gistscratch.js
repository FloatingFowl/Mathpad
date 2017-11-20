var gistScratch = (function () {

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

	var pre = function () {
		var v1 = $("#gsel").val();
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

	var makeDrop = function (response, id) {
		response = response.data;
		console.log(response);
		var s = document.getElementById(id);
		for (var i = 0; i < response.length; i++) {
			op = document.createElement("option");
			op.innerHTML = response[i].head;
			s.appendChild(op);
		}
	};

	var load1 = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url+"view",
			success: function (response) {
				makeDrop(response, "ssel");
			},
			async: false,
		});
	};

	var load2 = function () {
		$.ajax({
			type: "GET",
			url: auth.base_url+"viewG",
			success: function (response) {
				makeDrop(response, "gsel");
			},
			async: false,
		});
	};

	var onc = function () {
		console.log("f called");
		var v1 = $('#ssel').val();
		var v2 = $('#gsel').val();
		var data = {
			"scratch_head": v1,
			"gist_head": v2
		};
		console.log(data);
		$.ajax({
			type: 'GET',
			url: auth.base_url+"addScratchToGistAPI",
			data: data,
			success: function (response) {
				alert("Scratch Added to Gist");
				pre();
			},
			async: false,
		});
	};

	var gsonLoad = function () {
		load1();
		load2();
	};

	var ret = {};
	ret.gsonLoad = gsonLoad;
	ret.onc = onc;
	ret.pre = pre;
	return ret;

})();
