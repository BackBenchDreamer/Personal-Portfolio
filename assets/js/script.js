$(function() {
    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
        if ($(this).hasClass('act')) {
            $('.main-menu').addClass('act');
        } else {
            $('.main-menu').removeClass('act');
        }
    });

    // Close the navbar when any link is clicked
    $('.main-menu a').click(function() {
        $('.navbar-toggle').removeClass('act'); // Remove the active class from the toggle
        $('.main-menu').removeClass('act'); // Close the menu
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

    /* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
        $('.progress .progress-bar').progressbar({
            transition_delay: 500
        });
    }

    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolls again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length > 0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
                offset = stat_item.offset().top;
            $(window).scroll(function() {
                if ($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    }

    // another custom callback for counting to infinity
    $('#infinity').data('countToOptions', {
        onComplete: function(value) {
            count.call(this, {
                from: value,
                to: value + 1
            });
        }
    });

    $('#infinity').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
        forceHeight: false,
        smoothScrolling: false,
        mobileDeceleration: 0.004,
        mobileCheck: function() {
            //hack - forces mobile version to be off
            return false;
        }
    });
});

document.addEventListener('scroll', function() {
    const sidebar = document.querySelector('.sidebar'); // Select the sidebar
    const heroSection = document.querySelector('#hero'); // Select the hero section
    const heroSectionHeight = heroSection.offsetHeight; // Get the height of the hero section

    // Check if the scroll position is greater than the hero section height
    if (window.scrollY > heroSectionHeight) {
        sidebar.classList.add('visible'); // Add class to show the sidebar
    } else {
        sidebar.classList.remove('visible'); // Remove class to hide the sidebar
    }
});