import './styles/index.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import AuthorizationPage from '../pages/AuthorizationPage';
import ProfilePage from '../pages/ProfilePage';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '../features/mui';

type route = {
    path: string;
    element: JSX.Element;
};

function App() {
    const publicRoutes: route[] = [
        { path: '/', element: <MainPage /> },
        { path: '/schedule', element: <MainPage /> },
        { path: '/groups', element: <MainPage /> },
        { path: '/visits', element: <MainPage /> },
        { path: '/login', element: <AuthorizationPage /> },
        { path: '/account', element: <ProfilePage /> },
    ];

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Routes>
                    {publicRoutes.map((route, index) => (
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
