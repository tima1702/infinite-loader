/** @format */

import { combineReducers } from "redux";
import auth from "./Auth";

// export default combineReducers({
//   auth,
//   todos,
// })

// const appReducer = combineReducers({
//   auth
// });

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

export default combineReducers({
  auth
});
