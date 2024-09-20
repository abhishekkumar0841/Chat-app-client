// import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi/baseApi";
import userSlice from "./slices/userSlice";

// const store = configureStore({
//     reducer: {
//       user: userSlice,
//       // Add the API reducer
//       [baseApi.reducerPath]: baseApi.reducer,
//       // Add other reducers here if you have any
//     },
//     // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(baseApi.middleware),
//   });

// export default store



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import socketSlice from "./slices/socketSlice";

const rootReducer = combineReducers({
  user: userSlice,
  socket: socketSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"],
  blacklist: ['socket']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);