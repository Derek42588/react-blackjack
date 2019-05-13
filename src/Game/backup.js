import React, { Component } from 'react';
import Hand from './Hand/Hand';
import GameInterface from './GameInterface/GameInterface';
import classes from '../Game/Game.module.css';



class Game extends Component {
    state = {
            player: [],
            dealer: [],
            playerScore: 0,
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
            error: null
      
          }

    

    // dealHand() {
        
        // let randCard = Math.floor(Math.random()*52);
        // console.log(randCard);
        // console.log(this.state.cardsDealt.includes(randCard));
        
        
    // }


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
        player: [],
        dealer: [],
        playerScore: 0,
        dealerScore: 0,
        deck: deck,
        gameStatus: "",
        gameState: "start",
        numDecks: 1
  
      })

    }

    doubleDown = () => {
        let deck = this.shuffle()
        let hand = [...this.state.player];
        let currentHandIndex = this.state.currentPlayerHand;
        let playerStack = this.state.playerStack;
        let playerBet = this.state.playerBet

        hand[currentHandIndex].push(deck.pop());
        
        

    }


    getCard = () => {
        let deck = this.shuffle()
        const hand = [...this.state.player];
        let currentHandIndex = this.state.currentPlayerHand;
        let playerStack = this.state.playerStack;
        let playerBet = this.state.playerBet

        
      
        hand[currentHandIndex].push(deck.pop());  

        this.setState( {
            deck: deck,
            player: hand,
            playerScore: this.getScore(hand[currentHandIndex])
        }

        )
        let playerScore = this.getScore(hand[currentHandIndex])
        
        if ((playerScore > 21) && (this.state.player.length > 1) && (this.state.player.length != (currentHandIndex + 1))) {
          this.setState({
            playerStack: (playerStack - playerBet),
            currentPlayerHand: (currentHandIndex + 1)
          })
        } else if ((playerScore > 21) && (this.state.player.length === (currentHandIndex + 1))){
          this.setState({
            gameState: "handOver",
            gameStatus: "playerBusted",
            playerStack: (playerStack - playerBet),
            currentPlayerHand: 0
          })
        }

        
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

      

      newHandOne.push(hand[currentHand].pop())
      newHandTwo.push(hand[currentHand].pop())
      newHandOne.push(deck.pop())
      newHandTwo.push(deck.pop())
      
      hand.push(newHandOne);
      hand.push(newHandTwo);
      hand.splice(currentHand, 1)

      if ((newHandOne[0].number === newHandOne[1].number))
      {
        splittable = true;
      } else {
        splittable = false;
      }

      this.setState({
        player: hand,
        splittable: splittable
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
    
    dealGame = () => {
       
       let deck = this.shuffle();
       let playerStartHand = [];
       let player = [];
       let dealerStartHand = [];
       let splittable = false;
       

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

       this.setState({
         dealer: dealerStartHand,
         player: player,
         dealerScore: this.getScore(dealerStartHand),
         playerScore: this.getScore(playerStartHand),
         deck: deck,
         splittable: splittable,
         gameState: "playerTurn"
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

    playerStands = () => {
      let dealerHand = [...this.state.dealer];
      // let deck = [...this.state.deck]
      let deck = this.shuffle()
      let playerHand = [...this.state.player]
      let currentPlayerHand = this.state.currentPlayerHand;
      let playerBet = this.state.playerBet;
      let playerStack = this.state.playerStack;
      
      let dealerScore = this.getScore(dealerHand);
      let playerScore = this.getScore(playerHand[currentPlayerHand]);
      // let picked = 0;
      let hand = [...this.state.dealer]

      // while (dealerScore < playerScore || dealerScore < 17) {
      while (dealerScore < 17) {
        
    
        hand.push(deck.pop());
        
        dealerScore = this.getScore(hand);
        
        
      }
      this.setState({
        dealer: hand,
        deck: deck,
        dealerScore: this.getScore(hand),
        gameState: "handOver",
        currentPlayerHand: 0
      })

      if (dealerScore > 21) {
        this.setState({
          gameStatus: "dealerBusted",
          playerStack: (playerStack + playerBet)
        })
      }
      else if (dealerScore < playerScore) {
        this.setState({
          gameStatus: "playerWins",
          playerStack: (playerStack + playerBet)
        })
      } 
      else if (dealerScore === playerScore) {
        this.setState({
          gameStatus: "push"
        })
      } 
      else {
        this.setState({
          gameStatus: "dealerWins",
          playerStack: (playerStack - playerBet)

        })
      }
      
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
    } else if (this.state.gameState === "start") {
      this.setState({
        playerBet: event.target.value.replace(/\D/,'')
      })
    }

    }

    submitBet = (event) => {
      if (this.state.gameState === "getBuyIn"){
        let playerStack = parseInt(this.state.playerStack, 10);

        this.setState({
          gameState: "start",
          playerStack: playerStack
        })
    } else if (this.state.gameState ==="start") {
        let playerBet = parseInt(this.state.playerBet, 10);

        this.setState({
          
          playerBet: playerBet
        })
    }
    }


    
    render() {
      
      return (
        
        <div className = {classes.default}>
     
            <div className = {classes.row}>
              <Hand hand = {this.state.dealer} playerType = "dealer"/>
            </div>
            <GameInterface 
              dealGame = {this.dealGame}
              hit = {this.getCard}
              shuffle = {this.generateDeck}
              shuffleTwo = {this.shuffle}
              reset = {this.reset}
              gameStatus = {this.state.gameStatus}
              gameState = {this.state.gameState}
              stand = {this.playerStands}
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
              />
            <div className = {classes.row}>
              <div className = {classes.playerHands}>
                {this.state.player.map(hands => 
                  <Hand hand = {hands} playerType = "player"/>
                )}
              </div>
            </div>
        
        </div>
      );
    }
  }

  export default Game;