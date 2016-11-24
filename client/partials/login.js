// ----------------------------------------------------------------------------
// @Date: 
// @author: 
// @description: This is where the user will login
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Template Event Map
// ----------------------------------------------------------------------------

Template.navlogin.events({
    'submit #loginform':function(e){
        e.preventDefault();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var options = {username: username, password: password};
        Meteor.loginWithPassword(username,password, function(err,res){
            if(!err) {
                Router.go("/")
            }
        })
    }
})