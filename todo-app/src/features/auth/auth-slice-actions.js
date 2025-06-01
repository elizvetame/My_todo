import axios from 'axios'   
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'

const backendURL = ''

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
           "Content-Type": "application/json",
        },
      }
      const response = await axios.post(
        `${backendURL}/api/auth/login`,
        { username, password },
        config
      );

      return response.data;
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

export const logoutUser = createAction('auth/logout');