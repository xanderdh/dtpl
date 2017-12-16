/* dropDown menu */
var dropMenu = (function() {

	var popupObj = {

		changeState: function( $this, setting) {
			var modals = setting.drop,
				parentBlocks = $(setting.parent),
				$modal = parentBlocks.find(modals),
				titleLink = $this.parent();


			if ($modal.hasClass('active') && setting.overlay) {
				$modal.removeClass('active');
				titleLink.removeClass('active');
				$(parentBlocks).removeClass('active');
				$('html').removeClass('overlay-overflow');
				$(setting.overlay).removeClass('active');
				
				popupObj.removeHeight(setting);

			} else if (!$modal.hasClass('active') && setting.overlay) {
				$modal.addClass('active');
				titleLink.addClass('active');
				$(parentBlocks).addClass('active');
				$('html').addClass('overlay-overflow');
				$(setting.overlay).addClass('active');

				popupObj.fixHeight($this, setting);

			} else if ($modal.hasClass('active') && !setting.overlay) {
				$modal.removeClass('active');
				$(parentBlocks).removeClass('active');
				titleLink.removeClass('active');
			} else if (!$modal.hasClass('active') && !setting.overlay) {
				$modal.addClass('active');
				$(parentBlocks).addClass('active');
				titleLink.addClass('active');
			}
			console.log('changeState popup');
			$('.js-clsoe-navBar').parent().removeClass('active');
		},

		closePopup: function(setting) {

			if ( $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active') && $('html').hasClass('overlay-overflow')) && !setting.noMenu ) {
				$(setting.drop).removeClass('active');
				$(setting.overlay).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active');
				$('html').removeClass('overlay-overflow');
				popupObj.removeHeight(setting);
			}else if ( setting.noMenu &&  $(setting.drop).hasClass('active') && ( $(setting.overlay).hasClass('active')  ) ) {
				$(setting.drop).removeClass('active');
				$(setting.overlay).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active');
				popupObj.removeHeight(setting);
			}else if ( !setting.overlay && $(setting.drop).hasClass('active') ) {
				$(setting.drop).removeClass('active');
				$(setting.link).parent().removeClass('active');
				$(setting.parent).removeClass('active');
			}
		},

		fixHeight: function($this, setting) {
			var windowHeight = $(window).outerHeight(),
					box = $(setting.drop),
					boxHeight = box.outerHeight();
					boxTop = box.offset().top

			function checkHeight() {
				if ( windowHeight < boxHeight + boxTop ) {
					box.css('height', windowHeight - boxTop );
				}else {
					box.css('height', '');
				}
			}
			checkHeight();

			
		},

		removeHeight: function(setting) {
			var box = $(setting.drop);
			box.css('height', '');
		},

		changePopup: function( $this ) {
			var $popupBlocks = $('.modal-lk-block');
			var linkId = $this.attr('href');
			$popupBlocks.each(function() {
				if ( '#' + $(this).attr('id') == linkId ) {
					$popupBlocks.css('display', 'none');
					$popupBlocks.find('.modal-lk__form-input').val('');
					$(this).css('display', 'block');
				}
			})
		},

		hidePopup: function(setting) {
			if ( $(setting.drop).hasClass('active') ) {
				$(setting.drop).removeClass('active');
				$(setting.parent).removeClass('active');
				popupObj.removeHeight(setting);
				console.log('hidePopup popup');
			}

		},

		changePos: function( $this, setting ) {
			var parentBox = $this.parents(setting.parent);
			var filterLink = parentBox.find(setting.link);
			var dropBox = parentBox.find(setting.drop);
			var windW = $(window).outerWidth();
			var parentBoxW = parentBox.outerWidth();
			var parentBoxL = parentBox.offset().left;
			var parentBoxR = windW - parentBoxL - parentBoxW;

			var dropBoxW = dropBox.outerWidth();
			
			if ( parentBoxR < dropBoxW ) {
				dropBox.addClass('position-right');
				filterLink.addClass('link-pos-right');
			}else {
				dropBox.removeClass('position-right');
				filterLink.removeClass('link-pos-right');
			}
		},

		eventClick: function(setting) {
			var openLink = $(setting.link);
			var closeLink = $(setting.drop).find('.modal__close');

			//open popup
			openLink.on('click', function(e) {

				var modal = setting.drop,
						parentBlock = setting.parent;



				if ( $(this).parents(parentBlock).find(modal).length ) {
					popupObj.changeState( $(this), setting );
					if ( setting.changePos ) {
						popupObj.changePos( $(this), setting );
					}
					e.preventDefault();
				}

			});
			//close popup
			closeLink.on('click', function(e) {
				popupObj.closePopup(setting);
				e.preventDefault();
			});
			
			//change popup
			$('.modal-lk__bottom-link').on('click', function(e) {
				popupObj.changePopup( $(this) );
				e.preventDefault();
			});

			//close popup
			$(window).on('click', function(e) {
				var $this = $(e.target);
				//console.log($this);
				if ( $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && !$this.closest('.js-overlay').length ) {
					popupObj.closePopup(setting);
				}else if (  $(setting.drop).hasClass('active') && !$this.closest(setting.parent).length && $this.closest('.js-overlay').length ) {
					popupObj.hidePopup(setting);
				}
				if ( $this.hasClass('overlay2') ) {
					//popupObj.closePopup(setting);
					//$('.js-clsoe-navBar').trigger('click');
				}
				if ( $(setting.drop).hasClass('active') && $this.closest('.js-overlay').length && !$this.closest('.header-mob-menu__list-item') ) {
					console.log('12');
				}
			});

			// close modal
			$('.js-close-modal').on('click', function(e) {
				popupObj.closePopup(setting);
				e.preventDefault();
			});

			// mob close modal nav
			$('.header-mob-menu__drop-lk .modal__close, .header-mob-menu__messengers .modal__close, .js-mob-search-parent .header-search__close').on('click', function(e) {
				$('.js-clsoe-navBar').trigger('click');
				e.preventDefault();
			});

			//mob search nav focus
			$('.js-mob-search-nav-btn').on('click', function(e) {
				$(this).parents('.header-search').find('.header-search__input').focus();
				e.preventDefault();
			});

		}

	};

	return {
		drop: function(setting) {
			popupObj.eventClick(setting);
		}
	}

}());

