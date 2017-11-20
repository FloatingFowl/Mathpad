var addGist = (function () {

	var create = function () {

		var str = document.getElementById("t1").value;
		str.trim();
		str = str.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		if (str.length == 0) {
			alert("Heading should have some value.");
			return;
		}

		var data = {
			"head": str
		};
		$.ajax({
			type: "GET",
			url: auth.base_url+"addGistAPI",
			data: data,
			success: function (response) {
				console.log(response);
				alert("Gist Added");
				page('/gistScratch');
			},
			async: false,
		});
	}

	var ret = {};
	ret.create = create;
	return ret;

})();
