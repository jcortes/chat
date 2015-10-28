Template.messages.helpers({
	messages: Messages.find({})
});

Template.footer.events({
	'keypress input': function(event){
		
		var inputVal = $('.input-box_text').val();
		if(!!inputVal) {
			var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
			if(charCode === 13) {
				event.stopPropagation();
				Messages.insert({text: inputVal});
				$('.input-box_text').val('');
				return false;
			}
		}
	}
});