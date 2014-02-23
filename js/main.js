var lookup = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii'];

$(document).ready(function() {
	
	// Add ids to interjection nodes
	$('.interjection-text').find('ol li').each(function(index, vaue) {
		$(this).attr('id', "intj-" + (index + 1));
	});
	
	$('.footnotes').find('ol li').each(function(index, value) {
		$(this).attr('id', 'fn-' + (index + 1));
	})

	
	$('sup').each(function(index, value) {
		
		// Regex to find the 'see n' notes
		seeInterjectionRegex = /[a-z] (\d+)/i;
		seeFootnoteRegex = /[a-z] (\w+)/i;
		
		var text = $(this).text();
				
		if ( !isNaN(parseInt(text)) ) {
			$(this).attr('id', 'goto-intj-' + text);
			$(this).attr('class','intj');
			$(this).data('goto', 'intj-' + text);
		} else if (seeInterjectionRegex.test(text)) {
			matches = text.match(seeInterjectionRegex);
			$(this).attr('id', 'goto-intj-' + matches[matches.length-1]);
			$(this).attr('class','intj');
			$(this).data('goto', 'intj-' + matches[matches.length-1])
		} else if (seeFootnoteRegex.test(text)) {
			matches = text.match(seeFootnoteRegex);
			var numeral = lookup.indexOf(matches[matches.length-1]) + 1;
			$(this).attr('id', 'goto-intj-' + numeral);
			$(this).attr('class', 'fn');
			$(this).data('goto', 'fn-' + numeral);
		} else {
			var numeral = lookup.indexOf(text) + 1;
			$(this).attr('id', 'goto-fn-' + numeral);
			$(this).attr('class', 'fn');
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
			
			var highlightColor;
			if ( $(this).attr('class') == 'fn') {
				highlightColor = 'rgb(159, 199, 234)';
			} else {
				highlightColor = 'rgb(247, 182, 63)';
			}
			$(goToId).effect('highlight', {color: highlightColor});
		});
	});
});