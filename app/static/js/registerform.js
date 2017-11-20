var registerform = (function(){

    var registersubbutton = function(){
        var str = "username=" + $('[name="username"]').val() + "&password=" + $('[name="password"]').val();
        $.ajax({
            type: "POST",
            url: auth.base_url+"register",
            data: str,
            success: function(response){
                if(response.stat === "success"){
                    alert("Successfully registered!");
                    page('/log'); 
                }
                else{
                    alert(response.stat);
                    page('/reg');
                }
            },
            async:false,
        });
    };

    var logmessageclick = function(){
        page('/log');
    };

    var ret = {};
    ret.registersubbutton = registersubbutton;
    ret.logmessageclick = logmessageclick;
    return ret;

})();
