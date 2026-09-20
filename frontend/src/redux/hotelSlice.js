import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
    name: "hotels",
    initialState: {hotels: []},
    reducers: {
        setHotels: (state, action) =>{
            state.hotels = action.payload;
        }
    }
});

export const {setHotels} = hotelSlice.actions;
export default hotelSlice.reducer;