import React, {Component} from 'react';
import classes from '../GameInterface/GameInterface.module.css';

class GameInterface extends Component {

    
    render() {
        let player = null;
        let dealer = null;
        let hud = null;
        let isSoft = null;

        if ((this.props.gameState === "handOver") || (this.props.gameState === "playerTurn")) {
            player = (
                <h3>Player Has: {this.props.playerScore[(this.props.currentHand-1)].score} </h3>
            )
            dealer = (
                <h3>Dealer Has: {this.props.dealerScore} </h3>
            )
            hud = (
                <div>
                    <h3>Stack: {this.props.playerStack}</h3>
                    <h3>Bet: {(this.props.playerBet)}</h3>
                </div>
            )
        }
        let double = null;
        if (this.props.player[this.props.currentHand -1 ] !== undefined) {
            console.log(this.props.player[this.props.currentHand - 1].length)   
            if (this.props.player[(this.props.currentHand-1)].length === 2) {
            double = (
                <button onClick = {this.props.doubleDown}>Double Down</button>
            )
            if ( (this.props.player[(this.props.currentHand-1)][0].number === "A") || (this.props.player[(this.props.currentHand-1)][1].number === "A")){
                isSoft = (
                    <p>Player Soft {this.props.playerScore[this.props.currentHand - 1].score}</p>
                )
            } else {
                isSoft = (
                    <p> Player {this.props.playerScore[this.props.currentHand - 1].score} </p>
                )
            }
        } else {
            isSoft = (
                <p> Player {this.props.playerScore[this.props.currentHand - 1].score} </p>
            )
        }
        }
        // if (this.props.player[this.props.currentHand].length === 2) {
        //     double = (
        //         <button onClick = {this.props.double}>Double Down</button>
        //     )
        // }

        let gameState = null;
        if (this.props.gameState === "start") {
            gameState = (
                <div>
                    <button onClick = {this.props.dealGame}>Deal Game</button>
                    
                </div>
            )
        }
        else if (this.props.gameState === "getBuyIn") {
            gameState = (
                <div>  
                    <h3>How much will you buy in for?</h3>
                    <input type="text" value={this.props.playerStack} onChange={this.props.getBet}/>
                    <input type="submit" onClick={this.props.submitBet}/>
                </div>
            )
        }
        else if (this.props.gameState === "getBet") {
            gameState = (
                <div>
                    <h3>What is your bet?</h3>
                    <input type="text" value={this.props.playerBet} onChange={this.props.getBet}/>
                    <input type="submit" onClick={this.props.submitBet}/>
                </div>
            )
        }
        else if (this.props.gameState === "playerTurn") {
            if (this.props.splittable) {
            gameState = (
                <div>
                    <button onClick = {this.props.book}>Check Book</button>
                    <button onClick = {this.props.hit}>Hit</button>
                    <button onClick = {this.props.stand}>Stand</button>
                    <button onClick = {this.props.split}>Split</button>
                    {double}
                </div>
            )
            } else if ((this.props.numPlayerHands > 1) && (this.props.currentHand !== this.props.numPlayerHands)) {
                gameState = (
                <div>
                    <button onClick = {this.props.book}>Check Book</button>
                    <button onClick = {this.props.hit}>Hit</button>
                    <button onClick = {this.props.finishCurrentHand}>Stand</button>
                    {double}
                </div>
                )
            } else {
                gameState = (
                    <div>
                        <button onClick = {this.props.book}>Check Book</button>
                        <button onClick = {this.props.hit}>Hit</button>
                        <button onClick = {this.props.stand}>Stand</button>
                        {double}
                    </div>
                    )
            }
        }
        else if (this.props.gameState === "handOver") {
            if (this.props.playerStack < this.props.playerBet) {
                gameState = (
                    <div>
                        <button onClick = {this.props.reset}>Reset</button>
                    </div>
                )
            } else {
            gameState = (
                <div>
                    <button onClick = {this.props.dealGame}>Deal Game</button>
                    <button onClick = {this.props.reset}>Reset</button>
                </div>
            )
            
        }
    }
        else if (this.props.gameState === "checkBook") {
            gameState = (
                <div>
                    <h4> {isSoft} vs. </h4>
                    <h4> Dealer {this.props.dealerScore}</h4>
                    <h1>{this.props.recommendedAction}</h1>
                    <button onClick = {this.props.closeBook}>Return</button>
                </div>
            )
        }

        return (
            <div className = {classes.gameInterface}>
               
                <div className = {classes.hud}>
                    {player}
                    {hud}
                    {dealer}
                </div>
                {gameState}
                {/* <button onClick = {this.props.dealGame}>Deal Game</button>
                <button onClick = {this.props.shuffle}>Shuffle</button>
                <button onClick = {this.props.shuffleTwo}>ShuffleFunc</button>
                <button onClick = {this.props.reset}>Reset</button>
                <button onClick = {this.props.stand}>Stand</button> */}
            </div> 
        )
    }
}

export default GameInterface;