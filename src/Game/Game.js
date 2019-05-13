import React, { Component } from 'react';
import Hand from './Hand/Hand';
import GameInterface from './GameInterface/GameInterface';
import classes from '../Game/Game.module.css';
import * as utils from '../Game/Book/Book.js';



class Game extends Component {
    state = {
            player: [],
            dealer: [],
            playerScore: [],
            dealerScore: 0,
            deck: [
              
            ],
            numDecks: 6,
            playerStack: 0,
            playerBet: 0,
            gameStatus: "",
            gameState: "getBuyIn",
            splittable: false,
            currentPlayerHand: 0,
            error: null, 
            recommendedAction: ""
      
          }

    

    // dealHand() {
        
        // let randCard = Math.floor(Math.random()*52);
        // console.log(randCard);
        // console.log(this.state.cardsDealt.includes(randCard));
        
        
    // }

    book = () => {
      
     let suggested = utils.check(this.state.player[this.state.currentPlayerHand], this.state.dealerScore, 
      this.getScore(this.state.player[this.state.currentPlayerHand]), this.state.splittable)

      this.setState({
        gameState: "checkBook",
        recommendedAction: suggested
      })
      
    }

    closeBook = () => {
      this.setState({
        gameState: "playerTurn"
      })
    }


    generateDeck = () => {
      const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
      const suits = ['♦','♣','♥','♠'];
      let deck = [];
      for (let i = 0; i < this.state.numDecks; i++){
        for (let j = 0; j < cards.length; j++) {
          for (let k = 0; k < suits.length; k++) {
            deck.push({number: cards[j], suit: suits[k]});
          }
        }
      }
      // this.setState({deck: deck})
      return deck;
    }

    reset = () => {
      let deck = this.generateDeck();
      
      this.setState(
        {
        currentPlayerHand: 0,
        splittable: false,
        player: [],
        dealer: [],
        playerScore: [],
        dealerScore: 0,
        deck: deck,
        gameStatus: "",
        gameState: "getBuyIn",
        numDecks: 6
  
      })

    }

    doubleDown = () => {
        let deck = this.shuffle()
        let hand = [...this.state.player];
        let currentHandIndex = this.state.currentPlayerHand;
        let playerScores = [...this.state.playerScore]
        let playerStack = this.state.playerStack

        let betsOut = 0;

        for (let i = 0; i < playerScores.length; i++) {
          betsOut+= playerScores[i].bet;
        }
        let doubleable = ((this.state.playerStack - (betsOut + this.state.playerBet) ) > 0)
        
        if(doubleable) {

      
        let moreThanOneHand = 0;
        

        hand[currentHandIndex].push(deck.pop());

        let playerScore = this.getScore(hand[currentHandIndex])
        playerScores[currentHandIndex] = ({score: playerScore, bet: (this.state.playerBet * 2)});

        if ((hand.length === 1) || (this.state.player.length === (currentHandIndex + 1) )) {
          let dealerHand = this.getDealerHand()
          let dealerScore = this.getScore(dealerHand);
          let outcome = this.evaluateOutcomes(dealerScore, playerScores)

          this.setState({
            gameState: "handOver",
            dealer: dealerHand,
            dealerScore: dealerScore,
            playerStack: (playerStack + outcome),
            currentHandIndex: 0
          })
          
        } else {
          moreThanOneHand = 1
        }

        this.setState ({
          deck: deck,
          player: hand,
          playerScore: playerScores,
          currentPlayerHand: (currentHandIndex + moreThanOneHand)
        })
        
        
      }
    }


