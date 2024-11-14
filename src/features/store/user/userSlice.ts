import { createSlice } from '@reduxjs/toolkit';

// interface userState {
//     user: user | null;
//     loggedIn: boolean;
// }

// const initialState: userState = {
//     user: null,
//     loggedIn: false,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         addUser: (state, action: PayloadAction<user>) => {
//             state.user = action.payload;
//             state.loggedIn = true;
//         },
//     },
// });

// export const { addUser } = userSlice.actions;

// export default userSlice.reducer;

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
