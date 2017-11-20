var homePage = (function () {

	var home = function (ctx, next) {
		console.log("`home` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/index.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var addScratch = function (ctx, next) {
		console.log("`addScratch` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/math1.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
			},
			async: false
		});
	};

	var viewd = function (ctx, next) {
		console.log("`viewd` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/view.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var deleted = function (ctx, next) {
		$.ajax({
			method: 'GET',
			url: '/static/templates/delete.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});

	};

	var updated = function (ctx, next) {
		$.ajax({
			method: 'GET',
			url: '/static/templates/update.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var addGist = function (ctx, next) {
		console.log("`addGist` function called.")
		$.ajax({
			method: 'GET',
			url: '/static/templates/addGist.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
			},
			async: false
		});
	};

	var viewGist = function (ctx, next) {
		console.log("`viewGist` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/viewGist.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var delGist = function (ctx, next) {
		console.log("`delGist` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/deleteGist.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var scratchGist = function (ctx, next) {
		console.log("`scratchGist` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/addScratchToGist.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});

	};

	var gistbyid = function (ctx, next) {
		console.log("`gistbyid` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/viewByID.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
			},
			async: false
		});
	};

	var gistPrivacy = function (ctx, next) {
		console.log("`gistPrivacy` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/gistPrivacy.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};

	var getId = function (ctx, next) {;
		console.log("`gistPrivacy` function called.");
		$.ajax({
			method: 'GET',
			url: '/static/templates/getGistApi.hbs',
			dataType: 'html',
			success: function (response) {
				scroll(0, 0);
				var compiledTemplate = Handlebars.compile(response);
				var renderedHtml = compiledTemplate();
				var dom = document.getElementById("page-data");
				dom.innerHTML = renderedHtml;
				next();
			},
			async: false
		});
	};


	var homeP = {};
	homeP.home = home;
	homeP.addScratch = addScratch;
	homeP.viewd = viewd;
	homeP.deleted = deleted;
	homeP.updated = updated;
	homeP.addGist = addGist;
	homeP.viewGist = viewGist;
	homeP.delGist = delGist;
	homeP.scratchGist = scratchGist;
	homeP.gistbyid = gistbyid;
	homeP.gistPrivacy = gistPrivacy;
	homeP.getId = getId;
	return homeP;

})();
