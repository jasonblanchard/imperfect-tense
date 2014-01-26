$(document).ready(function() {
	
	// Add ids to interjection nodes
	$('.interjection-text').find('ol li').each(function(index, vaue) {
		$(this).attr('id', "intj-" + (index + 1))
	});

	
	$('sup').each(function(index, value) {
		
		var text = $(this).text();
				
		if ( !isNaN(parseInt(text)) ) {
			$(this).attr('id', 'goto-intj-' + text)
			$(this).data('goto', 'intj-' + text)
		}
		
				
		$(this).html("<a href='#'>" + text + "</a>");
		
		// Add click events and 
		// check context of sup to see which note to link to
		
		$(this).on('click', function(e) {
			e.preventDefault();
			
			var goToId = "#" + $(this).data('goto');
			
			console.log(goToId);
			
			$(goToId)[0].scrollIntoView();
		});
	});
});