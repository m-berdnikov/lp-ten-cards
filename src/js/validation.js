document.addEventListener('DOMContentLoaded', () => {

    let hiddenFormWrapper = document.querySelector('.js-hidden-form-wrapper');
    let btnShowForm = document.querySelector('.js-btn-show-form');
    let formSignUp = document.querySelector('.js-form-subscribe');

    let subsFb = document.querySelector('.js-subscribe-fb');
    let subsGoogle = document.querySelector('.js-subscribe-google');

    formSignUp && hiddenFormWrapper && btnShowForm && window.urlSubscribe && window.urlPrediction && initEmailSub();
    subsFb && window.urlSubscribe && window.urlPrediction && initFbSub();
    subsGoogle && window.urlSubscribe && window.urlPrediction && initGoogle();

    function initEmailSub() {
        btnShowForm.addEventListener('click', ()=>{
            btnShowForm.classList.add('hide');
            hiddenFormWrapper.classList.remove('hide');
        });

        new JustValidate('.js-form-subscribe', {
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            submitHandler: function (form, values, ajax) {
                grecaptcha.ready(function () {
                    grecaptcha.execute('6Lfc4aYUAAAAAC-cp7c9qM88wgGqV0eN2q80CFM7', {action: 'subscribe'})
                        .then(function (token) {
                            values.token = token;
                            sendGtag('Click', 'TarotLRegistration', 'Email');
                            subscribeUser(ajax, values);
                        });
                });
            }
        });
    }

    function initFbSub() {
        subsFb.addEventListener('click', () => {
            let valuesForm = {};
            FB.login(function (response) {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me', {fields: 'name, email'}, function (response) {
                            if (typeof response.email === 'undefined') {
                                alert('Connection error.');
                                return;
                            } else {
                                if (response.email) {
                                    valuesForm.email = response.email;
                                } else {
                                    alert('There is no email address in your profile. Please use the form we provide.');
                                    return;
                                }

                                valuesForm.type = 'facebook';
                                subsFb.innerHTML = 'Done!';
                                sendGtag('Click', 'TarotLRegistration', 'Facebook');
                                subscribeUser(ajax.run, valuesForm);
                            }
                        });
                    } else {
                        alert('Connection error.');
                    }
                });

            }, {scope: 'public_profile,email', return_scopes: true});
        });

    }

    function initGoogle() {

        let scriptGoogle = document.createElement('script');

        scriptGoogle.src = "https://apis.google.com/js/api:client.js";
        document.head.append(scriptGoogle);

        scriptGoogle.addEventListener('load', ()=>{

            let intervalGoogle = setInterval(()=>{
                if (window.gapi.auth2){
                    clearInterval(intervalGoogle);

                    subsGoogle.classList.remove('disabled');

                    let auth2 = window.gapi.auth2.init({
                        client_id: '860500298981-41si33uktnvb9judfnk0sgc6nnbnhpnk.apps.googleusercontent.com',
                        cookiepolicy: 'https://daily-horoscope.us',
                        // Request scopes in addition to 'profile' and 'email'
                        //scope: 'additional_scope'
                    });

                    let googleUser = {};
                    let valuesGoogle = {};

                    window.gapi.load('auth2', function () {
                        // let element = document.getElementById('customBtn');
                        auth2.attachClickHandler(subsGoogle, {},
                            function (googleUser) {

                                valuesGoogle.type = 'google';
                                valuesGoogle.email = googleUser.getBasicProfile().getEmail();
                                subsGoogle.innerHTML = 'Done!';
                                sendGtag('Click', 'TarotLRegistration', 'Gmail Account');
                                subscribeUser(ajax.run, valuesGoogle);

                            }, function (error) {
                                // alert(JSON.stringify(error, undefined, 2));
                            });
                    });
                }
            }, 500);
        });

        // subsGoogle.addEventListener('click', () => {});
    }

    function subscribeUser(ajax, values) {
        ajax({
            url: window.urlSubscribe,
            method: 'POST',
            async: true,
            data: 'data=' + JSON.stringify(values),
            callback: function (resp) {
                if (resp === 'new_user' || resp === 'old_user' || resp === 'DOI' || resp === 'used') {
                    location.href = window.urlPrediction;
                    sendGtag('subscribe', 'XR posting', 'TarotLP');
                } else {
                    alert('Oops! Something went wrong… try again later.');
                }
            }
        });
    }

    function sendGtag(action, category, label) {
        gtag && gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }

});