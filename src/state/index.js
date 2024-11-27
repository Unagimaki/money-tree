import { combineReducers, createStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer/userReducer";
import { statsReducer } from "./reducers/statsReducer/statsReducer";
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

const rootReducer = combineReducers({
  user: userReducer,
  playersTop: statsReducer,
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
});

export const store = createStore(rootReducer)

// store.subscribe(() => console.log(store.getState()))