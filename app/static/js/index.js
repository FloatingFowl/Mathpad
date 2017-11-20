var index = (function () {

	var click_addScratch = function () {
		page('/adds');
	};

	var click_viewd = function () {
		page('/views');
	};

	var click_deleted = function () {
		page('/deletes');
	};

	var click_updated = function () {
		page('/updates');
	};

	var click_logout = function () {
		page('/logo');
	};

	var click_addg = function () {
		page('/gistAdd');
	};

	var click_viewg = function () {
		page('/gistView');
	};

	var click_delg = function () {
		page('/gistDelete');
	};

	var click_scratchg = function () {
		page('/gistScratch');
	};

	var click_viewbyid = function () {
		page('/gistById');
	};

	var click_gistprivacy = function () {
		page('/gistPrivacy');
	};

	var click_getid = function () {
		page('/getGistId');
	};

	var draw = function () {
		var str = document.getElementById('eq').value;
		var arr = str.split(",");
		var listo = [];
		console.log(arr);
		for (var i in arr) {
			console.log(i);
			listo[i] = {
				fn: arr[i],
				sampler: 'builtIn',
				graphType: 'polyline'
			};
			console.log(listo[i]);
		}
		try {
			functionPlot({
				target: '#plot',
				data: listo
			});
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};

	var onload = function (ctx, next) {
		console.log("Onload claled");
		$.ajax({
			type: "POST",
			url: auth.base_url+"user_name",
			success: function (response) {
				$("#greet").html("Hey " + response + "!");
			},
			async: false
		});
		$.ajax({
			type: "GET",
			url: auth.base_url+"view",
			success: function (response) {
				$("#cube1").html($("#cube1").html() + parseInt(response.data.length));
			},
			async: false
		});
		$.ajax({
			type: "POST",
			url: auth.base_url+"nogistret",
			success: function (response) {
				$("#cube2").html($("#cube2").html() + parseInt(response.data));
			},
			async: false
		});
		draw();
	}

	var ret = {};
	ret.click_addScratch = click_addScratch;
	ret.click_viewd = click_viewd;
	ret.click_deleted = click_deleted;
	ret.click_updated = click_updated;
	ret.click_logout = click_logout;
	ret.click_addg = click_addg;
	ret.click_viewg = click_viewg;
	ret.click_delg = click_delg;
	ret.click_scratchg = click_scratchg;
	ret.click_viewbyid = click_viewbyid;
	ret.click_gistprivacy = click_gistprivacy;
	ret.click_getid = click_getid;
	ret.draw = draw;
	ret.onload = onload;
	return ret;

})();
