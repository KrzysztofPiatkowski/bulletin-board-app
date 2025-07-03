import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // gdy null – brak zalogowanego, inaczej obiekt { id, login, avatar, phone }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
