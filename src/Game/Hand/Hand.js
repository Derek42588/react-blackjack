import React from 'react';
import Card from '../Card/Card';
import classes from '../Hand/Hand.module.css';



const hand = (props) => (
  
    

    <div className = {classes.Hand} 
    
        style = {{
            opacity: ((props.playerType === "dealer") || (parseInt(props.index) === props.currentHand) || props.gameState === "handOver") ? 1 : .2,
            border: ((props.gameState === "handOver")) ? "1px solid white": null
        }}
   >
    {props.hand.map(card => {
        return (
            <div className = {classes.column}>
            <Card rank = {card.number} suit = {card.suit} playerType = {props.playerType}/>
            </div>
        )
    })}
     </div>
);

export default hand;