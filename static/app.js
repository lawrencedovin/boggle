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
    // try {
    //     const url = 'http://127.0.0.1:5000/check-answer';
    //     const res = await getAxiosRequest.get(url, {
            
    //     });
    // } catch (e) {
    //     alert(`Error: ${e}`);
    // }
    const response = axios.get('http://127.0.0.1:5000/check-answer');
    const {data} = response;
    // for(let i = 0; i < data.length; i++) {
    //     console.log(data[i]);
    // }
    console.log(response)
}

getAxiosRequest();