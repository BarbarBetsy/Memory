// shuffle the cards by giving each card a random flex-order
function shuffle() {
    for (i = 1; i <= 16; i++) {
        let num = Math.floor(Math.random() * (100 - 1)) + 1;
        document.querySelector('#card' + i).style.order = num;
        console.log('shuffled');
    }
}

// show card
$('.card').click(function() {
$(this).css('background-color', 'blue')
});

// call shuffle function when the page is loaded
window.addEventListener('load', shuffle);
