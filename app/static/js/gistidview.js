var gistIdView = (function () {

	var display = function (response) {
		if (response.success != "true") {
			alert("Failed");
			return;
		}
		var h1 = document.getElementById("gistheading");
		h1.innerHTML = response.head;
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

	var doit = function () {
		var dat = {
			"id": document.getElementById("inp").value
		};
		console.log(dat);
		$.ajax({
			method: 'GET',
			url: auth.base_url+"viewGistByIdAPI",
			data: dat,
			success: function (response) {
				console.log(response);
				display(response);
			},
			async: false,
		});
	};

	var ret = {};
	ret.doit = doit;
	return ret;

})();
