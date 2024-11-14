import { createSlice } from '@reduxjs/toolkit';

interface User {
    id: string | null;
    role: string | null;
    fullName?: string | null;
}

const initialState: User = {
    id: null,
    fullName: null,
    role: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.fullName = action.payload.fullName;
            if (action.payload.role === 'coach') {
                localStorage.setItem('coachID', action.payload.id);
            } else if (action.payload.role === 'student') {
                localStorage.setItem('studentID', action.payload.id);
            }
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
