const $form = $('form');
let $guessButton = $('#guess-button');
let $guessInput = $('#guess-input');

async function getAxiosRequest() {
    let idk2 = $guessInput.val();
    try {
        const response = await axios.get('/check-guess', { params: { guess: idk2 }});
        const {data} = response;
        alert(data.result);
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

$form.on('submit', (e) => {
    e.preventDefault();
    let $guessInputValue = $guessInput.val();
    if($guessInputValue) getAxiosRequest();
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})