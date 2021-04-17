'use strict';

document.addEventListener('DOMContentLoaded', () => {

    let formWrapper = document.querySelector('.js-form-wrapper');
    let showButton = document.querySelector('.js-show-form-button');
    let formSignUp = document.querySelector('.js-form-subscribe');

    formSignUp && formWrapper && showButton && window.urlSubscribe && window.urlPrediction && initSub();
    formSignUp && window.urlSubscribe && window.urlPrediction && createMask();

    function cleanPhone(phone) {
        phone = phone.replace('(', '');
        phone = phone.replace(')', '');
        phone = phone.replace('-', '');
        phone = phone.replace('+1', '');
        return phone;
    }

    function createMask() {
        let elements = document.getElementsByClassName('js-subscribe-input');
        for (let i = 0; i < elements.length; i++) {
            new IMask(elements[i], {
                mask: '+1(000)000-0000',
            });
        }
    }


    function initSub() {
        showButton.addEventListener('click', () => {
            showButton.classList.add('hide');
            formWrapper.classList.remove('hide');
        });

        new JustValidate('.js-form-subscribe', {
            rules: {
                phone: {
                    required: true,
                }
            },
            messages: {
                phone:
                    'Invalid phone',
            },
            submitHandler: function (form, values, ajax) {
                subscribeUser(ajax, values);
            }
        });
    }

    function subscribeUser(ajax, values) {
        values.phone = cleanPhone(values.phone);
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
