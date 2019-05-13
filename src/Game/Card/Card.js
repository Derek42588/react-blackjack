import React from 'react';
import classes from '../Card/Card.module.css';

const card = (props) => (
        <div className = {classes.Card}>
        {props.suit} {props.rank}
        </div>
    );

export default card;