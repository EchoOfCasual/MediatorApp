import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

export interface transportTableState{
    profit: number,
    optimalSellPathsTable: number[][]
}

const initialState: transportTableState = {
    profit: 0,
    optimalSellPathsTable: []
}



export const transportTableInputPageSlice = createSlice({
    name: "transportTable",
    initialState,
    reducers: {
        purgeOutputTable: (state) =>{

            state = initialState;
        },

        setOutputTable: (state, action: PayloadAction<transportTableState>)=>{

            state.optimalSellPathsTable = action.payload.optimalSellPathsTable;
            state.profit = action.payload.profit;
        },


    }


})

export const {purgeOutputTable, setOutputTable} = transportTableInputPageSlice.actions;

export const selectTransportTable = (state: RootState) => state.transportTable;

export default transportTableInputPageSlice.reducer;