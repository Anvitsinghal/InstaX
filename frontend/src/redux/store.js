import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authslice from "./Authslice";
import postSlice from "./Postslice";
import socketslice from "./socketslice";
import chatslice from "./chatslice"
import notificationslice from "./notificationslice"
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authslice,
    post:postSlice,
    socketio:socketslice,
    chat:chatslice,
    notifications:notificationslice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;


//persist is use to store the data in browser so that it remain in browser even when tab is close
//without persist:-
// const store = configureStore({
//   reducer: {
//     auth: authslice,
//     post: postSlice,
//     socketio: socketslice,
//     chat: chatslice,
//   },
// });