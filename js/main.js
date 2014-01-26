var lookup = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii'];

$(document).ready(function() {
	
	// Add ids to interjection nodes
	$('.interjection-text').find('ol li').each(function(index, vaue) {
		$(this).attr('id', "intj-" + (index + 1))
	});
	
	$('.footnotes').find('ol li').each(function(index, value) {
		$(this).attr('id', 'fn-' + (index + 1));
	})

	
	$('sup').each(function(index, value) {
		
		// Regex to find the 'see n' notes
		seeNoteRegex = /[a-z] (\d+)/i;
		
		var text = $(this).text();
				
		if ( !isNaN(parseInt(text)) ) {
			$(this).attr('id', 'goto-intj-' + text)
			$(this).data('goto', 'intj-' + text)
		} else if (seeNoteRegex.test(text)) {
			// Need to figure out if this is an fn or intj
			matches = text.match(seeNoteRegex);
			$(this).attr('id', 'goto-intj-' + matches[matches.length-1]);
			$(this).data('goto', 'intj-' + matches[matches.length-1])
		} else {
			var numeral = lookup.indexOf(text) + 1;
			$(this).attr('id', 'goto-fn-' + numeral);
			$(this).data('goto', 'fn-' + numeral);
		}
		
				
		$(this).html("<a href='#'>" + text + "</a>");
		
		// Add click events and 
		// check context of sup to see which note to link to
		
		$(this).on('click', function(e) {
			e.preventDefault();
			
			var goToId = "#" + $(this).data('goto');
			
			console.log(goToId);
			
			$(goToId)[0].scrollIntoView();
			$(goToId).effect('highlight');
		});
	});
});