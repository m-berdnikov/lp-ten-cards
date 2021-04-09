document.addEventListener('DOMContentLoaded', () => {

    let hiddenFormWrapper = document.querySelector('.js-hidden-form-wrapper');
    let btnShowForm = document.querySelector('.js-btn-show-form');
    let formSignUp = document.querySelector('.js-form-subscribe');

    formSignUp && hiddenFormWrapper && btnShowForm && window && window.urlPrediction && initEmailSub();

    function initEmailSub() {
        btnShowForm.addEventListener('click', () => {
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
                // grecaptcha.ready(function () {
                //     grecaptcha.execute('~~recaptcha id~~', {action: 'subscribe'})
                //         .then(function (token) {
                // values.token = token;
                subscribeUser(ajax, values);
                // });
                // });
            }
        });
    }

    function subscribeUser(ajax, values) {
        ajax({
            url: window.urlSubscribe,
            method: 'POST',
            async: true,
            data: 'data=' + JSON.stringify(values),
            callback: function (resp) {
                if (resp === 'OK') {
                    location.href = window.urlPrediction;
                } else {
                    alert('Oops! Something went wrong… try again later.');
                }
            }
        });
    }
});
