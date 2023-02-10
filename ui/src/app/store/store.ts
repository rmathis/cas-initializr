import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import OverlayReducer from "./OverlayReducer";
import OptionReducer from "./OptionReducer";
import AppReducer from "./AppReducer";
import PreviewReducer from "./PreviewReducer";
import { PropertyApi } from "./PropertyReducer";

export const reducer = combineReducers({
    app: AppReducer.reducer,
    overlay: OverlayReducer.reducer,
    option: OptionReducer.reducer,
    preview: PreviewReducer.reducer,
    [PropertyApi.reducerPath]: PropertyApi.reducer,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(
                PropertyApi.middleware,
            ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
