import { createSlice } from '@reduxjs/toolkit'
import { getRandomAlphabets, getRandomNumber, convertLatLong, calculatefare } from '../Rapido/utils'
import riders from '../riders'

const initialState = {
    data: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        update: (state, action) => {
            state.data = action.payload
        },
        updateDistance: (state, action) => {
            const fare = calculatefare(action.payload/1000)
            state.data.distance = action.payload;
            state.data.bookingFee = getRandomNumber(5, ((fare / 100) * 10));
            state.data.rideCharges = fare;
        },
        updateAddress:(state,action)=>{
            state.data.pickup = action.payload[0];
            state.data.drop = action.payload[1];
        },
        save: (state, action) => {
            const fare = calculatefare(action.payload.distance)
            const obj = {
                name: action.payload.name,
                date: action.payload.datetime,
                pickup: action.payload.pickup,
                drop: action.payload.drop,
                duration: action.payload.duration,
                distance: action.payload.distance,
                rideCharges: fare,
                rideId: "RD" + getRandomNumber(15000000000000000, 19000000000000),
                rider: riders[getRandomNumber(0, riders.length - 1)],
                vehicleNumber: "KA" + getRandomNumber(10, 40) + getRandomAlphabets() + getRandomNumber(1000, 9999),
                bookingFee: getRandomNumber(5, ((fare / 100) * 10)),
                invoiceId: `2324KA007${getRandomNumber(1000000, 9999999)}`,
                latNlong: convertLatLong(action.payload)
            };
            state.data = obj
        }
    },
})

// Action creators are generated for each case reducer function
export const { update, updateDistance,updateAddress } = dataSlice.actions

export default dataSlice.reducer