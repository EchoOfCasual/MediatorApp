import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../app/store';

export interface inputTableState{
    inputTable: string[][]
}

const initialState: inputTableState = {
    inputTable: []
}

interface setSpecificValueInterface{
    columnIndex: number,
    rowIndex: number,
    value: string
}


export const inputTableSlice = createSlice({
    name: "inputTable",
    initialState,
    reducers: {
        purgeTable: (state) =>{

            state.inputTable = [];
        },

        setTable: (state, action: PayloadAction<string[][]>)=>{

            state.inputTable = action.payload;
        },

        setSpecificValue: (state, action: PayloadAction<setSpecificValueInterface>)=>{
            state.inputTable[action.payload.rowIndex][action.payload.columnIndex] = action.payload.value;
        },



    }


})

export const {purgeTable, setTable, setSpecificValue} = inputTableSlice.actions;

export const selectInputTable = (state: RootState) => state.inputTable.inputTable;

export default inputTableSlice.reducer;