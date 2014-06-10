
var auto_rotating = true;

jQuery(document).ready(function($) {

	function init(section){
		//TOC
		if ( section == toc ) {

			var imgs_content = "<div class='imgs grid toc'>";
			
			for (var i = 0; i < section.length; i++){
				imgs_content += "<div class='img img_" + section[i].id + "' data-id='" + section[i].id + "' data-src='" + section[i].url  + "'><div class='img_wrap'><img title='" + section[i].title + "' data-text='" + section[i].text + "' src='" + section[i].url + "' /></div></div>";
			}

			imgs_content += "</div>";
			$('.content').html( imgs_content );

		}
		else{

			var imgs_content = "<div class='imgs cycle'>";
			
			for (var i = 0; i < section.length; i++){
				imgs_content += "<div class='img img_" + section[i].id + "' data-id='" + i + "' data-src='" + section[i].url  + "'><div class='img_wrap'><img title='" + section[i].title + "' data-text='" + section[i].text + "' src='" + section[i].url + "' /></div></div>";
			}

			imgs_content += "<div class='pager'></div></div>";
			$('.content').html( imgs_content );

			$('.imgs').cycle({
			    timeout: 6000,
			    fx:'scrollHorz',
			    swipe: true,
			    slides: '.img',
			    pager: '.pager',
	    		pagerTemplate:"<a href='#' ><img src='{{children.0.children.0.src}}' width='44' ></a>"
			});

		}

	}


	$('.content').on('click touch', '.img', function(e){
		$('.imgs').cycle('next');
	});

	 $('.auto-rotate').on('click touch', function(e){
	 	if ( auto_rotating ){
	 		auto_rotating = 0;
	 		$(this).text('Enable Auto Advance');
	 		$('.imgs').cycle('pause');
	 	}
	 	else {
	 		auto_rotating = 6000;
	 		$(this).text('Disable Auto Advance');
	 		$('.imgs').cycle('resume');
	 	}
	 });

	 // $('.grid').on('click touch', function(e){
	 // 	if ( $('.imgs').hasClass('cycle') )	{
		//  	$('.imgs').cycle('destroy');
		//  	$('.imgs').removeClass('cycle');
		//  	$('.imgs').addClass('grid');
		//  }
		//  else{
		//  	$('.imgs').addClass('cycle');
		//  	$('.imgs').removeClass('grid');
		//  	$('.imgs').cycle({
		// 	    timeout: 6000,
		// 	    swipe: true,
		// 	    slides: '.img'
		// 	});
		//  }

	 // });
	 // $('.content').on('click touch', '.grid .img', function(e){
	 // 	$('.imgs').addClass('cycle');
	 // 	$('.imgs').removeClass('grid');
	 // 	var slide_num = parseInt($(this).data('id'));
	 // 	$('.imgs').cycle({
		//     timeout: 0,
		//     swipe: true,
		//     slides: '.img',
		// 	startingSlide: slide_num
		// });
	 // });

	 $('.content').on('click touch', '.toc .img', function(e){
	 	var this_slug = eval($(this).data('id'));
	 	// console.log(this_slug);
	 	init(this_slug);
	 });
	 
	 $('.header .title').on('click touch', function(e){
	 	init(toc);
	 })

	function onDeviceReady() {
		// https://github.com/phonegap-build/GAPlugin/blob/c928e353feb1eb75ca3979b129b10b216a27ad59/README.md
		// gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
	    // gaPlugin = window.plugins.gaPlugin;
	    // gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-XXX", 10);
		// gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "App", "Begin", quiz_article);
	}
	

	function onMenuKeyDown() {
	    // Handle the menu button
	    $('.menu-toggle').trigger('click');
	}

	function onBackKeyDown() {
	    // Handle the back button
	    // do nothing
	}

	$('#mmenu').mmenu({
		slidingSubmenus: false,
		onClick: {
			setSeleted: false,
			preventDefault: null,
			close: true
		}
	});



	function nativePluginResultHandler(){
		//success
		//console.log('nativePluginResultHandler', 'success');
	}
	function nativePluginErrorHandler() {
		//error
		//console.log('nativePluginErrorHandler', 'fail');
	}
	function goingAway() {
		// gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "App", "End", quiz_article);
	    // gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
	}


	init(toc);
});