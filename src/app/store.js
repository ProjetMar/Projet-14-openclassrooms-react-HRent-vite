import employeeReducer from '../features/employeeSlice';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
export default store;