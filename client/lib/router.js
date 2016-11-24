Router.route('/',{
    onBeforeAction:function(){
        if(!Meteor.userId()){
            this.redirect("landing");
           // this.redirect("login");
        } else {
            this.next();
        }
    },
    template:"lifecake"
});

Router.route('/profile/:username',{
    template:"profileFeed"
});

Router.route('/landing',{
    template:"landing"
})

//Router.route('/register',{
//    template:"register"
//});

//Router.route('/login',{
 //   template:"login"
//})

Router.route('/notifications',{
    template:"notifications"
})