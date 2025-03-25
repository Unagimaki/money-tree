import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wheel } from "react-custom-roulette"; // Импортируем библиотеку
import styles from './wheelContainer.module.scss';
import { SpinButton } from '../SpinButton/SpinButton';
import { BetSelector } from '../BetSelector/BetSelector';
import { speenWheel } from '../../services/spinWheel';
import { actionSetUserBalance, actionSetUserTickets } from '../../../../state/reducers/userReducer/actions';

const money_icon = require('../../assets/money_icon.png');
const sponsor = require('../../assets/1win.png');
const refresh_circle = require('../../assets/refresh-circle.png');
const ticket_icon = require('../../assets/ticket_icon.png');

export const WheelContainer = ({prizes}) => {    
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const token = useSelector(state => state.user.token)   
  const dispatch = useDispatch()
  const [tickets, setTickets] = useState(1)
  const TICKETS = 'TICKETS'
  const RESPIN = 'RESPIN'
  const SPONSOR = 'SPONSOR'
  const LEAFS = 'LEAFS'

  const handleDataChange = (newData) => {
    setTickets(newData); // Обновляем состояние родителя
  };

  const data = prizes?.map((item) => ({    
    option: `${item.prizeType} - ${item.value}`, // Объединяем prizeType и value в одну строку
    image: {
      uri:item.prizeType === LEAFS ? money_icon : 
          item.prizeType === SPONSOR ? sponsor : 
          item.prizeType === TICKETS ? ticket_icon :
          item.prizeType === RESPIN ? refresh_circle : '',
      sizeMultiplier: 0.4,
      offsetX: 0,
      offsetY: 100,
    },
  }));

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    setPrizeIndex(randomIndex);
    setMustSpin(true);
  };

  const handleSpeen = () => {
    speenWheel(token, tickets)
    .then(response => {
      console.log(response)         
      const { prizeType, value } = response.data.selectedPrize;
      const searchString = `${prizeType} - ${value}`;
      console.log(searchString);
      const index = data.findIndex(item => item.option === searchString);
      setPrizeIndex(index)
      console.log(index); // Выведет 2 (или -1, если не найдено)
      setMustSpin(true);
      setTimeout(() => {
        dispatch(actionSetUserBalance(response.data.totalBalance))
        dispatch(actionSetUserTickets(response.data.totalTickets))
      }, 5500)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    console.log(data);
    
  }, [data])
  

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeIndex}
            data={data}
            backgroundColors={Array(prizes.length).fill("#2F4422")}
            outerBorderColor="#8CDB4E"
            outerBorderWidth={1}
            innerRadius={5}
            radiusLineWidth={1.3}
            fontSize={14}
            onStopSpinning={() => setMustSpin(false)}
            spinDuration={0.5}
          
          />

        <BetSelector onDataChange={handleDataChange}/>
        <SpinButton mustSpin={mustSpin} onClick={handleSpeen}/>
      </div>
    </div>
  );
};