    getCard = () => {
        let deck = this.shuffle()
        const hand = [...this.state.player];
        let currentHandIndex = this.state.currentPlayerHand;
        let playerStack = this.state.playerStack;
        let playerBet = this.state.playerBet
        let allPlayerScores = [...this.state.playerScore]

        
      
        hand[currentHandIndex].push(deck.pop());  

        let playerScore = this.getScore(hand[currentHandIndex])
        allPlayerScores[currentHandIndex] = {score: playerScore, bet: this.state.playerBet}

        this.setState( {
            deck: deck,
            player: hand,
            playerScore: allPlayerScores,
            splittable: false
        }

        )
        
        
        if ((playerScore > 21) && (this.state.player.length > 1) && (this.state.player.length !== (currentHandIndex + 1))) {
          this.setState({
            // playerStack: (playerStack - playerBet),
            currentPlayerHand: (currentHandIndex + 1)
          })
        } else if ((playerScore > 21) && (this.state.player.length === (currentHandIndex + 1))){
          let dealerHand = this.getDealerHand()
          let dealerScore = this.getScore(dealerHand)
          let outcome = this.evaluateOutcomes(dealerScore, allPlayerScores)

          this.setState({
            dealer: dealerHand,
            dealerScore: dealerScore,
            gameState: "handOver",
            gameStatus: "playerBusted",
            playerStack: (playerStack + outcome),
            currentPlayerHand: 0
          })
        }

        
    }

    evaluateOutcomes = (dealerScore, playerScores) => {
      let dealerHand = [...this.state.dealer];
      let dealerBlackJack = ((dealerHand.length === 2) && (dealerScore === 21))
      // let playerScores = [...this.state.playerScore]
      let outcome = 0
      
      for (let i = 0; i < playerScores.length; i ++) {
        if (dealerBlackJack && (playerScores[i].bet === (this.state.playerBet * 1.5))) {
          outcome += 0
        } else if (dealerBlackJack) {
          outcome += (playerScores[i].bet * -1) 
        } else if (playerScores[i].bet === (this.state.playerBet * 1.5)){
          outcome += playerScores[i].bet
        } else if ((playerScores[i].score > 21)) {
          outcome += ((playerScores[i].bet * -1))
        } else if ((playerScores[i].score < dealerScore) && (dealerScore <= 21)) {
          outcome += ((playerScores[i].bet * -1))
        } else if (playerScores[i].score === dealerScore){
          outcome += 0
        } else {
          outcome += playerScores[i].bet
        }
        
      }

      return outcome;

    }


    getScore = (hand) => {
      let score = 0;
      let aceCount = 0;
        for (let i = 0; i < hand.length; i++){
          if (hand[i].number === "A") {
            aceCount++;
            
          }
        }
      
      for (let i = 0; i < hand.length; i++) {
        switch (hand[i].number) {
          case('J'):
            score += 10;
            break;
          case('Q'):
            score += 10;
            break;
          case('K'):
            score += 10;
            break;
          case('A'):
          // {
          //   if ((score + 11) > 21) {
          //     score +=1;
          //     break;
          //   } 
          //   else {
          //   score += 11;
          //   break;
          //   }
          // }
            score +=1;
            break;
          default:
            score += (hand[i].number); 
        }
      }

      // if ((score > 21) && (aceCount > 0)) {
      //   while ((score > 21) && (aceCount > 0)) {
      //     score-=10;
      //     aceCount--;
      //   }
      // }
      
      if ((score < 12) && (aceCount > 0)){
        score +=10;
      }

    
      return score;
    }

    split = () => {
      let deck = this.shuffle();
      let hand = [...this.state.player]
      let newHandOne = [];
      let newHandTwo = [];
      let splittable = false;
      let currentHand = this.state.currentPlayerHand;
      
      let playerScore = [...this.state.playerScore]
      let betsOut = 0;

      for (let i = 0; i < playerScore.length; i++) {
        betsOut+= playerScore[i].bet;
      }
      let canSplit = ((this.state.playerStack - (betsOut + this.state.playerBet) ) > 0)
      
      if(canSplit) {
      newHandOne.push(hand[currentHand].shift())
      newHandTwo.push(hand[currentHand].shift())
      newHandOne.push(deck.pop())
      newHandTwo.push(deck.pop())

      if (this.getScore(newHandOne) === 21) {
        playerScore[currentHand] = {score: this.getScore(newHandOne), bet: this.state.playerBet * 1.5};
      } else {
      playerScore[currentHand] = {score: this.getScore(newHandOne), bet: this.state.playerBet};
      }

      if (this.getScore(newHandTwo) === 21) {
        playerScore.splice([currentHand + 1], 0, ({score: this.getScore(newHandTwo), bet: this.state.playerBet * 1.5}))

      } else {
        playerScore.splice([currentHand + 1], 0, ({score: this.getScore(newHandTwo), bet: this.state.playerBet}))  
      }
      // hand.push(newHandOne);
      // hand.push(newHandTwo);
      // hand.splice(currentHand, 1)
      
      hand[currentHand] = newHandOne;
      hand.splice([currentHand +1], 0, newHandTwo);

      if ((newHandOne[0].number === newHandOne[1].number))
      {
        splittable = true;
      } else {
        splittable = false;
      }

      this.setState({
        player: hand,
        splittable: splittable,
        playerScore: playerScore
      })
      // let player = [];

      // newHand.push(hand.pop());
      // newHand.push(hand.pop());
      // console.log(newHand);
      // console.log("(((((((((")

      // console.log("(((((((((")
      // console.log(hand);
      // player.push(newHand)
      // console.log(player);
      
      // this.setState({
      //   player: player
      // })
      

    }
    }
    
