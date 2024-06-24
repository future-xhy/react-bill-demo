import {configureStore} from '@reduxjs/toolkit';
import billStore from './moudles/billStore';

export default configureStore({
  reducer: {
    bill: billStore
  }
})