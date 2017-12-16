(function () {
    var path = window.location.hostname == 'localhost' ? 'ajax.pages-list.text' : 'ajax.pages-list.php';
    $.ajax({
        'url': path,
        'type': 'get'
    })
        .fail(function () {
            // alert('no pages');
            console.log('no pages')
        })
        .done(function (data) {
            var elems = $(data.pages);
            if(typeof data == 'string') {
                var data = data.split(',');
                elems = data;
            }

            if (data.toString().indexOf('<?php') == 0) return;
            var $wnd = $('<div id="all-page-shower" class="el-ignore"><div id="all-page-shower__inner"></div>' +
                '<style></style>' +
                '<div id="all-page-shower__title" title="Pages List">Pages List</div>' +
                '<div id="all-page-shower__list-wrap"><ul id="all-page-shower__list"></ul></div></div>');
            var $close = $('<a href="#" id="all-page-close" class="el-ignore"><i id="all-page-close__a"></i><i id="all-page-close__b"></i></a>')
                .appendTo($wnd);
            var $open = $('<a href="#" id="all-page-open" class="el-ignore"><i></i></a>').appendTo('body');

            $('body').append($wnd);
            $(elems).each(function (i) {
                var page = this;
                $('#all-page-shower__list')
                    .append('<li><a href="' + page + '" class="all-page-shower__item">' + '<span class="cz-counter">' + (i + 1) + '.</span>' +  page + '</a></li>');
            });

            $close.on('click', function (e) {
                e.preventDefault();
                $wnd.animate({
                    'top': '100%',
                    'left': '100%'
                }, 300, function () {
                    $wnd.hide();
                });
                $open.show();
            });

            $open.on('click', function (e) {
                e.preventDefault();
                $wnd.show()
                    .animate({
                        'top': 0,
                        'left': 0
                    }, 300);
                $open.hide();
            });

            $open.hover(function () {
                $(this).css({
                    '-ms-transform': 'scale(1.2)',
                    '-webkit-transform': 'scale(1.2)',
                    '-o-transform': 'scale(1.2)',
                    '-moz-transform': 'scale(1.2)',
                    'transform': 'scale(1.2)'
                })
            }, function () {
                $(this).css({
                    '-ms-transform': 'scale(1)',
                    '-webkit-transform': 'scale(1)',
                    '-o-transform': 'scale(1)',
                    '-moz-transform': 'scale(1)',
                    'transform': 'scale(1)'
                })
            });

            $close.hover(function () {
                $(this).css({
                    'opacity': 0.5
                })
            }, function () {
                $(this).css({
                    'opacity': 0.8
                })
            });

            $('#all-page-shower__list li a').hover(function () {
                $(this).css({
                    'text-decoration': 'underline'
                })
            }, function () {
                $(this).css({
                    'text-decoration': 'none'
                })
            });

            stylerProcessor();

        });


    function stylerProcessor() {
        var wndClose = $('#all-page-close');
        var wndCloseA = $('#all-page-close__a');
        var wndCloseB = $('#all-page-close__b');
        var wndOpen = $('#all-page-open');
        var item = $('.all-page-shower__item');
        var styleTag = $('#all-page-shower style');

        var styles = '#all-page-shower__list li {' +
            'display: block;' +
            'padding 0 10px;' +
            'position: relative;' +
            'z-index: 98;' +
            '}' +
            '' +
            '.cz-counter {' +
            'position: absolute;' +
            'top: 2px;' +
            'left: 0;' +
            '}' +
            '' +
            '#all-page-shower__list {' +
            '-webkit-column-count: 2;' +
            ' -moz-column-count: 2;' +
            'column-count: 2;' +
            'width: 100%' +
            '}' +
            '' +
            '#all-page-shower__list-wrap{' +
            'overflow-y: auto;' +
            'overflow-x: hidden;' +
            'height: calc(100vh - 100px);' +
            'margin: 0 auto;' +
            'max-width: 600px;' +
            '}' +
            '#all-page-shower {' +
            'display: none;' +
            'font-size: 14px;' +
            'color: #fff;' +
            'position: fixed;' +
            'top: 100%;' +
            'left: 100%;' +
            'width: 100%;' +
            'height: 100%;' +
            'background: none;' +
            'z-index: 51000;' +
            'padding: 40px 30px;' +
            '-moz-column-count: auto;' +
            '-webkit-column-count: auto;' +
            'column-count: auto' +
            '}' +
            '' +
            '#all-page-shower__inner {' +
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'bottom: 0;' +
            'right: 0;' +
            'background: #000;' +
            'z-index: 0;' +
            'opacity: 0.8;' +
            '}' +
            '' +
            '#all-page-shower__title {' +
            'position: relative;' +
            'z-index: 100;' +
            'color: #fff;' +
            'font-weight: 700;' +
            'text-align: center;' +
            'font-size: 22px;' +
            'margin-bottom: 10px;' +
            '}' +
            '' +
            '@media (max-width: 700px){' +
            '#all-page-shower__list {' +
            '-webkit-column-count: 1;' +
            ' -moz-column-count: 1;' +
            'column-count: 1;' +
            '}' +
            '}';

        styleTag.html(styles);

        wndClose.css({
            'font-size': '13px',
            'color': '#000',
            'font-weight': 'normal',
            'position': 'absolute',
            'z-index': '99999',
            'right': '25px',
            'top': '25px',
            'width': '35px',
            'height': '35px',
            'background': 'rgba(0, 0, 0, 0)',
            'text-align': 'center',
            'line-hieght': '20px',
            'opacity': 0.8
        });
        wndCloseA.css({
            'position': 'absolute',
            'left': '15px',
            'height': '33px',
            'width': '4px',
            'background-color': 'rgba(255,255,255,1)',
            '-ms-transform': 'rotate(45deg)',
            '-webkit-transform': 'rotate(45deg)',
            '-o-transform': 'rotate(45deg)',
            '-moz-transform': 'rotate(45deg)',
            'transform': 'rotate(45deg)'
        });
        wndCloseB.css({
            'position': 'absolute',
            'left': '15px',
            'height': '33px',
            'width': '4px',
            'background-color': 'rgba(255,255,255,1)',
            '-ms-transform': 'rotate(-45deg)',
            '-webkit-transform': 'rotate(-45deg)',
            '-o-transform': 'rotate(-45deg)',
            '-moz-transform': 'rotate(-45deg)',
            'transform': 'rotate(-45deg)'
        });
        wndOpen.css({
            'z-index': '99999',
            'right': 0,
            'bottom': 0,
            'width': '40px',
            'height': '40px',
            'background': 'rgba(0, 0, 0, .2)',
            'border-left': '4px solid rgba(0, 0, 0, .8)',
            'border-top': '4px solid rgba(0, 0, 0, .8)',
            'position': 'fixed'
        });
        wndOpen.find('i').css({
            'display': 'block',
            'width': '60px',
            'height': '4px',
            'position': 'absolute',
            'top': '17px',
            'left': '-11px',
            'background': 'rgba(0, 0, 0, .8',
            '-ms-transform': 'rotate(45deg)',
            '-webkit-transform': 'rotate(45deg)',
            '-o-transform': 'rotate(45deg)',
            '-moz-transform': 'rotate(45deg)',
            'transform': 'rotate(45deg)'
        });
        item.css({
            'color': '#fff',
            'font-size': '16px',
            'padding': '2px',
            'font-weight': 'normal',
            'display': 'inline-block',
            'z-index': '99',
            'position': 'relative',
            'padding-left': '30px'
        });
    }

}());


