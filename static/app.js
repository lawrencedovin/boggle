const $form = $('form');
let $guessButton = $('#guess-button');
let $guessInput = $('#guess-input');

$form.on('submit', (e) => {
    e.preventDefault();
    let $guessInputValue = $guessInput.val();

    if($guessInputValue){
        alert($guessInputValue);
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})

async function getAxiosRequest() {
    try {
        const response = await axios.get('/check-answer');
        const {data} = response;
        console.log(data)
    } catch (e) {
        alert(`Error: ${e}`);
    }
}

getAxiosRequest();