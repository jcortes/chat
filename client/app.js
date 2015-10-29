Template.messages.helpers({
	messages: Messages.find({})
});

Template.listings.helpers({
	channels: function(){
		return Channels.find();
	}
});

Template.channel.helpers({
	active: function() {
		if(Session.get('channel') === this.name)
			return 'active';
		else
			return '';
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('timestampToTime', function(timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = '0' + date.getMinutes();
	var seconds = '0' + date.getSeconds();
	var time = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
	return time;
});

Template.registerHelper('usernameFromId', function(userId) {
	var user = Meteor.users.findOne({_id: userId});
	if(typeof(user) === 'undefined')
		return 'Anonymous';
	return user.username;
});

Meteor.subscribe('channels');
Meteor.subscribe('allUsernames');

Template.messages.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('messages', Session.get('channel'));
	});
});

Template.footer.events({
	'keypress input': function(event){
		
		var inputVal = $('.input-box_text').val();
		if(!!inputVal) {
			var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
			if(charCode === 13) {
				event.stopPropagation();
				
				Meteor.call('newMessage', {
					text: $('.input-box_text').val(),
					channel: Session.get('channel')
				});
				
				$('.input-box_text').val('');
				return false;
			}
		}
	}
});