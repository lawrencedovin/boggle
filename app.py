from flask import Flask, request, render_template, redirect, flash, jsonify
from flask import session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"
app.debug = True
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

# @app.route('/', methods=['GET', 'POST'])
# def show_board():
#     """Show boggle board"""
#     # session['game_board'] = boggle_game.make_board()
#     board = boggle_game.make_board()
#     session['board'] = board
#     highscore = session.get('highscore', 0)
#     nplays = session.get("nplays", 0)

#     return render_template('game.html', board=board, highscore=highscore, nplays=nplays)

@app.route('/', methods=['GET', 'POST'])
def show_board():
    """Show boggle board"""
    # session['game_board'] = boggle_game.make_board()
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    nplays = session.get("nplays", 0)

    return render_template('game.html', board=board, highscore=highscore)


@app.route('/check-guess')
def check_answer():
    guess = request.args['guess']
    board = session["board"]
    check_guess = boggle_game.check_valid_word(board, guess)
    return jsonify({'result': check_guess})

@app.route('/post-score', methods=["POST"])
def post_score():
    """Receive score, update nplays, update high score if appropriate."""

    score = request.json["score"]
    highscore = session.get("highscore", 0)

    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)