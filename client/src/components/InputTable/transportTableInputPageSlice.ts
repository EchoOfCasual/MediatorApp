import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

export interface transportTableState{
    transportTable: number[][]
}

const initialState: transportTableState = {
    transportTable: []
}

interface setSpecificValueInterface{
    supplierIndex: number,
    recipientIndex: number,
    value: number
}


export const transportTableInputPageSlice = createSlice({
    name: "transportTable",
    initialState,
    reducers: {
        purgeTable: (state) =>{

            state.transportTable = [];
        },

        setTable: (state, action: PayloadAction<number[][]>)=>{

            state.transportTable = action.payload;
        },

        setSpecificValue: (state, action: PayloadAction<setSpecificValueInterface>)=>{
            state.transportTable[action.payload.recipientIndex][action.payload.supplierIndex] = action.payload.value;
        },



    }


})

export const {purgeTable, setTable, setSpecificValue} = transportTableInputPageSlice.actions;

export const selectTransportTable = (state: RootState) => state.transportTable.transportTable;

export default transportTableInputPageSlice.reducer;