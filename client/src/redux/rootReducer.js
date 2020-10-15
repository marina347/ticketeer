import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user/user.reducer";
import boards from "./board/board.reducer";
import lanes from "./lane/lane.reducer";
import tickets from "./ticket/ticket.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user,
  boards,
  lanes,
  tickets,
});

export default persistReducer(persistConfig, rootReducer);
