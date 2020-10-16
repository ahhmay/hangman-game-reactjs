import React, {Component} from 'react';
import './Hangman.css';
import {randomWord} from './Words';
import step1 from './hangman_images/image1.jpg';
import step2 from './hangman_images/image2.jpg';
import step3 from './hangman_images/image3.jpg';
import step4 from './hangman_images/image4.jpg';
import step5 from './hangman_images/image5.jpg';
import step6 from './hangman_images/image6.jpg';
import step7 from './hangman_images/image7.jpg';

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [step1, step2, step3, step4, step5, step6, step7]
    }

    constructor(props) {
        super(props);
        this.state = {
          mistake: 0,
          guessed: new Set([]),
          answer: randomWord()
        }
      }

      handleGuess = e => {
        let letter = e.target.value;
        this.setState(st => ({
          guessed: st.guessed.add(letter),
          mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
        }));
      }
    
      guessedWord() {
        return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " ___ "));
      }
    
      generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
          <button
            className="ui inverted button"
            key={letter}
            value={letter}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ));
      }
    
      resetButton = () => {
        this.setState({
          mistake: 0,
          guessed: new Set([]),
          answer: randomWord()
        });
      }


    render(){
        const gameOver = this.state.mistake >= this.props.maxWrong;
        let gameStat = this.generateButtons();
        const isWinner = this.guessedWord().join("") === this.state.answer;

        if(isWinner) {
            gameStat = 'YOU WON :)';
        }
        if(gameOver){
            gameStat= 'YOU LOST :(';
        }

        return(
            <div className="Hangman container">
                <h1 className="app_name">HANG<p className="of_color">-</p><p className="allowed_wrong_guess">MAN</p></h1>
                <div className="wrong_guess">
                    WRONG GUESSES: 
                    <div>
                        <h1 className="current_wrong_guess">{this.state.mistake}</h1>
                        <h2 className="of_color">                                    /                      </h2>
                        <h1 className="allowed_wrong_guess">{this.props.maxWrong}</h1>
                    </div>
                </div>
                <div className="image_source">
                    <img src={this.props.images[this.state.mistake]} alt=""/>
                </div>
                <div className="guess_language">
                    <div><p className="current_wrong_guess">GUESS</p> <p className="of_color">THE PROGRAMMING</p> <p className="allowed_wrong_guess">LANGUAGE</p></div>
                    <p>
                        {!gameOver ? this.guessedWord() : this.state.answer }
                    </p>
                    <p className="of_color">{gameStat}</p><br/><br/>
                    <button className="ui red button" onClick={this.resetButton}>RESET</button>
                </div>
            </div>
        )
    }
}
export default Hangman;