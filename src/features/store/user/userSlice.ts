import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    user: null;
    loggedIn: boolean;
}

const initialState: userState = {
    user: null,
    loggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
