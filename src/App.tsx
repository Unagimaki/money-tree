import './App.css';
import { GamePage } from './pages/GamePage/GamePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BoostsPage } from './pages/BoostsPage/BoostsPage';
import { RewardsPage } from './pages/RewardsPage/RewardsPage';
import { ShopPage } from './pages/ShopPage/ShopPage';
import { BonusPage } from './pages/BonusPage/BonusPage';
import { MainPage } from './pages/MainPage/MainPage';
import { PagesLinksEnum } from './shared/PagesLinks.enum';
import { StatPage } from './pages/StatsPage/StatPage';
import { StartPage } from './pages/StartPage/StartPage';
import { LoaderPage } from './pages/LoaderPage/LoaderPage';

import styles from './App.module.scss'
import { FooterMenuModule } from './modules/FooterMenuModule/FooterMenuModule';
import { useEffect } from 'react';



function App() {
  const currentUrl = useLocation().pathname

  useEffect(() => {
    alert(`Ширина экрана: ${window.innerWidth}px, Высота экрана: ${window.innerHeight}px`);
  }, [])

  
  return (
    <div className={styles.app}>
      <Routes>
        <Route path={PagesLinksEnum.BOOSTS_URL} element={<BoostsPage/>}/>
        <Route path={PagesLinksEnum.GAME_URL} element={<GamePage/>}/>
        <Route path={PagesLinksEnum.REWARDS_URL} element={<RewardsPage/>}/>
        <Route path={PagesLinksEnum.SHOP_URL} element={<ShopPage/>}/>
        <Route path={PagesLinksEnum.STATS_URL} element={<StatPage/>}/>
        <Route path={PagesLinksEnum.BONUS_URL} element={<BonusPage/>}/>
        <Route path={PagesLinksEnum.MAIN_URL} element={<MainPage/>}/>
        <Route path={PagesLinksEnum.LOADING_URL} element={<LoaderPage/>}/>
        <Route path='/' element={<StartPage/>}/>
      </Routes>
      {
        currentUrl !== '/' && currentUrl!== PagesLinksEnum.LOADING_URL && <FooterMenuModule/>
      }
    </div>
  );
}

export default App;
