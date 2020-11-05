const $form = $('form');
let $guessInput = $('#guess-input');
const $countdown = $('#countdown');
let currentScore = 0;
let seconds = 5;

async function checkGuess() {
    let guess = $guessInput.val();
    try {
        const response = await axios.get('/check-guess', { params: { guess: guess }});
        const {result} = response.data; //result = response.data
        appendResultsToView(result, guess);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

function appendResultsToView(result, guess) {
    const $result = $('#result');
    const $currentScore = $('#current-score');
    if(result === 'ok'){ 
        $result.text('Correct!'); 
        currentScore += (guess.length * 10);
        $currentScore.text(currentScore)
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

window.onload = function(){
    let countdown = setInterval(function() {
        if(seconds === 0) {
            alert('Times up!');
            $guessInput.prop('disabled', true);
            clearInterval(countdown);
        } 
        $countdown.text(seconds)
        seconds--;
    }, 1000);
};


