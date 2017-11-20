page('/ho', auth.loggedIn, homePage.home, index.onload);

page('/adds', auth.loggedIn, homePage.addScratch);
page('/deletes', auth.loggedIn, homePage.deleted, deletesafe.delete_onload);
page('/updates', auth.loggedIn, homePage.updated, update.update_menu);

page('/gistAdd', auth.loggedIn, homePage.addGist);
page('/gistView', auth.loggedIn, homePage.viewGist, gistView.gistOnload);
page('/gistDelete', auth.loggedIn, homePage.delGist, gistDelete.gdonLoad);
page('/gistScratch', auth.loggedIn, homePage.scratchGist, gistScratch.gsonLoad);
page('/gistById', auth.loggedIn, homePage.gistbyid);
page('/gistPrivacy', auth.loggedIn, homePage.gistPrivacy, gistPrivacy.gponLoad);
page('/getGistId', auth.loggedIn, homePage.getId, idGetter.onLoad);

page('/log', auth.loggedOut, auth.login);
page('/reg', auth.loggedOut, auth.register);
page('/logo', auth.loggedIn, auth.logout);

page({});
