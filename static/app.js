const $form = $('form');
const $guessInput = $('#guess__input');
const $guessButton = $('#guess__button');
const $countdown = $('#countdown__text');
const $currentScore = $('#current-score');
const $highScore = $('#high-score');
const $result = $('#result');
const $correctWords = $('#correct-words');
// let currentScore = 0;
// let seconds = 30;
// let words = [];
// const colors = ["#00ADD2", "#00FF0A"];

class Boggle {
    constructor(seconds = 30) {
        this.seconds = seconds;
        this.currentScore = 0;
        this.words = [];
        this.colors = ["#00ADD2", "#00FF0A"];
        // this.countdown();
        $(document).ready(this.countdown);
        $(".guess").on("submit", this.FormSubmit.bind(this));
    }

    async FormSubmit(e){
        e.preventDefault();
        if($guessInput.val().toLowerCase()) {
            this.checkGuess();
            $guessInput.val('');
        }
        else alert("🤠 Yeehaw, we decent folks don't like your no value round here.");
    }

    async checkGuess() {
        let guess = $guessInput.val().toLowerCase();
        try {
            const response = await axios.get('/check-guess', { params: { guess: guess }});
            const {result} = response.data; 
            this.appendResultsToView(result, guess);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    }

    appendResultsToView(result, guess) {
        $('.result').css('display', 'inline-block');
        if(result === 'ok'){ 
            if(jQuery.inArray(guess.toUpperCase(), this.words) != -1){
                $result.text('You already guessed that word.');
                $('.result').addClass('incorrect');
            }
            else {
                $result.text('Correct!'); 
                this.currentScore += (guess.length * 10);
                $currentScore.text(`Score: ${this.currentScore}`);
                this.words.push(guess.toUpperCase());
                $correctWords.text(`Correct words: ${this.words}`);
                $('.result').removeClass('incorrect'); 
            }      
        }
        else {
            if(result === 'not-on-board') $result.text('Not on board');
            else $result.text('Not a word');
            $('.result').addClass('incorrect');
        }
    }

    async scoreGame() {
        const resp = await axios.post('/post-score', { score: this.currentScore });
        if (resp.data.brokeRecord){
            $('.result').removeClass('incorrect');
            $('.result').addClass('broke-record');
            this.changeColor(this.colors, 0);
            $result.text(`👾 New High Score: ${this.currentScore} 👾`);
            $highScore.text(`High Score: ${this.currentScore}`);
        } 
    }

    async countdown() {
        let countdown = setInterval(async function() {
            if(this.seconds === 0) {
                // Clears input and disables input value and submit button
                $guessInput.val('');
                $guessInput.prop('disabled', true);
                $guessButton.prop('disabled', true);
                clearInterval(countdown);
                await this.scoreGame();
            } 
            $countdown.text(`${this.seconds}`)
            this.seconds--;
        }, 1000);
    }

    changeColor(colors, i) {
        setInterval(() => {
          $($result).css('color', colors[i]);
          i++;
          i %= colors.length;
        }, 250);
    }
    
}

new Boggle();













