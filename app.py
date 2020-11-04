from flask import Flask, request, render_template, redirect, flash, jsonify
from flask import session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "abc123"
app.debug = True
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def show_board():
    """Show boggle board"""
    # boggle_game_board = session['game_board']
    # boggle_game_board.append(boggle_game.make_board())
    # session['game_board'] = boggle_game_board
    session['game_board'] = boggle_game.make_board()

    return render_template('game.html')

@app.route('/test')
def show_test():
    """Show boggle board"""
    return render_template('test.html')

@app.route('/test2')
def show_test2():
    """Show boggle board"""
    return render_template('test2.html')