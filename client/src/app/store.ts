import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import inputListReducer from '../components/InputList/inputListSlice';
import transportTableReducer from '../components/TransportTableInputPage/transportTableInputPageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    inputList: inputListReducer,
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
