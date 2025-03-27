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
  const [isCanSpeen, setIsCanSpeen] = useState(true)
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const token = useSelector(state => state.user.token)   
  const dispatch = useDispatch()
  const [tickets, setTickets] = useState(1)
  const userTicketsBalace = useSelector(state => state.user.player.tickets)
  

  const TICKETS = 'TICKETS'
  const RESPIN = 'RESPIN'
  const SPONSOR = 'SPONSOR'
  const LEAFS = 'LEAFS'

  const handleDataChange = (newData) => {
    setTickets(newData); // Обновляем состояние родителя
  };

  const data = prizes?.map((item) => ({
    option: item.prizeType === 'LEAFS' ? `${item.value} лифов` :
            item.prizeType === 'TICKETS' ? `${item.value} билетов` : '', 
    image: item.prizeType !== 'LEAFS' && item.prizeType !== 'TICKETS' ? {
      uri: item.prizeType === 'SPONSOR' ? sponsor :
          item.prizeType === 'RESPIN' ? refresh_circle : '',
      sizeMultiplier: 0.7,
      offsetX: 0,
      offsetY: 100,
    } : null,
  }));

  const handleSpeen = () => {
    setIsCanSpeen(false)
    dispatch(actionSetUserTickets(userTicketsBalace - tickets))
    speenWheel(token, tickets)
      .then(response => {
        console.log(response);
        const { prizeType, value } = response.data.selectedPrize;

        // Определяем, что использовать в поиске
        const searchValue = prizeType === 'LEAFS' ? `${value} лифов` :
                            prizeType === 'TICKETS' ? `${value} билетов` :
                            `${prizeType} - ${value}`;

        console.log(searchValue);

        // Поиск нужного элемента
        const index = data.findIndex(item => item.option === searchValue);
        setPrizeIndex(index);
        console.log(index); // Выведет индекс найденного элемента или -1, если не найден

        setMustSpin(true);

        setTimeout(() => {
          dispatch(actionSetUserBalance(response.data.totalBalance));
          dispatch(actionSetUserTickets(response.data.totalTickets));
        }, 5500);
      })
      .catch(e => console.log(e));
  };

  const handleStopSpeen = () => {
    setMustSpin(false)
    setIsCanSpeen(true)
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
            fontSize={18}
            onStopSpinning={handleStopSpeen}
            spinDuration={0.5}
            textColors={['#fff']}
          />

        <BetSelector onDataChange={handleDataChange}/>
        <SpinButton mustSpin={mustSpin} onClick={handleSpeen} isCanSpeen={isCanSpeen}/>
      </div>
    </div>
  );
};
