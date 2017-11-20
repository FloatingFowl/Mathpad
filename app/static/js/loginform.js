var loginform = (function(){

    var loginsubbutton = function(){
        var str = "username=" + $('[name="username"]').val() + "&password=" + $('[name="password"]').val();
        $.ajax({
            type: "POST",
            url: auth.base_url+"login",
            data: str,
            success: function(response){
                if(response.stat === "success"){
                    alert("Successfully logged in!");
                    page('/ho'); 
                }
                else{
                    alert(response.stat);
                    page('/log');
                }
            },
            async:false,
        });
    };

    var regmessageclick = function(){
        page('/reg');
    };

    var ret = {};
    ret.loginsubbutton = loginsubbutton;
    ret.regmessageclick = regmessageclick;
    return ret;

})();
