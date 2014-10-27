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
        if(selectedOption == 'other') {
            signUp.elements['occupationOther'].style.dsplay = 'block';
        }
    });

    //Confirm the "No Thanks" Button
    //add an event listener for the 'click' even on the cancel button
    var cancelButton = document.getElementById('cancelButton');
    console.log(cancelButton);
    cancelButton.addEventListener('click', function() {
        if(window.confirm("Are you really sure you want to leave?")) {
            window.location = 'http://ischool.uw.edu';
        }
    });

    //Validate the Form Before Submit
    document.getElementById('signup').addEventListener('submit', onSubmit);


    function onSubmit(evt) {
        //document.getElementById("myText").value = "Johnny Bravo";
        //firstName, lastName, address1, city, state, zip, birthdate
        try {
            var valid = validateForm(this); //this refers to the form
        }
        catch(exception) {
            console.log(exception);
            valid = false;
        }
        if (!valid && evt.preventDefault) {
            evt.preventDefault();
        }
        evt.returnValue = valid;

        return valid;
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

        if (signUp.elements['occupation'].value == 'other') {
            requiredFields.push('occupationOther');
        }

        for(idx = 0; idx < requiredFields.length; idx++) {
            valid &= validateRequiredField(form.elements[requiredFields[idx]]);
        }
        valid &= validateZip(signUp.elements['zip']);
        valid &= validateAge(signUp.elements['birthdate']);
        return valid;
    }

    /* validateRequiredField()
     * This function validates a field that is required. If the field does not have a value, or has only spaces,
     * it will mark the field as invalid and return false. Otherwise it will return true.
     * */
    function validateRequiredField(field) {
        var value = field.value;
        value = value.trim();
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
        return zipRegExp.test(zip);
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
            document.getElementById('birthdateMessage').innerHTML = 'Sorry, the user must be 13 years or older to sign up.';
        }
        return validAge;
    }
});

//validate form
