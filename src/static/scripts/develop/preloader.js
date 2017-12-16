
function preloader() {
	if ($('#preloader').length) {
		setTimeout(function() {
			$('#preloader').fadeOut('slow', function() {
				$('body').removeClass('overflow-hidden').css('padding', '');
			});
		}, 1000);
	}
	
}

$(window).on('load', preloader);

