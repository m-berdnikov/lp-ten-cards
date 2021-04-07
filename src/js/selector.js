document.addEventListener('DOMContentLoaded', function () {

    const CARD_DB = [
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

    let deck = document.querySelector('.js-deck');
    let remainingCards = document.querySelector('.js-remaining-cards');
    let currentCardDB = [];
    let cookieCardArray = '';
    let state = 0;
    let finalState = 0;
    let rotateAngle = 0;
    let rotateLineAngle = 0;
    let timeOut = 500;
    let renderCard = 0;

    if (window.type === 'subconscious') {
        finalState = 4;
    } else {
        finalState = 3;
    }

    if (window.type === 'strengths') {
        Cookies.remove('tenTarotCards');
        cookieCardArray = [];
        currentCardDB = CARD_DB.slice();
    } else {
        cookieCardArray = Cookies.get('tenTarotCards');
        cookieCardArray = cookieCardArray.split('&');
        removeCards();
    }

    if (window.type === 'circle') {
        currentCardDB = cookieCardArray;
        window.addEventListener('load', function () {
            fillSelectorDeck();
            replaceCircleDeck();
            setTimeout(() => {
                location.href = window.urlRedirect;
            }, 9000);
        });
    } else if (window.type === 'final') {
        window.addEventListener('load', function () {
            showFinalDeck();
        });
    } else if (window.type !== 'final') {
        if (window.type !== 'subconscious') {
            remainingCards.innerHTML = finalState;
        }
        fillSelectorDeck();
        hideCard();
    }

    function showFinalDeck() {
        let cookiesArray = Cookies.get('tenTarotCards').split('&');
        let finalTarotList = document.querySelectorAll('.js-fnal-tarot-list');
        console.log(cookiesArray);

        cookiesArray.forEach((item, index) => {
            let finalCardItem = document.createElement('div');
            finalCardItem.setAttribute('class', 'tarot-ten-card__selector-list-item tarot-ten-card__card');
            finalCardItem.dataset.type = item;
            finalTarotList.forEach((finalDeckItem) => {
                if (finalDeckItem.dataset.type === 'strengths' && index < 3) {
                    finalDeckItem.appendChild(finalCardItem);
                } else if (finalDeckItem.dataset.type === 'challenges' && index >= 3 && index < 6) {
                    finalDeckItem.appendChild(finalCardItem);
                } else if (finalDeckItem.dataset.type === 'subconscious' && index >= 6 && index < 10) {
                    finalDeckItem.appendChild(finalCardItem);
                }
            });
            setTimeout(() => {
                location.href = window.urlRedirect;
            }, 3000);
        });
    }

    function lineAnimation() {
        let lines = document.querySelectorAll('.js-line');
        lines.forEach((line) => {
            line.style.transform = 'rotate(' + rotateLineAngle + 'deg)';
            rotateLineAngle = rotateLineAngle + 72;
            setTimeout(() => {
                line.classList.remove('tarot-ten-card__selector-list-hidden');
            }, timeOut);
            timeOut = timeOut + 500;
        });
    }

    function addLines() {
        for (let i = 1; i <= 5; i++) {
            let line = document.createElement('div');
            line.setAttribute('class', 'tarot-ten-card__selector-list-line tarot-ten-card__selector-list-hidden js-line');
            deck.appendChild(line);
        }
        lineAnimation();
    }

    function replaceCircleDeck() {
        deck.dataset.state = 'circle';
        let cards = document.querySelectorAll('.js-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('tarot-ten-card__selector-list-hidden');
            }, timeOut);
            timeOut = timeOut + 500;
            card.dataset.id = index;
            card.dataset.state = 'circle';
            card.style.position = 'absolute';
            card.style.zIndex = rotateAngle;
            card.style.transform = 'rotate(' + rotateAngle + 'deg)';
            rotateAngle = rotateAngle + 36;
            renderCard = renderCard + 1;
            if (renderCard === cards.length) {
                addLines();

            }
        });
    }

    function hideCard() {
        let cards = document.querySelectorAll('.js-card');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.add('tarot-ten-card__selector-list-hidden');
                cookieCardArray.push(card.dataset.type);
                Cookies.set('tenTarotCards', cookieCardArray.join('&'), {expires: 2});
                ++state;

                if (window.type !== 'subconscious') {
                    remainingCards.innerHTML = finalState - state;
                }
                if (state === finalState) {
                    cards.forEach((item) => {
                        item.classList.add('disabled');
                    });
                    setTimeout(() => {
                        location.href = window.urlRedirect;
                    }, 1000);
                }
            });
        });
    }

    function fillSelectorDeck() {
        deck.innerHTML = '';
        currentCardDB.forEach((card) => {
            let newCard = document.createElement('div');
            if (window.type === 'circle') {
                newCard.setAttribute('class', 'tarot-ten-card__selector-list-item tarot-ten-card__card tarot-ten-card__selector-list-hidden js-card');
            } else {
                newCard.setAttribute('class', 'tarot-ten-card__selector-list-item tarot-ten-card__card js-card');
            }
            newCard.setAttribute('data-type', card);
            deck.appendChild(newCard);
        });
    }

    function removeCards() {
        currentCardDB = CARD_DB.slice();
        for (let i = 0; i < cookieCardArray.length; i++) {
            currentCardDB.splice(currentCardDB.indexOf(cookieCardArray[i]), 1);
        }
    }

    function sendGtag(action, category, label) {
        gtag && gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
});
