let counter = 0;
let turnCounter = 0;
let pairCounter = 0;
let cardsTurned = [];
let watch = new Stopwatch();
let timer = document.getElementById("timer");
let starCounter = 5;

// shuffle the cards by giving each card a random flex-order
function shuffle() {
    for (i = 1; i <= 16; i++) {
        let num = Math.floor(Math.random() * (100 - 1)) + 1;
        document.querySelector('#card' + i).style.order = num;
    }
}

// hide cards again
function hideAgain() {
    $('.front').addClass('back turnable');
    $('.back').removeClass('front').addClass('turnable').on('click', showCard);
    counter = 0;
    cardsTurned = [];
}

// show card and lock it down
function showCard() {
    $(this).removeClass('back turnable').addClass('front').off('click');
    if (!watch.isOn) {
        watch.start();
    }

    // count turned cards
    cardsTurned.push($(this).find("img").attr("src"));
    console.log(cardsTurned);
    counter++;

    // make sure only two cards are turned at the same time
    if (counter === 2) {
        $('.turnable').off('click')
        $('.turnable').removeClass('turnable');
        turnCounter++;
        console.log("Turn " + turnCounter);

        // check if cards are the same
        if (cardsTurned[0] === cardsTurned[1]) {
            $('.front').addClass('solved').removeClass('front back turnable').off('click');
            pairCounter++;
            hideAgain();

        } else {
            // turn cards again
            setTimeout(hideAgain, 2000);
        }
    }

    if (turnCounter === 5 && pairCounter < 1) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 7 && pairCounter < 3) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 9 && pairCounter < 5) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 11 && pairCounter < 7) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 17) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    // congrats on the win
    if (pairCounter === 8) {
        console.log('YAY!');
        watch.stop();
    }

}

// stopwatch
function Stopwatch() {

    let time = 0;
    let interval;
    let offset;

    function update() {
        time += delta();
        let formatedTime = timeFormater(time);
        timer.textContent = formatedTime;
    }

    function delta() {
        let now = Date.now();
        let timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormater(timeInMilliseconds) {
        let time = new Date(timeInMilliseconds);
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let milliseconds = time.getMilliseconds();

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if (milliseconds < 100) {
            milliseconds = '0' + milliseconds;
        }

        return minutes + " : " + seconds + " . " + milliseconds;
    }

    this.isOn = false;

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    }

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    }

    this.reset = function () {
        time = 0;
    }
}

// show card when clicked
$('.turnable').on('click', showCard);

// call shuffle function when the page is loaded
window.addEventListener('load', shuffle);