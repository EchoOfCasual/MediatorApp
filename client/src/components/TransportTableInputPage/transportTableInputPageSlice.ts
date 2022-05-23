import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

export interface transportTableState{
    profit: number,
    optimalSellPathsTable: number[][],
    profitTable: number[][],
    cost: number,
    income: number
}

const initialState: transportTableState = {
    profit: 0,
    optimalSellPathsTable: [],
    profitTable: [],
    cost: 0,
    income: 0
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
            state.profitTable = action.payload.profitTable;
            state.cost = action.payload.cost;
            state.income = action.payload.income;
        },


    }


})

export const {purgeOutputTable, setOutputTable} = transportTableInputPageSlice.actions;

export const selectTransportTable = (state: RootState) => state.transportTable;

export default transportTableInputPageSlice.reducer;