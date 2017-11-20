var mathsafe = (function () {

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

	var math1f = function () {
		var s = document.getElementById("inp").value;

		s = s.trim();
		s = s.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		var head = document.getElementById("inphead").value;

		head = head.trim()
		head = head.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');


		display(head, s);
	};

	var math1g = function () {
		var s = document.getElementById("inp").value;

		s.trim()
		s = s.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		if (s.length == 0) {
			alert("Heading should have some value.");
			return;
		}

		var head = document.getElementById("inphead").value;

		head.trim()
		head = head.replace(/</g, '< ').replace(/>/g, ' >').replace(/\n{2,}/g, '\n').replace(/  +/g, ' ');

		var data = {
			"data": s,
			"head": head
		};
		$.ajax({
			type: 'GET',
			url: auth.base_url+"addScratchD",
			data: data,
			async: false,
			success: function (response) {
				alert("Scratch Added");
				document.getElementById("inp").value = "";
				document.getElementById("inphead").value = "";
			},
		});

		display(head, s);
	};

	var view_home = function () {
		page('/ho');
	};

	var ret = {};
	ret.view_home = view_home;
	ret.math1g = math1g;
	ret.math1f = math1f;
	return ret;

})();
