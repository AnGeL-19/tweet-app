import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../context/store/store'
import { Auth } from '@/core/domain/entities/auth.entity'
import { User } from '@/core/domain/entities/user.entity'



// Define the initial state using that type
export const initialState: Auth = {
  logged: false,
  user: null,
  token: ''
}



export const authSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.logged = action.payload.logged
    },
    logout: (state, action: PayloadAction<Auth>) => {
      state.logged = action.payload.logged;
      state.token = action.payload.token;
      state.user = action.payload.user
    },
    updateDataUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { login, logout, updateDataUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.user

export default authSlice.reducer