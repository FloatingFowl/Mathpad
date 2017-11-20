var idGetter = (function () {

	var makeDrop = function (response) {
		response = response.data;
		sel = document.getElementById("sel");
		for (var i = 0; i < response.length; i++) {
			op = document.createElement("option");
			op.innerHTML = response[i].head;
			sel.appendChild(op);
		}
	};

	var onLoad = function () {
		$.ajax({
			method: "GET",
			url: auth.base_url+"viewG",
			success: function (response) {
				console.log(response);
				makeDrop(response);
			},
			async: false,
		});
	};

	var doit = function () {
		var data = document.getElementById("sel").value;
		var d = {
			"head": data
		};
		$.ajax({
			method: 'GET',
			url: auth.base_url+"getGistIdAPI",
			data: d,
			async: false,
			success: function (response) {
				console.log(response);
				if (response.success == "true") {
					alert(response.id);
				} else
					alert("failed");
			},
		});
	}

	var ret = {};
	ret.onLoad = onLoad;
	ret.doit = doit;
	return ret;

})();
