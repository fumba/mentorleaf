
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	   
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});	
	
	
	$('#advanced_search_button').click(function(){
	    $(this).text(function(i,old){
	        return old=='Hide Advanced Search Options' ?  'Show Advanced Search Options' : 'Hide Advanced Search Options';
	    });
	});
	
	
	$("[name='active_status_switch']").bootstrapSwitch();
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("static/img/backgrounds/1.jpg");
    $('.how-it-works-container').backstretch("static/img/backgrounds/1.jpg");
    $('.call-to-action-container').backstretch("static/img/backgrounds/1.jpg");
    $('.footer-container').backstretch("static/img/backgrounds/1.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$('.top-content').backstretch("resize");
    });
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function() {
    	$('.testimonials-container').backstretch("resize");
    });
    
    /*
        Wow
    */
    new WOW().init();
    
	/*
	    Modals
	*/
	$('.launch-modal').on('click', function(e){
		e.preventDefault();
		$( '#' + $(this).data('modal-id') ).modal();
	});
    
});


jQuery(window).load(function() {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Hidden images
	*/
	$(".modal-body img, .testimonial-image img").attr("style", "width: auto !important; height: auto !important;");
	

	 
});


$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});

$(document).ready(function () {
    $('#memberModal').modal('show');
});
