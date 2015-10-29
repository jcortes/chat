Meteor.startup(function() {
	Messages.remove({});
	
	Channels.remove({});
	Channels.insert({name: 'lbrain1'});
	Channels.insert({name: 'lbrain2'});
	Channels.insert({name: 'lbrain3'});
	Channels.insert({name: 'lbrain4'});
	
	
});