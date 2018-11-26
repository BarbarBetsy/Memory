let counter = 0;
let turnCounter = 0;
let pairCounter = 0;
let cardsTurned = [];

// shuffle the cards by giving each card a random flex-order
function shuffle() {
    for (i = 1; i <= 16; i++) {
        let num = Math.floor(Math.random() * (100 - 1)) + 1;
        document.querySelector('#card' + i).style.order = num;
    }
};

// hide cards again
function hideAgain() {
    $('.front').addClass('back turnable');
    $('.back').removeClass('front').addClass('turnable').on('click', showCard);
    counter = 0;
    cardsTurned = [];
};

// show card and lock it down
function showCard() {
    $(this).removeClass('back').addClass('front').off('click');

    // count turned cards
    cardsTurned.push($(this).find("img").attr("src"));
    console.log(cardsTurned);
    counter++;

    // make sure only two cards are turned at the same time
    if (counter === 2) {
        $('.turnable').off('click')
        $('.turnable').removeClass('turnable');
        turnCounter++;

        // check if cards are the same
        if (cardsTurned[0] === cardsTurned[1]) {
            $('.front').addClass('solved').removeClass('front back turnable').off('click');
            pairCounter++;
            hideAgain();

        } else {
            // turn cards again
            setTimeout(hideAgain, 2000);
        }
    };

    if (pairCounter === 8) {
        console.log('YAY!');
    }
}

// show card
$('.turnable').on('click', showCard);

// call shuffle function when the page is loaded
window.addEventListener('load', shuffle);
