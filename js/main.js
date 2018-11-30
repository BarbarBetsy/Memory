let counter = 0;
let turnCounter = 0;
let pairCounter = 0;
let cardsTurned = [];
let watch = new Stopwatch();
let timer = document.getElementById("timer");
let starCounter = 5;
let fast = 0;

// shuffle the cards by giving each card a random flex-order
function shuffle() {
    for (i = 1; i <= 16; i++) {
        let num = Math.floor(Math.random() * (100 - 1)) + 1;
        document.querySelector('#card' + i).style.order = num;
    }
}

// hide unsolved cards again
function hideAgain() {
    $('.front').addClass('back turnable');
    $('.back').removeClass('front').addClass('turnable').on('click', showCard);
    counter = 0;
    cardsTurned = [];
}

// hide every card (needed for reset)
function hideAll() {
    $('.solved').on('click', showCard);
    $('.card').addClass('back turnable').removeClass('front solved');
}

// reset everything
function reset() {
    watch.stop();
    watch.reset();
    hideAll();
    shuffle();
    $('.fa-star').addClass('on');
    document.getElementById('turn-counter').textContent = 0;
    timer.textContent = '00 : 00 . 000';
    counter = 0;
    turnCounter = 0;
    pairCounter = 0;
    cardsTurned.length = 0;
    starCounter = 5;
    fast = 0;
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
        document.getElementById('turn-counter').textContent = turnCounter;

        // check if cards are the same - leave open when solved - turn around if not
        if (cardsTurned[0] === cardsTurned[1]) {
            $('.front').addClass('solved').removeClass('front back turnable').off('click');
            pairCounter++;
            hideAgain();

        } else {
            // turn cards again
            setTimeout(hideAgain, 2000);
        }
    }

    // turn off the stars
    if (turnCounter === 4 && pairCounter < 1) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 8 && pairCounter < 3) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 11 && pairCounter < 5) {
        starCounter = starCounter - 1;
        let star = $('.on');
        star.first().removeClass('on');
    }

    if (turnCounter === 13 && pairCounter < 7) {
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
        watch.howFast();
        watch.stop();
        let score = (starCounter * 10000) + fast;
        let winAlert = document.getElementById('win-text');
        winAlert.textContent = "YAY! You win with a score of " + score + "!";
        reset();
    }
}

// stopwatch
function Stopwatch() {

    let time = 0;
    let interval;
    let offset;

    // update 'now-time'
    function update() {
        time += timePassing();
        let formatedTime = timeFormater(time);
        timer.textContent = formatedTime;
    }

    // calculate passed time
    function timePassing() {
        let now = Date.now();
        let timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    // format time
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

    // start timer
    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    }

    // end timer
    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    }

    // reset timer
    this.reset = function () {
        time = 0;
    }

    // calculate ho many seconds to 1.5 minutes (needed for the score)
    this.howFast = function () {
        fast = (90000 - time);
        return fast;
    }
}

// show card when clicked
$('.turnable').on('click', showCard);

// reset everything when reset-button is clicked
$('#reset').on('click', reset);

// call shuffle function when the page is loaded
window.addEventListener('load', shuffle);