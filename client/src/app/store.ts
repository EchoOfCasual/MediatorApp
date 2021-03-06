import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import inputListReducer from '../components/InputList/inputListSlice';
import transportTableReducer from '../components/TransportTableInputPage/transportTableInputPageSlice';
import inputTableReducer from '../components/InputTable/inputTableSlice';


export const store = configureStore({
  reducer: {
    inputList: inputListReducer,
    inputTable: inputTableReducer,
    transportTable: transportTableReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
