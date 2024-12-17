import './styles/index.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/ProfilePage';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '../features/mui';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logUser } from '../features/store/user/userSlice';
import StudentsPage from '../pages/StudentsPage';
import GroupsPage from '../pages/GroupsPage';
import AdminSchedulePage from '@/pages/AdminSchedulePage/AdminSchedulePage';
import AttendancePage from '@/pages/AttendancePage/AttendancePage';

type route = {
    path: string;
    element: JSX.Element;
};

const PUBLIC_ROUTES: route[] = [
    { path: '/', element: <MainPage /> },
    { path: '/schedule', element: <MainPage /> },
    { path: '/manageSchedule', element: <AdminSchedulePage /> },
    { path: '/groups', element: <GroupsPage /> },
    { path: '/attendance', element: <AttendancePage /> },
    { path: '/login', element: <AuthorizationPage /> },
    { path: '/account', element: <ProfilePage /> },
    { path: '/students', element: <StudentsPage /> },
];

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            dispatch(logUser(JSON.parse(userString)));
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Routes>
                    {PUBLIC_ROUTES.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route path="*" element={<Navigate to={'/'} replace />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
