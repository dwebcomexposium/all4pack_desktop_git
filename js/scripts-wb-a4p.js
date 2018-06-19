var $win                   = $(window);
var $header                = $('.site-banner');
var $socials               = $('.socials--sticky');
var $animate               = $('.section-head, .secteurs, .decouvrez, .section-head, .secteurs, .decouvrez, .gla-item-title, .catal-ex-item, .youmax-small-container, .section__head, .full .article-title');
var $wrappedItems          = $('.la-item-img, .at-illust, .center img');
var $wrappedText           = $('.at-main-title, .article-wrapper h4');
var newsletterPlaceholders = {
	fr: 'Indiquez votre email...',
	en: 'Enter your email...'
};

/*
 * Detect Mac
 */
$('body')
	.toggleClass('is-mac', navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false)
	.toggleClass('is-ie', navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1 ? true : false);

/*
 * Change newsletter placeholder
 */
$('.nf-form-txt').attr('placeholder', newsletterPlaceholders[$('html').attr('lang')]);

$('.optin-container .nf-form-input input').after('<span></span>');

$('.newsletter-form .optin-container .nf-form-input').on('click', function() {
	var $check = $(this).find('input');

	$check.prop('checked', !$check.is(':checked'));
});

/*
 * Animate
 */
$animate.addClass('animate');

$wrappedItems.wrap('<div class="container"></div>');

/*
 * Article
 */
if ($('.socials-primary').length) {
	$('.socials-primary').appendTo('.at-content');
}


if ($('body').hasClass('full')) {
	$('.article-intro').appendTo('.at-content');
}

/*
 * Texte count
 */
 
$('.js-count-to').each(function() {
	var $this           = $(this);
	var $statsContainer = $this.closest('.stats');
	var number          = $this.data('count-to');

	$win.on('load scroll', function() {
		var winST = $win.scrollTop();

		if (winST + $win.outerHeight() / 2 > $statsContainer.offset().top && !$this.hasClass('counted')) {
			$this.addClass('counted');

			$({ counter: 0 }).animate({
				counter: number
			}, {
				step: function(now) {
					if (now < 1000) {
						$this.text(parseInt(now));
					} else {
						$this.text((parseInt(now) / 1000).toFixed(3));
					}
				},
				duration: 2000
			});
		}
	});
});

/*
 * Langues
 */
$('.ls-lang-list').append('<li class="ls-lang-item ls-lang-de"><a href="#" class="ls-lang-link"></a></li><li class="ls-lang-item ls-lang-es"><a href="#" class="ls-lang-link"></a></li><li class="ls-lang-item ls-lang-it"><a href="#" class="ls-lang-link"></a></li>');

/*
 * Article shadow
 */
$wrappedText.wrapInner('<span></span>');

/*
 * Scroll to 
 */
$('.js-scroll')
	.off('click')
	.on('click', function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 700);
	});

/*
 * Wrap text box shadow
 */
$('.secteurs .ql-item .txt-btn').wrapInner('<span></span>');

/*
 * Youmax 
 */
if ($('#youmax').length) {
	$('#youmax').youmax({
		apiKey: 'AIzaSyCNbIqgoVrq7IPkHr_NBMquEXAFu9zv474',
		vimeoAccessToken: '',
		clientId: '438137961980-vlefbf8sgps4r5fqon9u92m93n0hc1pi.apps.googleusercontent.com',
		channel: '',
		youtube_playlist_videos: [{
			name: 'Videos',
			url: 'https://www.youtube.com/watch?v=5Tpjlmy4wsk&list=PLZqovFqfp6OjDQC0aAvLGg-SyudWaymkT',
			selected: true
		}],
		loadMode: 'paginate-sides',
		loadButtonSize: 'small',
		hideHeader: true,
		hideNavigation: true,
		hideComments: true,
		maxResults: 4,
		tabStyle: 'wire',
		youmaxBackgroundColor: '#ffffff',
		maxContainerWidth: 1120,
		fourColumnThumbnailWidth: '21.429%',
		fourColumnThumbnailLeftRightMargin: '1.78%',
		videoProtocol: 'https:'
	});
};


$win
	.on('load', function() {
		// Fix list links tiret
		if ($('.list-links').length) {
			var offset = $('.list-links li:first-child').offset().top; 

			$('.list-links li').each(function() {
				var $li           = $(this);
				var elementOffset = $li.offset().top;

				if (elementOffset !== offset) {
					$li.addClass('is-newline');

					offset = elementOffset;
				}
			});
		}

		// Ralenti video
		if ($('.js-video').length) {
			$('.js-video')
				.get(0)
					.playbackRate = .7;
		}

		// Parallax eiffel
		if (!('ontouchstart' in window)) {
			skrollr.init();
		}

		// Testimonials slider
		if ($('.slider__slides').length) {
	 		$('.slider__slides').carouFredSel({
	 			responsive: true,
				items: 1,
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play           : true,
					timeoutDuration: 5000
				},
				prev: {
					button: '.slider__prev'
				},
				next: {
					button: '.slider__next'
				},
				infinite: true
			});
		}
	}).on('load scroll', function() {
		var winST = $win.scrollTop();

	 	// Sticky header
		$header.toggleClass('is-fixed', winST > 350);

		// Sticky socials
		$socials.toggleClass('sticky-visible', winST > $('#zone2').offset().top);

		// Animated elements
		$animate.each(function(){
			var $this  = $(this);
			var offset = $this.offset().top;

			if (winST + ($win.outerHeight() * 0.8) > offset) {
				$this.addClass('animated');
			}
		});

		if (winST + $win.outerHeight() > $('.site-footer').offset().top) {
			$animate.addClass('animated');
		}
	});

/*
 * Google maps
 */
window.initMap = function() {
	var $map = $('.map');
	var lat  = $map.data('lat');
	var lng  = $map.data('lng');

	new google.maps.Map($map.get(0), {
		center			: {
			lat: lat,
			lng: lng
		},
		zoom   			: 13,
		disableDefaultUI: true,
		styles 		    : [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
	});
};
