const $form = $('form');
let $guessButton = $('#guess-button');
let $guessInput = $('#guess-input');


// $guessButton.on('click', () => {
//     let $guessInputValue = $guessInput.val();
//     alert($guessInputValue);
// })

$form.on('submit', (e) => {
    e.preventDefault();
    let $guessInputValue = $guessInput.val();

    if($guessInputValue){
        alert($guessInputValue);
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
})



form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const newTask = document.createElement("li");
    const deleteIcon = document.createElement("i");
    const taskContent = document.createElement("p");
  
    taskContent.innerText = taskInput.value;
    deleteIcon.classList.add("fas", "fa-times", "remove-button");
    if($guessInput.val()){
        alert
    }
    else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
    
    taskInput.value = '';
  });
