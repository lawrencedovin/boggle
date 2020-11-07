const $form = $('form');
const $guessInput = $('#guess-input');
const $guessButton = $('#guess-button');
const $countdown = $('#countdown');
const $currentScore = $('#current-score');
const $highScore = $('#high-score');
const $msg = $('#msg');
let currentScore = 0;
let seconds = 60;

async function checkGuess() {
    let guess = $guessInput.val();
    try {
        const response = await axios.get('/check-guess', { params: { guess: guess }});
        const {result} = response.data; 
        appendResultsToView(result, guess);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

function appendResultsToView(result, guess) {
    const $result = $('#result');
    if(result === 'ok'){ 
        $result.text('Correct!'); 
        currentScore += (guess.length * 10);
        $currentScore.text(`Score: ${currentScore}`)
    }
    else if(result === 'not-on-board') $result.text('Not on board');
    else $result.text('Not a word');
}

$form.on('submit', (e) => {
    e.preventDefault();
    if($guessInput.val()) {
        checkGuess();
        $guessInput.val('');
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})

async function scoreGame() {
    const resp = await axios.post('/post-score', { score: currentScore });
    if (resp.data.brokeRecord) {
      $msg.text(`New record: ${currentScore}`);
    } else {
      $msg.text(`Final score: ${currentScore}`);
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
        $countdown.text(seconds)
        seconds--;
    }, 1000);
}

$( document ).ready(countdown);