    dealGame = () => {
       
       let deck = this.shuffle();
       let playerStartHand = [];
       let player = [];
       let dealerStartHand = [];
       let splittable = false;
       let playerScore = [];
       
       let stackCheck = (this.state.playerStack < this.state.playerBet);

       if (stackCheck) {
         console.log("yoyo")
         this.setState({
           gameState: "getBuyIn"
         })
       }

      //  const randCards = []

      //  for (let i = 0; i < 4; i ++ ) {
      //   const rand = Math.floor(Math.random()*deck.length);
      //   const randCard = deck.splice(rand, 1)[0]
      //   randCards.push(randCard);
      //  }
      //  playerStartHand.push(randCards[0]);
      //  playerStartHand.push(randCards[2]);
      //  dealerStartHand.push(randCards[1]);
      //  dealerStartHand.push(randCards[3]);
      playerStartHand.push(deck.pop());
      playerStartHand.push(deck.pop());

      dealerStartHand.push(deck.pop());
      // dealerStartHand.push(deck.pop());
      player.push(playerStartHand)

      if (playerStartHand[0].number === playerStartHand[1].number) {
        splittable = true;
      }

      if (this.getScore(playerStartHand) === 21) {

        playerScore.push({score: this.getScore(playerStartHand), bet: (this.state.playerBet * 1.5)})
      } else {
        playerScore.push({score: this.getScore(playerStartHand), bet: this.state.playerBet});
      }

    
       this.setState({
         dealer: dealerStartHand,
         player: player,
         dealerScore: this.getScore(dealerStartHand),
         playerScore: playerScore,
         deck: deck,
         splittable: splittable,
         gameState: "playerTurn",
         recommendedAction: ""
       })

       
    }
    componentDidMount() {
      let deck = this.generateDeck();

      this.setState({
        deck: deck
      })
    }

    finishCurrentHand = () => {
      let currentPlayerHand = this.state.currentPlayerHand;
      let hand = [...this.state.player]
      let currentHandScore = this.getScore(hand[currentPlayerHand]);
      
      currentPlayerHand++;
      let splittable = (hand[currentPlayerHand][0].number === hand[currentPlayerHand][1].number)
      // let splittable = (hand[currentHand].nu)


      this.setState({
        currentPlayerHand: currentPlayerHand,
        splittable: splittable
      })
    }

    getDealerHand = () => {
      let deck = this.shuffle()
      let dealerHand = [...this.state.dealer]

      let dealerScore = this.getScore(dealerHand) 

      while (dealerScore < 17 ) {
        dealerHand.push(deck.pop());
        dealerScore = this.getScore(dealerHand)
      }

      return dealerHand
    }

