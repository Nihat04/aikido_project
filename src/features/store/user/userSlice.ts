import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user } from '../../../entities/user';

interface userState {
    user: user | null;
    loggedIn: boolean;
}

const initialState: userState = {
    user: null,
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<user>) => {
            state.user = action.payload;
            state.loggedIn = true;
        },
    },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
