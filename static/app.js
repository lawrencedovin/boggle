const $form = $('form');
let $guessButton = $('#guess-button');
let $guessInput = $('#guess-input');

async function getAxiosRequest() {
    let guess = $guessInput.val();
    try {
        const response = await axios.get('/check-guess', { params: { guess: guess }});
        const {data} = response;
        console.log(data.result);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

$form.on('submit', (e) => {
    e.preventDefault();
    if($guessInput.val()) {
        getAxiosRequest();
        $guessInput.val('');
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})