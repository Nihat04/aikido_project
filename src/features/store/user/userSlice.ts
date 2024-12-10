import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../entities/user';

type State = {
    user: User | null;
    logedIn: boolean;
};

const initialState: State = {
    user: null,
    logedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.logedIn = true;
        },
        authUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.logedIn = true;

            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
});

export const { logUser, authUser } = userSlice.actions;
export default userSlice.reducer;
