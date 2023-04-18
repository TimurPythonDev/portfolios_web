(function ($) {
    "use strict";
    $(document).ready(function () {
        // resize iframe to fit content
        var $iframes = $("iframe");
        $iframes.each(function() {
            var fr = this;
            $(fr).load(function() {
                fr.height = fr.contentWindow.document.body.scrollHeight + 35;
            });
        });

        var jPanelMenu = $.jPanelMenu({
            menu: '#responsive',
            animated: false,
            duration: 200,
            keyboardShortcuts: false,
            closeOnContentClick: true
        });
        $('.menu-trigger').on('click', function () {
            var jpm = $(this);
            if (jpm.hasClass('active')) {
                jPanelMenu.off();
                jpm.removeClass('active');
            } else {
                jPanelMenu.on();
                jPanelMenu.open();
                jpm.addClass('active');
                $('#jPanelMenu-menu').removeClass('menu');
                $('ul#jPanelMenu-menu li').removeClass('dropdown');
                $('ul#jPanelMenu-menu li ul').removeAttr('style');
                $('ul#jPanelMenu-menu li div').removeClass('mega').removeAttr('style');
                $('ul#jPanelMenu-menu li div div').removeClass('mega-container');
            }
            return false;
        });
        $(window).resize(function () {
            var winWidth = $(window).width();
            if (winWidth > 992) {
                jPanelMenu.close();
            }
        });
        $('.user-menu').on('click', function () {
            $(this).toggleClass('active');
        });
        $("#header").not("#header.not-sticky").clone(true).addClass('cloned unsticky').insertAfter("#header");
        $("#navigation.style-2").clone(true).addClass('cloned unsticky').insertAfter("#navigation.style-2");
        $("#logo .sticky-logo").clone(true).prependTo("#navigation.style-2.cloned ul#responsive");
        var headerOffset = $("#header-container").height() * 2;
        $(window).scroll(function () {
            if ($(window).scrollTop() >= headerOffset) {
                $("#header.cloned").addClass('sticky').removeClass("unsticky");
                $("#navigation.style-2.cloned").addClass('sticky').removeClass("unsticky");
            } else {
                $("#header.cloned").addClass('unsticky').removeClass("sticky");
                $("#navigation.style-2.cloned").addClass('unsticky').removeClass("sticky");
            }
        });
        var pxShow = 600;
        var scrollSpeed = 500;
        $(window).scroll(function () {
            if ($(window).scrollTop() >= pxShow) {
                $("#backtotop").addClass('visible');
            } else {
                $("#backtotop").removeClass('visible');
            }
        });
        $('#backtotop a').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, scrollSpeed);
            return false;
        });

        $('.category-box').each(function () {
            $(this).append('<div class="category-box-background"></div>');
            $(this).children('.category-box-background').css({
                'background-image': 'url(' + $(this).attr('data-background-image') + ')'
            });
        });
        $('.img-box').each(function () {
            $(this).append('<div class="img-box-background"></div>');
            $(this).children('.img-box-background').css({
                'background-image': 'url(' + $(this).attr('data-background-image') + ')'
            });
        });
        if ("ontouchstart" in window) {
            document.documentElement.className = document.documentElement.className + " touch";
        }

        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
        $('.mfp-image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            image: {
                verticalFit: true
            }
        });
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        var $tabsNav = $('.tabs-nav'),
            $tabsNavLis = $tabsNav.children('li');
        $tabsNav.each(function () {
            var $this = $(this);
            $this.next().children('.tab-content').stop(true, true).hide().first().show();
            $this.children('li').first().addClass('active').stop(true, true).show();
        });
        $tabsNavLis.on('click', function (e) {
            var $this = $(this);
            $this.siblings().removeClass('active').end().addClass('active');
            $this.parent().next().children('.tab-content').stop(true, true).hide().siblings($this.find('a').attr('href')).fadeIn();
            e.preventDefault();
        });
        var hash = window.location.hash;
        var anchor = $('.tabs-nav a[href="' + hash + '"]');
        if (anchor.length === 0) {
            $(".tabs-nav li:first").addClass("active").show();
            $(".tab-content:first").show();
        } else {
            anchor.parent('li').click();
        }
        var $accor = $('.accordion');
        $accor.each(function () {
            $(this).toggleClass('ui-accordion ui-widget ui-helper-reset');
            $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
            $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
            $(this).find("div").hide();
        });
        var $trigger = $accor.find('h3');
        $trigger.on('click', function (e) {
            var location = $(this).parent();
            if ($(this).next().is(':hidden')) {
                var $triggerloc = $('h3', location);
                $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
                $triggerloc.find('span').removeClass('ui-accordion-icon-active');
                $(this).find('span').addClass('ui-accordion-icon-active');
                $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
            }
            e.preventDefault();
        });
        $(".toggle-container").hide();
        $('.trigger, .trigger.opened').on('click', function (a) {
            $(this).toggleClass('active');
            a.preventDefault();
        });
        $(".trigger").on('click', function () {
            $(this).next(".toggle-container").slideToggle(300);
        });
        $(".trigger.opened").addClass("active").next(".toggle-container").show();
        $(".tooltip.top").tipTip({
            defaultPosition: "top"
        });
        $(".tooltip.bottom").tipTip({
            defaultPosition: "bottom"
        });
        $(".tooltip.left").tipTip({
            defaultPosition: "left"
        });
        $(".tooltip.right").tipTip({
            defaultPosition: "right"
        });
        $('.like-icon, .widget-button, .like-button').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('liked');
            $(this).children('.like-icon').toggleClass('liked');
        });
        $('.more-search-options-trigger').on('click', function (e) {
            e.preventDefault();
            $('.more-search-options, .more-search-options-trigger').toggleClass('active');
            $('.more-search-options.relative').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 300);
        });
        $(window).on('load resize', function () {
            var winWidth = $(window).width();
            var headerHeight = $("#header-container").height();
            $('.fs-inner-container, .fs-inner-container.map-fixed, #dashboard').css('padding-top', headerHeight);
            if (winWidth < 992) {
                $('.fs-inner-container.map-fixed').insertBefore('.fs-inner-container.content');
            } else {
                $('.fs-inner-container.content').insertBefore('.fs-inner-container.map-fixed');
            }
        });
        $(window).on('load resize', function () {
            $('.dashboard-stat-content h4').counterUp({
                delay: 100,
                time: 800
            });
        });
        $('.leave-rating input').change(function () {
            var $radio = $(this);
            $('.leave-rating .selected').removeClass('selected');
            $radio.closest('label').addClass('selected');
        });
        $('.dashboard-nav ul li a').on('click', function () {
            if ($(this).closest('li').has('ul').length) {
                $(this).parent('li').toggleClass('active');
            }
        });
        $(".tip").each(function () {
            var tipContent = $(this).attr('data-tip-content');
            $(this).append('<div class="tip-content">' + tipContent + '</div>');
        });
        $(".add-listing-section").each(function () {
            var switcherSection = $(this);
            var switcherInput = $(this).find('.switch input');
            if (switcherInput.is(':checked')) {
                $(switcherSection).addClass('switcher-on');
            }
            switcherInput.change(function () {
                if (this.checked === true) {
                    $(switcherSection).addClass('switcher-on');
                } else {
                    $(switcherSection).removeClass('switcher-on');
                }
            });
        });
        $('.dashboard-responsive-nav-trigger').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            var dashboardNavContainer = $('body').find(".dashboard-nav");
            if ($(this).hasClass('active')) {
                $(dashboardNavContainer).addClass('active');
            } else {
                $(dashboardNavContainer).removeClass('active');
            }
        });
        $(window).on('load resize', function () {
            var msgContentHeight = $(".message-content").outerHeight();
            var msgInboxHeight = $(".messages-inbox ul").height();
            if (msgContentHeight > msgInboxHeight) {
                $(".messages-container-inner .messages-inbox ul").css('max-height', msgContentHeight)
            }
        });

        function newMenuItem() {
            var newElem = $('tr.pricing-list-item.pattern').first().clone();
            newElem.find('input').val('');
            newElem.appendTo('table#pricing-list-container');
        }
        if ($("table#pricing-list-container").is('*')) {
            $('.add-pricing-list-item').on('click', function (e) {
                e.preventDefault();
                newMenuItem();
            });
            $(document).on("click", "#pricing-list-container .delete", function (e) {
                e.preventDefault();
                $(this).parent().parent().remove();
            });
            $('.add-pricing-submenu').on('click', function (e) {
                e.preventDefault();
                var newElem = $('' + '<tr class="pricing-list-item pricing-submenu">' + '<td>' + '<div class="fm-move"><i class="sl sl-icon-cursor-move"></i></div>' + '<div class="fm-input"><input type="text" placeholder="Category Title" /></div>' + '<div class="fm-close"><a class="delete" href="#"><i class="fa fa-remove"></i></a></div>' + '</td>' + '</tr>');
                newElem.appendTo('table#pricing-list-container');
            });
            $('table#pricing-list-container tbody').sortable({
                forcePlaceholderSize: true,
                forceHelperSize: false,
                placeholder: 'sortableHelper',
                zIndex: 999990,
                opacity: 0.6,
                tolerance: "pointer",
                start: function (e, ui) {
                    ui.placeholder.height(ui.helper.outerHeight());
                }
            });
        }
        var fieldUnit = $('.pricing-price').children('input').attr('data-unit');
        $('.pricing-price').children('input').before('<i class="data-unit">' + fieldUnit + '</i>');
        $("a.close").removeAttr("href").on('click', function () {
            function slideFade(elem) {
                var fadeOut = {
                    opacity: 0,
                    transition: 'opacity 0.5s'
                };
                elem.css(fadeOut).slideUp();
            }
            slideFade($(this).parent());
        });

        function close_panel_dropdown() {
            $('.panel-dropdown').removeClass("active");
            $('.fs-inner-container.content').removeClass("faded-out");
        }
        $('.panel-dropdown a').on('click', function (e) {
            if ($(this).parent().is(".active")) {
                close_panel_dropdown();
            } else {
                close_panel_dropdown();
                $(this).parent().addClass('active');
                $('.fs-inner-container.content').addClass("faded-out");
            }
            e.preventDefault();
        });
        $('.panel-buttons button').on('click', function (e) {
            $('.panel-dropdown').removeClass('active');
            $('.fs-inner-container.content').removeClass("faded-out");
        });
        var mouse_is_inside = false;
        $('.panel-dropdown').hover(function () {
            mouse_is_inside = true;
        }, function () {
            mouse_is_inside = false;
        });
        $("body").mouseup(function () {
            if (!mouse_is_inside) close_panel_dropdown();
        });
        $('.checkboxes.categories input').on('change', function () {
            if ($(this).hasClass('all')) {
                $(this).parents('.checkboxes').find('input').prop('checked', false);
                $(this).prop('checked', true);
            } else {
                $('.checkboxes input.all').prop('checked', false);
            }
        });
        $('.show-more-button').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.show-more').toggleClass('visible');
            if ($('.show-more').is(".visible")) {
                var el = $('.show-more'),
                    curHeight = el.height(),
                    autoHeight = el.css('height', 'auto').height();
                el.height(curHeight).animate({
                    height: autoHeight
                }, 400);
            } else {
                $('.show-more').animate({
                    height: '450px'
                }, 400);
            }
        });
        $(window).on('load resize', function () {
            var containerWidth = $(".container").width();
            $('.listing-nav-container.cloned .listing-nav').css('width', containerWidth);
        });
        if (document.getElementById("listing-nav") !== null) {
            $(window).scroll(function () {
                var window_top = $(window).scrollTop();
                var div_top = $('.listing-nav').not('.listing-nav-container.cloned .listing-nav').offset().top + 90;
                if (window_top > div_top) {
                    $('.listing-nav-container.cloned').addClass('stick');
                } else {
                    $('.listing-nav-container.cloned').removeClass('stick');
                }
            });
        }
        $(".listing-nav-container").clone(true).addClass('cloned').prependTo("body");
        $('.listing-nav a, a.listing-address, .star-rating a').on('click', function (e) {
            e.preventDefault();
            $('html,body').scrollTo(this.hash, this.hash, {
                gap: {
                    y: -20
                }
            });
        });
        $(".listing-nav li:first-child a, a.add-review-btn, a[href='#add-review']").on('click', function (e) {
            e.preventDefault();
            $('html,body').scrollTo(this.hash, this.hash, {
                gap: {
                    y: -100
                }
            });
        });
        $(window).on('load resize', function () {
            var aChildren = $(".listing-nav li").children();
            var aArray = [];
            for (var i = 0; i < aChildren.length; i++) {
                var aChild = aChildren[i];
                var ahref = $(aChild).attr('href');
                aArray.push(ahref);
            }
            $(window).scroll(function () {
                var windowPos = $(window).scrollTop();
                for (var i = 0; i < aArray.length; i++) {
                    var theID = aArray[i];
                    var divPos = $(theID).offset().top - 150;
                    var divHeight = $(theID).height();
                    if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                        $("a[href='" + theID + "']").addClass("active");
                    } else {
                        $("a[href='" + theID + "']").removeClass("active");
                    }
                }
            });
        });
        var shake = "No";
        $('#message').hide();
        $('#contact input[type=text], #contact input[type=number], #contact input[type=email], #contact input[type=url], #contact input[type=tel], #contact select, #contact textarea').each(function () {});
        $('#name, #comments, #subject').focusout(function () {
            if (!$(this).val()) {
                $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
            } else {
                $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
            }
            $('#submit').prop('disabled', false).removeClass('disabled');
        });
        $('#email').focusout(function () {
            if (!$(this).val() || !isEmail($(this).val())) {
                $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
            } else {
                $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
            }
        });
        $('#email').focusin(function () {
            $('#submit').prop('disabled', false).removeClass('disabled');
        });
        $('#submit').on('click', function () {
            $("#contact-message").slideUp(200, function () {
                $('#contact-message').hide();
                $('#name, #subject, #phone, #comments, #website, #email').triggerHandler("focusout");
                if ($('#contact mark.error').size() > 0) {
                    if (shake == "Yes") {
                        $('#contact').effect('shake', {
                            times: 2
                        }, 75, function () {
                            $('#contact input.error:first, #contact textarea.error:first').focus();
                        });
                    } else $('#contact input.error:first, #contact textarea.error:first').focus();
                    return false;
                }
            });
        });
        $('#contactform').submit(function () {
            if ($('#contact mark.error').size() > 0) {
                if (shake == "Yes") {
                    $('#contact').effect('shake', {
                        times: 2
                    }, 75);
                }
                return false;
            }
            var action = $(this).attr('action');
            $('#contact #submit').after('<img src="images/loader.gif" class="loader" />');
            $('#submit').prop('disabled', true).addClass('disabled');
            $.post(action, $('#contactform').serialize(), function (data) {
                $('#contact-message').html(data);
                $('#contact-message').slideDown();
                $('#contactform img.loader').fadeOut('slow', function () {
                    $(this).remove();
                });
                if (data.match('success') !== null) $('#contactform').slideUp('slow');
            });
            return false;
        });

        function isEmail(emailAddress) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            return pattern.test(emailAddress);
        }
    });
})(this.jQuery);
$.scrollTo = $.fn.scrollTo = function (x, y, options) {
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);
    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);
    return this.each(function () {
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
        }, options.animation);
    });
};