(function() {
  'use strict';

  let createButton = function() {
    var button = document.createElement('span');
    button.setAttribute('id', 'addElems');
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.background = 'black';
    button.style.position = 'fixed';
    button.style.bottom = '0';
    button.style.right = '70px';
    button.style.padding = '0 5px';
    button.style.transition = 'all .3s';
    button.style.cursor = 'pointer';
    button.style.color = 'white';
    button.style.fontSize = '12px';
    button.style.lineHeight = '40px';
    button.style.textAlign = 'center';
    button.style.zIndex = '99999';
    button.innerText = 'text';

    button.addEventListener('mouseover', function() {
      button.style.background = 'red';
    });
   button.addEventListener('mouseout', function() {
      button.style.background = 'black';
    });

    document.body.append(button);
    return button;
  };
  let createSettingList = function() {
    var $list = $('<ul class="setting-block-change"></ul>');
    $list.append( '<li class="js-static-plus">static +</li>' );
    $list.append( '<li class="js-dynamic-plus">dynamic +</li>' );
    $list.append( '<li class="js-check-forms">check forms</li>' );
    $list.append( '<li class="js-check-popups">check popups</li>' );
    $list.append( '<li class="js-check-drop">check drop</li>' );
    $list.append( '<li class="js-check-br">check br</li>' );
    $list.append( '<li class="js-rules-init">RULES</li>' );
    $list.css({
      'position': 'fixed',
      'bottom': '50px',
      'right': '70px',
      'backgroundColor': '#000',
      'padding': '10px 15px',
      'fontSize': '14px',
      'color': '#fff',
      'zIndex': '9999',
      'display': 'block',
      'listStyle': 'none',
      'visibility': 'hidden',
      'margin': '0' 
    });
    $list.find('li').css({
      'padding': '5px 10px'
    });
    $('body').append($list);
    return $list;
  }

  class tagsFn {
    constructor() {
      this.cloneClass = 'is-clone';
      this.moreClass = 'is-more-text';
    }

    p(tag, text) {
      let cloneTag = $(tag).clone();
      cloneTag.addClass(this.cloneClass).text(cloneTag.text() +' '+ text);
      $(tag).after(cloneTag);
    }

    list(tag, text) {
      let $this = $(tag);
      let newElem = $this.find('>li').last().clone();
      newElem.addClass(this.cloneClass);
      $this.append(newElem);
    }

    texts(tag, text) {
      let $this = $(tag);
      if(!$this.find('span, a, select').length ) {
        let cont = $this.text().replace(/\s{2,}/g, ' ');
        if( cont !== ' ' && cont !== '' ) {
          $this.addClass(this.moreClass).text($this.text() +' ' + text);
        }
      }
    }

    resetAllPlugins() {
      //slick slider
      let $slick = $('.slick-initialized');
      if($slick.length) {
        $slick.slick('unslick');
      };

      //bxslider
      let $bxslider = $('.bx-wrapper');
      if( $bxslider.length ) {
        $bxslider.find('[style]').removeAttr('style');
        $bxslider.find('.bx-clone').remove();
        $bxslider.parent().find('.bx-controls').remove();
        $bxslider.find('.bx-viewport > *').removeAttr('style').unwrap();
        $bxslider.find('> *').removeAttr('style').unwrap();
      }

      //owl slider
      let $owl = $('.owl-loaded');
      if($owl.length) {
        $owl.trigger('destroy.owl.carousel');
      }
      //flexslider
      let $flexslider = $('.flex-viewport');
      if($flexslider.length) {
        $flexslider.find('[style]').removeAttr('style');
        $flexslider.find('.clone').remove();
        $flexslider.find('.flex-active-slide').removeClass('flex-active-slide');
        $flexslider.parent().find('.flex-control-nav, .flex-direction-nav').remove();
        $flexslider.find('.slides').removeAttr('style').unwrap();
      }

      //custom scroll bar
      let $customScrollBar = $('.scrollable');
      if($customScrollBar.length) {
        $customScrollBar.find('.overview').unwrap();
        $customScrollBar.find('.overview > *').unwrap('');
        $customScrollBar.removeClass('scrollable').find('.scroll-bar').remove();
      }

      //jscrollPane
      let $jscrollPane = $('.jspScrollable');
      if($jscrollPane.length) {
        $jscrollPane.each(function() {
          let scroll = $(this).jScrollPane().data().jsp;
          scroll.destroy();
        })
        
      }
    }

    update(status) {
      if(status == 'dynamic') {
        this.resetAllPlugins();
        var yourDOCTYPE = "<!DOCTYPE html>"; // your doctype declaration
        var printPreview = window.open('about:blank', '', "");
        var printDocument = printPreview.document;
        var HTML = document.documentElement.innerHTML;
        

        printDocument.write(yourDOCTYPE+
                   "<html>"+
                       HTML+
                   "</html>");
        printDocument.close();

        location.reload(); // for reload main page
      }

    }

  };


  let addAllText = fnObj => {
    let ignore = 'el-ignore';
    let dinamicIignore = 'js-dinamic-elems';
        

    let tags = {
      "P": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias unde fuga dicta architecto molestiae tempore earum nam, porro voluptatibus? Reprehenderit.",
      "UL": "UL Lorem ipsum dolor.",
      "OL": "OL Lorem ipsum dolor.",
      "SPAN": "Lorem ipsum dolor sit amet.",
      "H1": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h1",
      "H2": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h2",
      "H3": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h3",
      "H4": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h4",
      "H5": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h5",
      "H6": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, modi. h6",
      "A": "Lorem ipsum.",
      "BUTTON": "Lorem ipsum. button"
    };
    
    let app = {

      getAllTags: (function() {
        let a = []; // accessory array
        let res = []; //main array;
        for(let i in tags) {
          a.push( $(i) );
        }
        for (let i = 0; i < a.length; i++) {
          let m = a[i];
          for (let x = 0; x < m.length; x++) {
            let el = m[x];
            if( !$(el).hasClass(ignore) && !$(el).parents('.'+ignore).length ) {
              res.push(el); // push tag in main array
            }
          }
        }
        return res;
      }()),
      deligate(status) {
        let array = this.getAllTags;

        if(status === 'static') {
          array = array.filter(function(el, i) {
            if( !$(el).hasClass(dinamicIignore) && !$(el).parents('.'+dinamicIignore).length ) {
              return el;
            }
          })
        };
        console.log(array);
        for (let i = 0; i < array.length; i++) {
          let thisTag = array[i];
 
          switch(thisTag.nodeName) {
            case 'P':
              fnObj.p(thisTag, tags[thisTag.nodeName]);
              break;
            case 'UL':
            case 'OL':
              fnObj.list(thisTag, tags[thisTag.nodeName]);
              break;
            case 'SPAN':
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
            case 'A':
            case 'BUTTON':
              fnObj.texts(thisTag, tags[thisTag.nodeName]);
              break;
            default:
              console.log('page hasn`t '+thisTag+' tag');
          }
          
        }
        fnObj.update(status);
      }
    };
    
    return {
      init() {
        app.deligate();
      },
      statics() {
        app.deligate('static');
      },
      dynamic() {
        app.deligate('dynamic');
      }
    }
    
  };

  let checkForm = () => {
    let allElems = $('input, textarea, select');
    let inputText = 'Lorem ipsum.'
    let allFn = {
      input(elem) {
        if( $(elem).attr('type') === 'checkbox' || $(elem).attr('type') === 'radio' ) {
          $(elem).prop('checked', true);
        }else {
          inputText = inputText + inputText
          $(elem).val(inputText);
        }
      },
      select(elem) {
        $(elem).find('option').eq(1).prop('selected', true);
      } 
    }

    return {
      addText() {
        for (var i = 0; i < allElems.length; i++) {
          var elem = allElems[i];
          switch(elem.nodeName) {
            case 'INPUT':
            case 'TEXTAREA':
              allFn.input(elem);
              break;

            case 'SELECT':
              allFn.select(elem);
              break;

            default:
              console.log('xz');
          }
        }
      },
      check() {
        $(allElems).each(function() {
          let $form = $(this).parents('form');
          if($form.length) {
            $form.css({
              'border': '4px solid green'
            });
          }else {
            // $(this).css({
            //   'border': '2px solid red' 
            // })
          }
        })
      }
    }
  };

  let checkPopups = () => {
    let selectors = ['[data-fancybox]'];
    return {
      open() {
        selectors.forEach(function(el) {
          $(el).trigger('click');
        })
      }
    }
  };

  let checkBr = () => {
    return {
      init() {  
        let elems = $('br');
        elems.parent().css({
          'border': '1px solid yellow'
        });
        alert('на странице '+elems.length+' тегов <br>');
      }
    }
  };
  let checkDrop = () => {
    let selectors = ['.js-drop-checked'];
    return {
      open() {
        selectors.forEach(function(el) {
          $(el).trigger('click');
        })
      }
    }
  };

  let rulsFn = () => {
    let posit = () => {
      let cont = $('.container'),
          allWidth = cont.outerWidth(),
          minWidth = cont.width(),
          left = cont.offset().left + ( (allWidth - minWidth) /2 );
      return left;
    }
    let create = () => {
      let elemL = $('<div class="rules-left"></div>');
      let elemR = $('<div class="rules-right"></div>');
      let pos = posit();
      elemL.css({
        'position': 'fixed',
        'width': '1px',
        'height': '100%',
        'background': '#000',
        'top': '0',
        'left': pos,
        'zIndex': '9999'
      });
      elemR.css({
        'position': 'fixed',
        'width': '1px',
        'height': '100%',
        'background': '#000',
        'top': '0',
        'right': pos,
        'zIndex': '9999'
      });
      $('body').append(elemL);
      $('body').append(elemR);
      $('body').css('position', 'relative');
      $(window).on('resize.rules', function() {
        pos = posit();
        elemL.css('left', pos);
        elemR.css('right', pos);
      })
    };
    let remove = () => {
      $('.rules-right, .rules-left').remove();
      $(window).off('resize.rules');
    }
    return {
      toggle() {
        if( !$('.rules-right').length ) {
          create();
        }else {
          remove();
        }
      }
    }
  }


  let myForm = checkForm();
  let myText = addAllText(new tagsFn());
  let myPopyp = checkPopups();
  let myDrop = checkDrop();
  let myBr = checkBr();
  let myRuls = rulsFn();
  
  let $button = createButton();
  let $list = createSettingList();

  $(window).on('click', function(e) {
    let $this = $(e.target);

    if($this.closest('#addElems').length) {
      $list.css('visibility', 'visible');

    }else if( !$this.closest('#addElems').length && !$this.closest('.setting-block-change').length ) {
      $list.css('visibility', 'hidden');
    };

    if( $this.closest('.js-static-plus').length ) {
        myText.statics();
    };
    if( $this.closest('.js-dynamic-plus').length ) {
        myText.dynamic();
    };
    if($this.closest('.js-check-forms').length) {
      myForm.addText();
      myForm.check();
    };
    if($this.closest('.js-check-popups').length) {
      myPopyp.open();
    };
    if($this.closest('.js-check-br').length) {
      myBr.init();
    };
    if($this.closest('.js-rules-init').length) {
      myRuls.toggle();
    }
    

  });

  window.addEventListener('click', function(e) {
    
    let $this = $(e.target);
    if($this.closest('.js-check-drop').length) {
      myDrop.open();
    }
  }, false)

 
}());