import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type Player = {
  id: string;
  color: string;
};

export type State = {
  isConnecting: boolean;
  player: Player;
};

const slice = createSlice({
  name: 'conway',
  initialState: {
    isConnecting: false,
  } as State,
  reducers: {
    setUser(state: State, action: { type: string; payload: Player }) {
      state.player = action.payload;
    },
    setIsConnecting(state: State, action: { type: string; payload: boolean }) {
      state.isConnecting = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state: State, action) => {
      state.isConnecting = action.payload.conway.isConnecting;
    },
  },
});

export default slice.reducer;

export const { setIsConnecting, setUser } = slice.actions;
