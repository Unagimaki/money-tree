import { combineReducers, createStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer/userReducer";
import { offersReducer } from "./reducers/offersReducer/offersReducer";
import { freeBoostsReducer } from "./reducers/freeBoostsReducer/freeBoostsReducer";
import { referralsReducer } from "./reducers/referralsReducer/referralsReducer";
import { shopReducer } from "./reducers/shopReducer/shopReducer";
import { autobotReducer } from "./reducers/autobotReducer/autobotReducer";
import { seasonReducer } from "./reducers/seasonReducer/seasonReducer";
import { walletReducer } from "./reducers/walletReducer/walletReducer";
import { boostsReducer } from "./reducers/boostsReducer/boostsReducer";
import { gameReducer } from "./reducers/gameReducer/gameReducer";
import { imagesLoaderReducer } from "./reducers/imagesLoaderReducer/imagesLoaderReducer";
import { tutorialReducer } from "./reducers/tutorialReducer/tutorialReducer";
import { leagueReducer } from "./reducers/leagueReducer/leagueReducer";
import { dailyBonusReducer } from "./reducers/dailyBonusReducer/dailyBonusReducer";
import { alertModalReducer } from "./reducers/alertModalReducer/alertModalReducer";
import { advertModalReducer } from "./reducers/advertModalReducer/advertModalReducer";
import { ticketShopReducer } from "./reducers/ticketShopReducer/ticketShopReducer";
import { wheelReducer } from "./reducers/wheelReducer/wheelReducer";

const rootReducer = combineReducers({
  user: userReducer,
  offers: offersReducer,
  freeBoosts: freeBoostsReducer,
  boosts: boostsReducer,
  referrals: referralsReducer,
  shop: shopReducer,
  bot: autobotReducer,
  season: seasonReducer,
  wallet: walletReducer,
  game: gameReducer,
  imagesLoaded: imagesLoaderReducer,
  tutorial: tutorialReducer,
  league: leagueReducer,
  dailyBonus: dailyBonusReducer,
  alert: alertModalReducer,
  advert: advertModalReducer,
  ticketShop: ticketShopReducer,
  wheel: wheelReducer
});

export const store = createStore(rootReducer)

// store.subscribe(() => console.log(store.getState()))