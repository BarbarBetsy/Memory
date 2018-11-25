// shuffle the cards by giving each card a random flex-order
function shuffle() {
    for (i = 1; i <= 16; i++) {
        let num = Math.floor(Math.random() * (100 - 1)) + 1;
        document.querySelector('#card' + i).style.order = num;
    }
}

function hideAgain() {
$('.card').find('img').css('opacity', '0');
}

let counter = 0;

// show card
$('.card').click(function () {
    $(this).find('img').css('opacity', '1');
    counter++;


    if (counter === 2) {
        counter = 0;
        setTimeout(hideAgain, 2000);
    }
});

// call shuffle function when the page is loaded
window.addEventListener('load', shuffle);
