import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IndexType } from 'typescript';
import { RootState} from '../../app/store';

export interface inputListState{
    [key: string]: any
}

const initialState: inputListState = {
    lists: {}
};

export interface listAddInterface{
    list: string[][]
    listId: string
}

interface entryAddInterface{
    argumentList: string[],
    listId: string
}

interface entryDeleteInterface{
    listId: string,
    index: number
}

export const inputListSlice = createSlice({
    name: "inputList",
    initialState,
    reducers: {
        purge: (state) => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.lists = {};
        },
        addList: (state, action: PayloadAction<listAddInterface>) => {
            state.lists[action.payload.listId] = action.payload.list;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        deleteList: (state, action: PayloadAction<string>) => {
            delete state.lists[action.payload];
        },
        addEntryInList: (state, action: PayloadAction<entryAddInterface>) => {
          state.lists[action.payload.listId].push(action.payload.argumentList);
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        deleteEntryInList: (state, action: PayloadAction<entryDeleteInterface>) => {
            
            //console.log(action.payload.index);
            //console.log( state.lists[action.payload.listId][action.payload.index][0]);

            //const index = myArray.indexOf(key, 0);
            if (action.payload.index > -1) {
                state.lists[action.payload.listId].splice(action.payload.index, 1);
            }

            //delete state.lists[action.payload.listId][action.payload.index];
        },
      }

});

export const { purge, addList, deleteList, addEntryInList, deleteEntryInList } = inputListSlice.actions;

export const selectInputList = (state: RootState) => state.inputList;

export default inputListSlice.reducer;