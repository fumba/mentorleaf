$(document).ready(function () {

	var form = $("form#survery_form");
	
    form.steps({
        headerTag: "h2",
        bodyTag: "section",
        saveState: true,
		onStepChanged: function(e, currentIndex, priorIndex) {
               
		},
		// Triggered when clicking the Previous/Next buttons
		onStepChanging: function(e, currentIndex, newIndex) {
			var fv         = $('#survery_form').data('formValidation'), // FormValidation instance
				// The current step container
				$container = $('#survery_form').find('section[data-step="' + currentIndex +'"]');

			// Validate the container
			fv.validateContainer($container);

			var isValidStep = fv.isValidContainer($container);
			if (isValidStep === false || isValidStep === null) {
				// Do not jump to the next step
				return false;
			}

			return true;
		},
		// Triggered when clicking the Finish button
		onFinishing: function(e, currentIndex) {
			var fv         = $('#survery_form').data('formValidation'),
				$container = $('#survery_form').find('section[data-step="' + currentIndex +'"]');
			

			// Validate the last step container
			fv.validateContainer($container);

			var isValidStep = fv.isValidContainer($container);
			
			if (isValidStep === false || isValidStep === null) {
				return false;
			}

			return true;
		},
		
		onFinished: function (event, currentIndex)
		{
			form[0].submit();
		}
		
		
        }).formValidation({
        excluded: ':disabled',
        message: 'This value is not valid',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
			
			//mentee or mentor validation
			 account_type: {
                validators: {
                    notEmpty: {
                        message: 'The account type is required'
                    }
                }
            },
			
            //last name validation  
            last_name: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'The Last Name is required and cannot be empty'
                    }
                }
            },
			
            //first name validation
            first_name: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'The First Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The First Name must be more than 7 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[A-Z]+$/i,
                        message: 'The First Name can only consist of alphabetical characters'
                    }
                }
            },
            
            //objective validation
            objective_field: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'Inorder to improve matching compatibility, it is required that you state what you intend to gain from mentorleaf..'
                    },
                    
                    stringLength: {
                        min: 3,
                        max: 300,
                        message: 'The First Name must be more than 7 and less than 30 characters long'
                    }
                }
            },
            
        }

    })

});