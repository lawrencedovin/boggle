const $form = $('form');
let $guessButton = $('#guess-button');
let $guessInput = $('#guess-input');

async function checkGuess() {
    let guess = $guessInput.val();
    try {
        const response = await axios.get('/check-guess', { params: { guess: guess }});
        const {data} = response;
        appendResultToView(data.result);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

function appendResultToView(result) {
    const $result = $('#result');
    if(result === 'ok') $result.text('Correct!');
    else if(result === 'not-on-board') $result.text('Not on board');
    else $result.text('Not a word')
}

$form.on('submit', (e) => {
    e.preventDefault();
    if($guessInput.val()) {
        checkGuess();
        $guessInput.val('');
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})