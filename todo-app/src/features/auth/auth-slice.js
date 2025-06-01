import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './auth-slice-actions'

const initialState = {
    user: null,
    userToken: null,
    
    error: null,

    // отслеживать получение данных
    pending: false,
    success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userToken = null;
      state.userInfo = null;
      state.success = false;
    }
  }, //привязываются к жкшенам делает локальное изменение в состоянии
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.userToken = payload.token;
        state.user = payload.user;

        state.pending = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        state.userInfo = 'xxx';
        console.error('rejected');
      })
  }
 })
export default authSlice.reducer