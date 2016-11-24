Template.profileFeed.events({
    //creates a post
    'click .new-post':function(e){
        e.preventDefault();
        var profileUser = Meteor.users.findOne({username:Router.current().params.username});
        var currentUser = Meteor.user();
        var story = $('textarea[name="new-post"]').val();
        if(story.length) {
            Stories.insert({
                createdBy: currentUser._id, // the Meteor.userId()
                createdFor: profileUser._id, // the owner of the profile
                storyImage: null, // for the future we can add images in our story
                storyText: story, // the text that is the story
                creatorName: currentUser.profile.name.first + " " + currentUser.profile.name.last, // the creator
                creatorUsername: currentUser.profile.username, // so we can link to the creators profile
                creatorThumbnail: currentUser.profile.picture.thumbnail, // so we can have a picture in the story
                createdForName: profileUser.profile.name.first + " " + profileUser.profile.name.last, // the person recieving the post
                createdForUsername: profileUser.profile.username, // so we can link to the recievers profile
                createdForThumbnail: profileUser.profile.picture.thumbnail, // so we can see the recievers picture
                likes: [], // so we can see who's liked the post
                createdAt: new Date(), // good practice IMO
                comments: [] // comment array
            });
            $('textarea[name="new-post"]').val(""); // reset the text box when done
        }

    }

})

Template.profileFeed.helpers({
    //renders status
    statusPlaceholder:function(){
        var profileUser = Meteor.users.findOne({username:Router.current().params.username});
        if(profileUser && profileUser._id === Meteor.userId()){
            return "Update your status";
        } else {
            return "Post to their wall!";
        }
    },
    //renders stores
    stories:function(){
        var profileUser = Meteor.users.findOne({username:Router.current().params.username}, {fields: {_id:1}});
        return profileUser ? Stories.find({createdFor: profileUser._id}, {sort: {createdAt:-1}, limit: 10}) : [];
    }
})

Template.profileFeed.onCreated(function(){
    var self = this;
    Tracker.autorun(function(){
        var username = Router.current().params.username;
        self.subscribe("profileStories", username);
    })

})