    playerStands = () => {
      
      // let deck = [...this.state.deck]
      let deck = this.shuffle()
      let playerHand = [...this.state.player]
      let currentPlayerHand = this.state.currentPlayerHand;
      let playerBet = this.state.playerBet;
      let playerStack = this.state.playerStack;
      let playerScores = [...this.state.playerScore]
      
      // let dealerScore = this.getScore(dealerHand);
      // let playerScore = this.getScore(playerHand[currentPlayerHand]);
      // // let picked = 0;
      // let hand = [...this.state.dealer]

      // // while (dealerScore < playerScore || dealerScore < 17) {
      // while (dealerScore < 17) {
        
    
      //   hand.push(deck.pop());
        
      //   dealerScore = this.getScore(hand);
        
        
      // }
      let dealerHand = this.getDealerHand();
      let dealerScore = this.getScore(dealerHand);

      let outcome = this.evaluateOutcomes(dealerScore, playerScores);


      this.setState({
        dealer: dealerHand,
        deck: deck,
        dealerScore: this.getScore(dealerHand),
        gameState: "handOver",
        currentPlayerHand: 0
      })

     
      console.log(outcome)
      

      this.setState({
        playerStack: (playerStack + outcome)
      })
      // if (dealerScore > 21) {
      //   this.setState({
      //     gameStatus: "dealerBusted",
      //     playerStack: (playerStack + playerBet)
      //   })
      // }
      // else if (dealerScore < playerScore) {
      //   this.setState({
      //     gameStatus: "playerWins",
      //     playerStack: (playerStack + playerBet)
      //   })
      // } 
      // else if (dealerScore === playerScore) {
      //   this.setState({
      //     gameStatus: "push"
      //   })
      // } 
      // else {
      //   this.setState({
      //     gameStatus: "dealerWins",
      //     playerStack: (playerStack - playerBet)

      //   })
      // }
      
    }

    shuffle = () => {
      let deck = [...this.state.deck]
      let currentIndex = deck.length;
      let temporaryValue;
      let randomIndex;


      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex]
        deck[randomIndex] = temporaryValue
      }

      // this.setState({
      //   deck: deck
      // })
      return deck;
    }

    updateStackHandler = (event) => {
      if (this.state.gameState === "getBuyIn"){
      this.setState(
        {
          playerStack: event.target.value.replace(/\D/,'')
          
      })
    } else if (this.state.gameState === "getBet") {
      let pBet = event.target.value.replace(/\D/,'')
      if (pBet > this.state.playerStack){
        pBet = this.state.playerStack;
      }
      
      this.setState({
        playerBet: pBet
      })
    }

    }

    submitBet = (event) => {
      if (this.state.gameState === "getBuyIn"){
        let playerStack = parseInt(this.state.playerStack, 10);

        this.setState({
          gameState: "getBet",
          playerStack: playerStack
        })
    } else if (this.state.gameState ==="getBet") {
        let playerBet = parseInt(this.state.playerBet, 10);

        this.setState({
          gameState: "start",
          playerBet: playerBet
        })
    }
    }


    
    render() {
      
      return (
        
        <div className = {classes.default}>
     
            {/* <div className = {classes.row}> */}
            <div className = {classes.playerHands}>
              
              <Hand key = "dealer" hand = {this.state.dealer} playerType = "dealer" currentHand = {this.state.currentPlayerHand}/>
              </div>
            {/* </div> */}
            
            <GameInterface 
              book = {this.book}
              dealGame = {this.dealGame}
              hit = {this.getCard}
              shuffle = {this.generateDeck}
              shuffleTwo = {this.shuffle}
              reset = {this.reset}
              gameStatus = {this.state.gameStatus}
              gameState = {this.state.gameState}
              stand = {this.playerStands}
              doubleDown = {this.doubleDown}
              split = {this.split}
              getBet = {this.updateStackHandler}
              submitBet = {this.submitBet}
              splittable = {this.state.splittable}
              playerStack = {this.state.playerStack}
              error = {this.state.error}
              numPlayerHands = {this.state.player.length}
              playerBet = {this.state.playerBet}
              currentHand = {(this.state.currentPlayerHand + 1)}
              finishCurrentHand = {this.finishCurrentHand}
              player = {this.state.player}
              playerScore = {this.state.playerScore}
              dealerScore = {this.state.dealerScore}
              recommendedAction = {this.state.recommendedAction}
              closeBook = {this.closeBook}
              />
            {/* <div className = {classes.row}> */}
              <div className = {classes.playerHands}>
                {this.state.player.map((hands, index) => 
                  <Hand key = {index} index = {index}  
                  gameState = {this.state.gameState}
                  hand = {hands} playerType = "player" currentHand = {this.state.currentPlayerHand}/>
                )}
              </div>
            {/* </div> */}
        
        </div>
      );
    }
  }

  export default Game;