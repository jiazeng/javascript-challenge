/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

//Listen for the DOMContentLoaded Event
//Load the State Select
document.addEventListener('DOMContentLoaded', function() {
    //var states = document.getElementById('usStates');
    var signUp = document.getElementById('signup');
    var statesSelect = signUp.elements['state'];
    var idx;
    var option;
    var state;

    for(idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        state = usStates[idx];
        option.innerHTML = state.name;
        option.value = state.code;
        statesSelect.appendChild(option);
    }

    //Hide/Show the Occupation Other Input
    var occupationList = document.getElementById('occupation');
    occupationList.addEventListener('change', function() {
        var selectedOption = signUp.elements['occupation'].value;
        var other = document.getElementsByName('occupationOther')[0];
        if (selectedOption == 'other') {
            other.style.display = 'block';
        } else {
            other.style.display = 'none';
            other.value = "";
        }
    });

    //Confirm the "No Thanks" Button
    //add an event listener for the 'click' even on the cancel button
    var cancelButton = document.getElementById('cancelButton');
    //console.log(cancelButton);
    cancelButton.addEventListener('click', function () {
        if (window.confirm("Are you really sure you want to leave?")) {
            window.location = 'http://ischool.uw.edu';
        }
    });

    signUp.addEventListener('submit', onSubmit);

});

    //Validate the Form Before Submit
    function onSubmit(event) {
        //document.getElementById("myText").value = "Johnny Bravo";
        //firstName, lastName, address1, city, state, zip, birthdate
        var valid = true;

        try {
            valid = validateForm(this); //this refers to the form
        }
        catch(exception) {
            valid = false;
            console.log(exception);
        }
        if (!valid && event.preventDefault) {
            event.preventDefault();
        }

        event.returnValue = valid;
        console.log(valid);
    }

    /* validateForm()
     * This function validates the form's information and returns true if the form is valid or false if the form is invalid.
     * It will also let the user know which fields are invalid.
     * parameters:
     *   form    reference to the form that needs to be validated
     * */
    function validateForm(form) {
        var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        var idx;
        var valid = true;

        if (document.getElementById('occupation').value == 'other') {
            requiredFields.push('occupationOther');
        }

        for(idx = 0; idx < requiredFields.length; idx++) {
            valid &= validateRequiredField(form.elements[requiredFields[idx]]);
        }

        if(!validateZip(form.elements['zip'])) {
            valid = false;
            form.elements['zip'].style.border = "1px solid #FF0000";
        } else {
            form.elements['zip'].style.border = "1px solid #CCC";
        }
        if(!validateAge(document.getElementById('birthdate'))) {
            valid = false;
        }
        return valid;
    }

    /* validateRequiredField()
     * This function validates a field that is required. If the field does not have a value, or has only spaces,
     * it will mark the field as invalid and return false. Otherwise it will return true.
     * */
    function validateRequiredField(field) {
        var value = field.value.trim();
        var valid = value.length >0;

        if(valid) {
            field.className = 'form-control';
        } else {
            field.className = 'form-control invalid-field';
        }
        return valid;
    }

    //validate zip code, must be 5 digits
    function validateZip(zip) {
        var zipRegExp = new RegExp('^\\d{5}$');
        return zipRegExp.test(zip.value);
    }

    //validate age, must be 13 years older
    function validateAge(birthdate) {
        var validAge;
        var dob = new Date(birthdate.value);
        var today = new Date(); //represent time in current time zone
        var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
        var monthsDiff = today.getMonth() - dob.getUTCMonth();
        var daysDiff = today.getDate() - dob.getUTCDate();

        if(monthsDiff < 0 || (monthsDiff == 0 && daysDiff < 0)) {
            yearsDiff--;
        }
        console.log(yearsDiff);
        validAge = yearsDiff >= 13;
        if(!validAge) {
            birthdate.style.border = "1px solid #FF0000";
            document.getElementById('birthdateMessage').innerHTML = 'Sorry, the user must be 13 years or older to sign up.';
        } else {
           birthdate.style.border = "1px solid #CCC";
            document.getElementById('birthdateMessage').innerHTML = null;
        }
        console.log('age：' + validAge);
        return validAge;
    }
//});