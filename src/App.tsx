import './App.css';
import { GamePage } from './pages/GamePage/GamePage';
import { Route, Routes } from 'react-router-dom';
import { BoostsPage } from './pages/BoostsPage/BoostsPage';
import { RewardsPage } from './pages/RewardsPage/RewardsPage';
import { ShopPage } from './pages/ShopPage/ShopPage';
import { StatsPage } from './pages/StatsPage/StatsPage';
import { BonusPage } from './pages/BonusPage/BonusPage';
import { MainPage } from './pages/MainPage/MainPage';
import { PagesLinksEnum } from './shared/PagesLinks.enum';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PagesLinksEnum.BOOSTS_URL} element={<BoostsPage/>}/>
        <Route path={PagesLinksEnum.GAME_URL} element={<GamePage/>}/>
        <Route path={PagesLinksEnum.REWARDS_URL} element={<RewardsPage/>}/>
        <Route path={PagesLinksEnum.SHOP_URL} element={<ShopPage/>}/>
        <Route path={PagesLinksEnum.STATS_URL} element={<StatsPage/>}/>
        <Route path={PagesLinksEnum.BONUS_URL} element={<BonusPage/>}/>
        <Route path='/' element={<MainPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
