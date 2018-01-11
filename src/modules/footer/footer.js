(function () {
    var footer = $('.js-footer');

    function autoFooter() {
        if ($('.js-footer').length) {
            var wrapper = $('.wrapper');
            var footerHeight = footer.outerHeight();

            footer.css('margin-top', -footerHeight);
            wrapper.css('padding-bottom', footerHeight);
        }
    }

    setTimeout(autoFooter, 100);
    $(window).on('resize', autoFooter);
})();
