import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './gamePage.module.scss'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import {
	actionSetUserBalance,
	actionSetUserDamage,
	actionSetUserEnergy
} from '../../state/reducers/userReducer/actions'
import { Balance } from '../../features/components/Balance/Balance'
import { Stats } from '../../features/components/Stats/Stats'
import { actionSetDamageBoostActive } from '../../state/reducers/freeBoostsReducer/action'
import { PagesLinks } from '../../shared/PagesLinks'
import { baseURL, WebApp } from '../../App'
import { randomNum } from './helpers/randomNum'
import { actionHintButtonVisible } from '../../state/reducers/tutorialReducer/tutorialReducer'
import { actionShowModal } from '../../state/reducers/alertModalReducer/alertModalReducer'

const GamePage = ({ navigate, onDamageModalShow }) => {
  const SOCKET_URL = `wss://${baseURL}/game`;
  const ICON_SIZE = 50;
  const ICON_SPAWN_INTERVAL = 250;
  const ICON_SPEED = 4;
  const BOOST_DURATION_MS = 10000;
  const BOOST_DAMAGE_DIVISOR = 10;
  const HITBOX_OFFSET = 10; // Увеличиваем хитбокс на 10px со всех сторон

  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const isDamageBoostActive = useSelector(
    (state) => state.freeBoosts.isDamageBoostActive
  );
  const token = useSelector((state) => state.user.token);
  const damage = useSelector((state) => state.user.player.damage);
  const energy = useSelector((state) => state.user.player.energy);
  const isHintActive = useSelector(state => state.tutorial.isHintVisible)
  const [icons, setIcons] = useState([]);
  const gameAreaRef = useRef(null);
  const iconIdRef = useRef(0);
  const animationFrameId = useRef(null);
  const spawnIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [clickedIcons, setClickedIcons] = useState([]);

  const red = require("./assets/red.png");
  const orange = require("./assets/orange.png");
  const green = require("./assets/green.png");
  const images = [red, orange, green];

  useEffect(() => {
    setTimeout(() => {
      if (isDamageBoostActive) {
        dispatch(actionSetUserDamage(damage / BOOST_DAMAGE_DIVISOR));
        dispatch(actionSetDamageBoostActive(false));
        navigate(PagesLinks.MAIN_URL);
        dispatch(actionShowModal('', 'Время буста вышло'))        
      }
    }, BOOST_DURATION_MS);
  }, [isDamageBoostActive, damage, dispatch, navigate]);
  useEffect(() => {
    isHintActive.toMainButton && dispatch(actionHintButtonVisible(false, true))
  }, [])
  useEffect(() => {
    if (socketRef.current) return;

    socketRef.current = io(SOCKET_URL, {
      auth: { token: token },
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current.on("error", (error) => {
      console.log("Received error", error);
      navigate(PagesLinks.MAIN_URL);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Disconnected - reason:", reason);
      navigate(PagesLinks.MAIN_URL);
    });

    socketRef.current.on("connect_error", (error) => {
      console.log(error);
      navigate(PagesLinks.MAIN_URL);
    });

    socketRef.current.on("playerStats", (data) => {
      dispatch(actionSetUserBalance(data.balance));
      dispatch(actionSetUserEnergy(data.energy));
    });

    const handleBeforeUnload = () =>
      socketRef.current && socketRef.current.close();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socketRef.current && socketRef.current.close();
      socketRef.current = null;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [token]);

  const spawnIcon = useCallback(() => {
    if (!isDamageBoostActive && (isPaused || energy < damage)) return;

    const gameArea = gameAreaRef.current;
    if (gameArea) {
      setIcons((prevIcons) => {
        if (energy < 2 * damage && prevIcons.length >= 1) return prevIcons;

        const icon = {
          id: iconIdRef.current++,
          x: Math.random() * (gameArea.clientWidth - ICON_SIZE),
          y: 0,
          imgUrl: images[randomNum(0, 2)],
        };
        return [...prevIcons, icon];
      });
    }
  }, [isPaused, energy, damage]);

	const prevTime = useRef(0)

	const updateIcons = useCallback(() => {
		if (!isPaused) {
			const now = performance.now()
			const elapsedTime = now - prevTime.current
			prevTime.current = now

			setIcons(prevIcons =>
				prevIcons
					.map(icon => ({
						...icon,
						y: icon.y + ICON_SPEED * (elapsedTime / 16.67)
					}))
					.filter(icon => icon.y < window.innerHeight)
			)
		}
	}, [isPaused])

  const gameLoop = useCallback(() => {
    if (!isPaused) {
      updateIcons();
      animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  }, [updateIcons, isPaused]);

  const startGame = useCallback(() => {
    animationFrameId.current = requestAnimationFrame(gameLoop);
    spawnIntervalRef.current = setInterval(spawnIcon, ICON_SPAWN_INTERVAL);

    return () => {
      clearInterval(spawnIntervalRef.current);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameLoop, spawnIcon]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
        clearInterval(spawnIntervalRef.current);
      } else {
        setIsPaused(false);
        spawnIntervalRef.current = setInterval(spawnIcon, ICON_SPAWN_INTERVAL);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    const cleanup = startGame();

    return () => {
      cleanup();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startGame, spawnIcon]);

const handleClick = e => {
	if (!isDamageBoostActive && energy < damage) {
    dispatch(actionShowModal('Недостаточно энергии'))
    return
  };

	const x = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.clientX : e.nativeEvent.touches[0].clientX;
	const y = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.clientY : e.nativeEvent.touches[0].clientY;

	setIcons(prevIcons => {
		const clickedIcon = prevIcons.find(
			icon => 
				x >= icon.x - HITBOX_OFFSET && 
				x <= icon.x + ICON_SIZE + HITBOX_OFFSET && 
				y >= icon.y - HITBOX_OFFSET && 
				y <= icon.y + ICON_SIZE + HITBOX_OFFSET
		);
		if (clickedIcon) {
			WebApp.HapticFeedback.notificationOccurred('warning');
			socketRef.current.emit('leafClick');
			setClickedIcons(prev => [...prev, clickedIcon]);
			return prevIcons.filter(icon => icon.id !== clickedIcon.id);
		}
		return prevIcons;
	});
};

  return (
    <div
      className={styles.game}
      ref={gameAreaRef}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <Balance />
      <Stats onDamageModalShow={onDamageModalShow} />

      {icons?.map((icon) => (
        <div
          key={`icon-${icon.id}`}
          style={{
            position: "absolute",
            width: `${ICON_SIZE}px`,
            height: `${ICON_SIZE}px`,
            fontSize: "40px",
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            pointerEvents: "none",
            zIndex: 99,
            transition: "transform 0.1s ease",
          }}
        >
          <img src={icon.imgUrl} alt="img" />
        </div>
      ))}

      {clickedIcons?.map((icon) => (
        <div
          key={icon.id}
          style={{
            position: "absolute",
            width: `${ICON_SIZE}px`,
            height: `${ICON_SIZE}px`,
            fontSize: "40px",
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            pointerEvents: "none",
            animation: "explode 0.5s forwards",
            zIndex: 99,
            background: `url(${images[randomNum(0, 2)]})`,
          }}
        >
          <img src={icon.imgUrl} alt="img" />
        </div>
      ))}

      <style jsx>{`
        @keyframes explode {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default GamePage
