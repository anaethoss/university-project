jQuery(function($) {
    "use strict";
    /**
     * Validations
     */


    var su_form = $("#newRegisterForm"),
        signInForm = $("#signInForm");

    su_form.validate({
        onblur: true,
        rules: {
            su_name: "required",
            su_username: "required",
            su_email: {
                required: true,
                email: true
            },
            su_mobileNumber: {
                minlength:11,
                maxlength:11,
                required: true,
                number: true
            },
            su_password:{
                minlength:6,
                required:true
            },
            su_confirm_password:{
                minlength:6,
                required:true,
                equalTo:"#su_password"
            }
        },
        messages: {
            su_name: "Please enter your name",
            su_username: "Please choose a username",
            su_email: "Please enter valid email address",
            su_mobileNumber: "Please enter valid mobile number",
            su_confirm_password:{
                required:"Password confirmation is required",
                minlength:"Please enter same password as above",
                equalTo:"Please enter same password as above"
            },
            su_password:{
                required:"Password is required",
                minlength:"Password must have at least 6 characters"
            }
        },
        showErrors: function() {
            this.defaultShowErrors();
            su_form.find("input.valid").parent().addClass("valid-block");
            su_form.find("input.error").parent().removeClass("valid-block");
        },
        success: function() {
            console.log("success");
        }
    });

    signInForm.validate({
        onblur: true,
        rules: {
            si_username: "required",
            si_password:{
                minlength:6,
                required:true
            }
        },
        messages: {
            si_username: "Valid username is required",
            si_password:{
                required:"Valid Password is required",
                minlength:"Please enter a valid password"
            }
        },
        showErrors: function() {
            this.defaultShowErrors();
            //signInForm.find("input.valid").parent().addClass("valid-block");
            //signInForm.find("input.error").parent().removeClass("valid-block");
        },
        success: function() {
            console.log("success");
        }
    });


});