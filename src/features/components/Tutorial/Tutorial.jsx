import { useDispatch, useSelector } from 'react-redux';
import styles from './tutorial.module.scss';
import { data } from './data';
import { actionIncreaseStep, actionSetStep, actionSetTutorialActive } from '../../../state/reducers/tutorialReducer/tutorialReducer';
import { tutorialPosTop } from './helpers/tutorialPosTop';
import { arrowPosTop } from './helpers/arrowPosTop';
import { arrowPosLeft } from './helpers/arrowPosLeft';
import { arrowScale } from './helpers/arrowScale';
import { useEffect, useState } from 'react';

export const Tutorial = () => {
    const currentStep = useSelector((state) => state.tutorial.currentStep)
    const dispatch = useDispatch()
    const [isDisabled, setIsDisabled] = useState(false)
  
    useEffect(() => {
      if (currentStep >= 10) {
        dispatch(actionSetTutorialActive(false));
        handleTutorialDone()
      }
    }, [currentStep]);

    const handleTutorialDone = () => {
      setIsDisabled(true)
      dispatch(actionSetStep(3))
      setTimeout(() => {
        dispatch(actionSetTutorialActive(false))
        localStorage.setItem('isTutorialDone', JSON.stringify(true))
      }, 2500)
    }
  
    const avatar = require('./assets/avatar.png')
    const rect = require('./assets/rect.png')
    const arrow = require('./assets/arrow.png')

    return (
      <div className={styles.container}>
        <div className={styles.container_mask}/>

        <div style={ !isDisabled ? { top: tutorialPosTop(currentStep) } : {top: 'min(61.96vh, 503.12px)'}} className={styles.container_alert}>
          {currentStep !== 0 && currentStep !== 4 && (
            <img
              style={{
                top: arrowPosTop(currentStep),
                left: arrowPosLeft(currentStep),
                transform: arrowScale(currentStep),
              }}
              className={styles.container_alert_arrow}
              src={arrow}
              alt="arrow"
            />
          )}
          {(currentStep !== 6  && !isDisabled) && (
            <button
              onClick={() => { handleTutorialDone() }}
              style={currentStep === 7 ? { right: 0 } : { left: 0 }}
              className={styles.container_alert_skip_button}
            >
              Пропустить
            </button>
          )}
          {currentStep === 2 && (
            <img
              style={{
                top: arrowPosTop(currentStep),
                left: '20%',
                transform: 'scaleX(-1)',
              }}
              className={styles.container_alert_arrow}
              src={arrow}
              alt="arrow"
            />
          )}
          <div className={styles.container_alert_wrapper}>
            <img
              className={styles.container_alert_wrapper_img}
              src={avatar}
              alt="avatar"
            />
            <div
              className={styles.container_alert_wrapper_text}
              dangerouslySetInnerHTML={{ __html: data[currentStep]?.text }}
            />
          </div>
          {
            !isDisabled && 
            <button
              onClick={() => !isDisabled && dispatch(actionIncreaseStep())}
              className={styles.container_alert_button}
            >
            <div className={styles.container_alert_button_text}>Далее</div>
            <img
              className={styles.container_alert_button_icon}
              src={rect}
              alt="arrow"
            />
          </button>
          }
        </div>
      </div>
    );
}