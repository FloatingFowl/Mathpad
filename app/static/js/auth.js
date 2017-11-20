var auth = (function () {
    
    var base_url = "/";

	var getToken = function () {
		console.log('`getToken` function called.');
		$.ajax({
			method: 'POST',
			url: base_url+'get_token',
			success: function (response) {
				var csrf_token = response;
				$.ajaxSetup({
					beforeSend: function (xhr, settings) {
						if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
							xhr.setRequestHeader("X-CSRFToken", csrf_token);
						}
					}
				});
			},
			async: false
		});
	}

	var loggedIn = function (ctx, next) {
		console.log("`loggedIn` function called.");
		getToken();
		$.ajax({
			type: "POST",
			url: "/user_status",
			success: function (response) {
				if (response["status"] === "true") {
					$.ajax({
						method: 'GET',
						url: '/static/templates/navbar.hbs',
						dataType: 'html',
						success: function (response) {
							var compiledTemplate = Handlebars.compile(response);
							var context = [];
							var wrapper = {
								objects: context
							};
							var renderedHtml = compiledTemplate(wrapper);
							var dom = document.getElementById("page-header");
							dom.innerHTML = renderedHtml;
							$("#page-header").attr("class", "");
							$("#page-data").attr("class", "ui main container");
						},
						async: false
					});
					//ENDOFNEW
					next();
				} else
					page('/reg');
			},
			async: false
		});
	};


	var loggedOut = function (ctx, next) {
		console.log("`loggedOut` function called.");
		getToken();
		$.ajax({
			type: "POST",
			url: base_url+"user_status",
			success: function (response) {
				if (response["status"] === "false") {
					$("#page-header").html("");
					$("#page-header").attr("class", "");
					$("#page-data").attr("class", "");
					next();
				} else
					page('/ho');
			},
			async: false
		});
	};

	var login = function (ctx, next) {

		console.log("`login` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/loginform.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var context = [];
				var wrapper = {
					objects: context
				};
				var renderedHtml = compiledTemplate(wrapper);
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
			},
			async: false,
		});
	};

	var register = function (ctx, next) {

		console.log("`register` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/registerform.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var context = [];
				var wrapper = {
					objects: context
				};
				var renderedHtml = compiledTemplate(wrapper);
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
			},
			async: false
		});
	};

	var logout = function (ctx, next) {
		console.log("`logout` function called.");
		$.ajax({
			type: "POST",
			url: base_url+"logout",
			success: function (response) {
				page('/reg');
			},
			async: false,
		});
	};

	var aManager = {};
	aManager.loggedIn = loggedIn;
	aManager.loggedOut = loggedOut;
	aManager.login = login;
	aManager.register = register;
	aManager.logout = logout;
    aManager.base_url = base_url;
	return aManager;

})();
