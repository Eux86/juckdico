import React from 'react';
import useCard from '../../icons/use-card.svg'
import classes from './ScannCard.module.css'


const ScannCard = () => {
  return (
    <div className={classes['scan-card']}>
      <img src={useCard} width={300} height={300}/>
      <h1> Scan your card</h1>
    </div>
  );
};

export default ScannCard;
