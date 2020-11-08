const $form = $('form');
const $guessInput = $('#guess__input');
const $guessButton = $('#guess__button');
const $countdown = $('#countdown__text');
const $currentScore = $('#current-score');
const $highScore = $('#high-score');
const $result = $('#result');
const $correctWords = $('#correct-words');
let currentScore = 0;
let seconds = 60;
let words = [];

async function checkGuess() {
    let guess = $guessInput.val().toLowerCase();
    try {
        const response = await axios.get('/check-guess', { params: { guess: guess }});
        const {result} = response.data; 
        appendResultsToView(result, guess);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

function appendResultsToView(result, guess) {
    if(result === 'ok'){ 
        if(jQuery.inArray(guess, words) != -1) $result.text('You already guessed that word.');
        else {
            $result.text('Correct!'); 
            currentScore += (guess.length * 10);
            $currentScore.text(`Score: ${currentScore}`);
            words.push(guess.toUpperCase());
            $correctWords.text(`Correct words: ${words}`);
        }       
    }
    else if(result === 'not-on-board') $result.text('Not on board');
    else $result.text('Not a word');
}

$form.on('submit', (e) => {
    e.preventDefault();
    if($guessInput.val().toLowerCase()) {
        checkGuess();
        $guessInput.val('');
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})

async function scoreGame() {
    const resp = await axios.post('/post-score', { score: currentScore });
    if (resp.data.brokeRecord){
        $result.text(`Great Job! New High Score: ${currentScore}`);
        $highScore.text(`High Score: ${currentScore}`);
    } 
  }

function countdown() {
    let countdown = setInterval(async function() {
        if(seconds === 0) {
            // Clears input and disables input value and submit button
            $guessInput.val('');
            $guessInput.prop('disabled', true);
            $guessButton.prop('disabled', true);
            clearInterval(countdown);
            await scoreGame();
        } 
        $countdown.text(`${seconds}`)
        seconds--;
    }, 1000);
}

$( document ).ready(countdown);





