'use strict';

document.addEventListener('DOMContentLoaded', function () {

    let cookieCardArray = Cookies.get('tenTarotCards');
    let firstCookieArray = '';
    let secondCookieArray = '';
    let thirdCookieArray = '';
    let predictionBlock = document.querySelector('.js-prediction-block');

    const predictions = [
        {
            title: "Strengths",
            text: [
                "If you are single, you need to spend more time developing your own sense of self before you can fully commit to a romantic partnership. Take the time to work on your self-love and determine clearly what your needs and expectations are.",
                "Your current relationship is about to go through a major change and maybe even an ending. If you are being honest with yourself you probably already know that your relationship isn’t balanced or fulfilling. Why are you remaining attached to something that isn’t flourishing? Be willing to release codependent tendencies and have the courage to walk away from unhealthy dynamics. The change will open the door to true happiness. If you have been single for a long time, you may be finding that coming to an end.",
                "Things are on hold in your career right now, but that’s okay! Don’t try to force forward motion or action. Take the time to observe the situation and try to see it from different perspectives. There might be unexpected benefits from this pause that you don’t realize yet. Allow yourself to surrender to the universe and all will unfold as it should"
            ]
        },
        {
            title: 'Challenges',
            text: [
                "You’re the life of the party right now and people are clamoring to hang out with you. Your optimism and positive energy are infectious. You’ve become the leader of the pack and your friends are enjoying basking in your warm glow! Go ahead and share the positive vibes!",
                "It’s all about matters of the heart right now, whether physical or emotional. Remember, you that you have a support system around you and that you are on your way to healing emotional or physical trauma. This card often makes an appearance after a painful loss, but is a good sign that you are on your way to healing your wounds.",
                "You may be feeling like you’re finally gaining a sense of control over your place in your relationship. This card in reverse indicates walking away from unhealthy love relationships. It’s a breaking away from the chains and opting for healthy self-reliance."
            ]
        },
        {
            title: 'Subconscious',
            text: [
                "Are you swept off of your feet by something? Are you ignoring the signs? Do you have that little voice in the back of your mind telling you to be careful of something, but you don’t want to listen because you are caught up in the moment? The Star in the future is warning you that if you allow yourself to get caught up in dreamland, you might be in for despair and hopelessness in the future, when things turn out differently than they seemed they would.",
                "Justice is bringing balance to your love life! If you’ve been creating good karma through honest and fair actions, then you will be attracting the same to you. Your love relationships will be like your mirror. If you are single, it’s likely that a new relationship is coming your way. If you’re already in a committed relationship, balance is about to be restored.",
                "It’s all about matters of the heart right now, whether physical or emotional. This cards reminds you that you have a support system around you and that you are on your way to healing emotional or physical trauma. This Major Arcana card often makes an appearance after a painful loss, but is a good sign that you are on your way to healing your wounds.",
                "Be patient as you pursue your career goals! You will be successful, but allow things to take their time. This cards is commending you for keeping your cool in challenging situations because this will be remembered by your co-workers. Good things come to those who wait, and that along with consistent effort, this will be the key to your success."
            ]
        }

    ];

    cookieCardArray && organizeCookie();
    predictionBlock && placePredictio();

    function placePredictio() {
        predictions.forEach((item, index) => {
            placeText(item.title, 'tarot-ten-card__prediction-type tarot-ten-card__desc');

            switch (index) {
                case 0:
                    placeCard(firstCookieArray);
                    break;
                case 1:
                    placeCard(secondCookieArray);
                    break;
                case 2:
                    placeCard(thirdCookieArray);
                    break;
            }

            item.text.forEach((desc) => {
                placeText(desc, 'tarot-ten-card__prediction-text');
            });
        });
    }

    function placeText(element, elementClass) {
        let block = document.createElement('div');
        block.setAttribute('class', elementClass);
        block.innerHTML = element;
        predictionBlock.appendChild(block);
    }

    function placeCard(array) {
        let deck = document.createElement('div');
        deck.setAttribute('class', 'tarot-ten-card__prediction-list tarot-ten-card__list');
        array.forEach((item) => {
            let card = document.createElement('div');
            card.setAttribute('class', 'tarot-ten-card__prediction-list-item tarot-ten-card__card');
            card.dataset.type = item;
            deck.appendChild(card);
        });
        predictionBlock.appendChild(deck);
    }

    function organizeCookie() {
        cookieCardArray = cookieCardArray.split('&');
        firstCookieArray = cookieCardArray.slice(0, 3);
        secondCookieArray = cookieCardArray.slice(3, 6);
        thirdCookieArray = cookieCardArray.slice(6, 10);
    }
});
