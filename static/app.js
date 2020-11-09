const $guessInput = $('#guess__input');
const $guessButton = $('#guess__button');
const $resetButton = $('#reset__button');
const $countdown = $('#countdown__text');
const $currentScore = $('#current-score');
const $highScore = $('#high-score');
const $result = $('#result');
const $correctWords = $('#correct-words');

class Boggle {
    constructor(seconds = 60) {
        this.seconds = seconds;
        this.currentScore = 0;
        this.words = [];
        this.colors = ["#00ADD2", "#00FF0A"];

        this.countdown = setInterval(this.tick.bind(this), 1000);
        $(".guess").on("submit", this.FormSubmit.bind(this));
        this.resetButtonClick();
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

  async tick() {
    if (this.seconds === 0) {
      $guessInput.val('');
      $guessInput.prop('disabled', true);
      $guessButton.prop('disabled', true);
      clearInterval(this.countdown);
      await this.scoreGame();
    }
    $($countdown).text(this.seconds);
    this.seconds--;
  }

  async scoreGame() {
    const response = await axios.post('/post-score', { score: this.currentScore });
    if (response.data.brokeRecord) {
        $('.result').removeClass('incorrect');
        $('.result').addClass('broke-record');
        this.changeHighScoreColor(this.colors, 0);
        new Audio('static/highscore.mp3').play();
        $result.text(`👾 New High Score: ${this.currentScore} 👾`);
        $highScore.text(`High Score: ${this.currentScore}`);
    } 
  }

    changeHighScoreColor(colors, i) {
        setInterval(() => {
          $($result).css('color', colors[i]);
          i++;
          i %= colors.length;
        }, 250);
    }
    
    resetGame() {
        location.reload();
    }

    resetButtonClick() {
        $resetButton.on('click', this.resetGame);
    }
    
}

new Boggle();