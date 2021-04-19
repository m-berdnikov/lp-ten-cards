'use strict';

document.addEventListener('DOMContentLoaded', function () {

    let CARD_DB = [
        'hermit',
        'death',
        'handet-man',
        'justice',
        'devil',
        'sun',
        'lovers',
        'whell-of-fortune',
        'temperance',
        'strength'
    ];

    let cards = document.querySelectorAll('.js-card');
    let cardsFront = document.querySelectorAll('.js-card-front');
    let cardFlipper = document.querySelectorAll('.js-card-flipper');
    let deck = document.querySelector('.js-deck');
    let autoChooseButton = document.querySelector('.js-auto-choose-button');
    let autoChooseCount = document.querySelector('.js-auto-choose-count');
    let order = 1;
    let leftPositionDeck = 0;
    let leftPositionDeckStep = 0;
    let topPositionDeckStep = 0;
    let renderCard = 0;


    window.addEventListener('load', function () {
        init();
    });

    function init() {
        fillDeck();
        autoChooseCard();
    }

    function autoChooseCard() {
        autoChooseButton.addEventListener('click', () => {
            cards.forEach((item) => {
                let animationTimeout = 0;
                setTimeout(() => {
                    if (CARD_DB.length > 0 && item.dataset.choose === 'false') {
                        chooseCard(item);
                    }
                }, animationTimeout * 500);
                ++animationTimeout;
            });

            deck.scrollIntoView({block: 'start', behavior: "smooth"});
        });
    }

    function cardAnimation(cardItem, id) {
        autoChooseButton.classList.add('disabled');

        cardFlipper && cardFlipper.forEach((flipper) => {
            if (flipper.dataset.id === cardItem.dataset.id) {
                if (flipper.classList.contains('transform')) {
                    flipper.classList.remove('transform');
                } else {
                    flipper.classList.add('transform');
                }
            }
        });

        if (id === 1) {
            deck.dataset.type = 'first';
        } else if (id === 5) {
            deck.dataset.type = 'fifth';
        } else if (id === 9) {
            deck.dataset.type = 'ninth';
        }

        setTimeout(() => {
            if (document.body.clientWidth < 350) {
                leftPositionDeckStep = 73;
            } else if (document.body.clientWidth < 385) {
                leftPositionDeckStep = 82;
            } else if (document.body.clientWidth < 599) {
                leftPositionDeckStep = 90;
            } else {
                leftPositionDeckStep = 140;
            }

            if  (id === 5) {
                leftPositionDeck = 0;
            } else if (id === 9) {
                leftPositionDeck = leftPositionDeckStep;
            }

            if (document.body.clientWidth < 599 && id < 5) {
                topPositionDeckStep = 150;
            } else if (document.body.clientWidth < 599 && id < 9 && id > 4) {
                topPositionDeckStep = 275;
            } else if (document.body.clientWidth < 599 && id > 8) {
                topPositionDeckStep = 400;
            } else {
                if (id < 5) {
                    topPositionDeckStep = 250;
                } else if (id < 9 && id > 4) {
                    topPositionDeckStep = 450;
                } else if (id > 8) {
                    topPositionDeckStep = 650;
                }
            }

            cardItem.classList.add('tarot-ten-card__index-list-item--animation');
            cardItem.style.transform = 'translate(0, ' + topPositionDeckStep + 'px)';
            cardItem.style.top = '10px';
            cardItem.style.left = leftPositionDeck + 'px';
            leftPositionDeck = leftPositionDeck + leftPositionDeckStep;
        }, 1100);

        setTimeout(() => {

            autoChooseButton.classList.remove('disabled');
        }, 3600);

    }

    function chooseCard(card) {
        let chosenCardId = randomInteger(0, CARD_DB.length - 1);
        card.style.zIndex = order;
        card.classList.add('tarot-ten-card__index-list-item--animation-top');
        card.style.top = '-30px';


        cardsFront.forEach((front) => {
            if (front.dataset.id === card.dataset.id) {
                front.dataset.type = CARD_DB[chosenCardId];
                card.dataset.choose = 'true';
            }
        });

        setTimeout(() => {
            card.classList.remove('tarot-ten-card__index-list-item--animation-top');
        }, 500);
        cardAnimation(card, order);


        card.classList.add('disabled');

        CARD_DB.splice(chosenCardId, 1);

        autoChooseCount.innerHTML = parseInt(autoChooseCount.innerHTML) - 1;
        if (order === 10) {
            deck.scrollIntoView({block: 'start', behavior: "smooth"});
            setTimeout(() => {
                location.href = window.urlRedirect;
            }, 5000);
        } else {
            ++order;
        }
    }

    function fillDeck() {
        let leftPosition = 0;
        let leftPositionStep = 0;
        let topPositionStep = 5;
        if (document.body.clientWidth < 350) {
            leftPositionStep = 14;
        } else if (document.body.clientWidth < 385) {
            leftPositionStep = 15;
        } else if (document.body.clientWidth < 440) {
            leftPositionStep = 17;
        } else if (document.body.clientWidth < 599) {
            leftPositionStep = 17;
        } else {
            leftPositionStep = 27;
            topPositionStep = 10;
        }

        cards.forEach((card) => {
            card.style.left = leftPosition + 'px';
            card.style.top = randomInteger(-topPositionStep, topPositionStep) + 'px';
            leftPosition = leftPosition + leftPositionStep;
            renderCard = renderCard + 1;

            if (renderCard === cards.length) {
                cards.forEach((allCard) => {
                    allCard.classList.remove('hide');
                });
            }

            card.addEventListener('click', () => {
                if (CARD_DB.length > 0) {
                    chooseCard(card);
                }
            });
        });
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
});
