import {configureStore} from "@reduxjs/toolkit"
import hotelReducer from "./hotelSlice"

export const store = configureStore({
    reducer: {
        hotels: hotelReducer
    }
});