/* 
example

dropMenu.drop({
	link: '.js-filters-brand',
	drop: '.js-filters-brand-drop', 
	parent: '.js-filters-brand-parent',
	noMenu: false,
	overlay: false,
});

*/

/* dropDown menu end*/

/* filter blocks */
var FilterBlocks = function(setting) {
	//constructor props
	this.input = $(setting.input);
	this.blocks = $(setting.blocks);
	this.title = $(setting.title);

	this.events();

};

//proto methods
FilterBlocks.prototype = {
	markMatch: function(text, term, $this) {

		// Find where the match is
    var match = text.toUpperCase().indexOf(term.toUpperCase());
    //console.log(match);
    var $result = $('<span></span>');

    // If there is no match, move on
    if (match < 0) {
    	$this.hide();
      return $result.text(text);
    }

    // Put in whatever text is before the match
    $result.text(text.substring(0, match));

    // Mark the match
    var $match = $('<b></b>');
    $match.text(text.substring(match, match + term.length));

    // Append the matching text
    $result.append($match);
    
    // Put in whatever is after the match
    $result.append(text.substring(match + term.length));
    $this.show();
    return $result;

	},
	filterBlocks: function(val) {
		var thet = this;
		var $title = this.title;
		var val = val.toLowerCase();
		var $blocks = this.blocks;

		$blocks.show();

		$blocks.each(function() {
			var thisText = $(this).find($title).text();
			var result = thet.markMatch(thisText, val, $(this));
			$(this).find($title).html(result)
		})
		
	},
	events: function() {
		var _this = this;
		this.input.on('input', function() {
			_this.filterBlocks( $(this).val() )
		})
	}
}

/* 
example

var mySearch = new FilterBlocks({
	input: '.js-filter-input',
	blocks: '.product-filter-check__row',
	title: '.checkbox__text'
});

*/

/* filter blocks end*/


$.fn.spinner = function(options) {

	options = $.extend({
     min: 0
  }, options);

  var make = function() {
			var self = $(this),
				$input = self.find('input'),
				$plus = self.find('.js-spinner-plus'),
				$minus = self.find('.js-spinner-minus'),
				min = self.data('min'),
				max = self.data('max');
			
			function disable() {

				if (parseInt($input.val(), 10) <= min) {
					$minus.addClass('disable');
					$input.val(min)
				} else if (parseInt($input.val(), 10) >= max) {
					$plus.addClass('disable');
				} else {
					$minus.removeClass('disable');
					$plus.removeClass('disable');
				}
			} 

			disable();

			$input.val(min).on('keydown', function(e){e.preventDefault()});

			$plus.on('click', function(e) {
				e.preventDefault();
				if(parseInt($input.val(), 10) >= max){
					return false;
				} else {
					$input.val( parseInt($input.val(), 10) + 1);
					disable();
					self.trigger('plus');
					self.trigger('update');
				}
			});
			$minus.on('click', function(e) {
				e.preventDefault();
				if(parseInt($input.val(), 10) <= min){
					return false;
				} else {
					$input.val( parseInt($input.val(), 10) - 1);
					disable();
					self.trigger('minus');
					self.trigger('update');
				}
			});
		}

  return this.each(make); 

}

function checkMaskPhone(val) {
	var arr = val.split('_');
	for(var i = 0; i < arr.length; i++) {
		if( arr[i] == '' ) {
			return false
		}
	}
	return true;
}

function openPopup( form ) {
	var $btn = $(form).find('button[type="submit"]'),
			popupPath = $btn.data('src');

	$.fancybox.open({
		src: popupPath
	});
};






/*!
 * Simple jQuery Equal Heights
 *
 * Copyright (c) 2013 Matt Banks
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 1.5.1
 */
(function($) {

    $.fn.equalHeights = function() {
        var maxHeight = 0,
            $this = $(this);

        $this.each( function() {
            var height = $(this).innerHeight();

            if ( height > maxHeight ) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };

    // auto-initialize plugin
    $('[data-equal]').each(function(){
        var $this = $(this),
            target = $this.data('equal');
        $this.find(target).equalHeights();
    });

})(jQuery);



$.fn.dropDown = function(options) {
	options = $.extend({
    dropClass: '.js-drop-cont',
    linkClass: '.js-drop-link'
  }, options);

	$links = this.find(options.linkClass);

				

	$links.on('click', function(e) {
		var $drop = $(this).parent().find(options.dropClass);

		$(this).parent().find(options.dropClass).slideToggle();

		$links.not($(this)).parent().find(options.dropClass).slideUp();
		$links.not($(this)).removeClass('active');
		$(this).toggleClass('active');
		e.preventDefault();
	})


	return this;

}


function formatNumber(val) {
	return val.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
function formatStringToNumber(val) {
	val = val.replace(' ', '');
	val = parseInt( val , 10 )
	return val;
}






var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
};

// Numeric only control handler
jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};