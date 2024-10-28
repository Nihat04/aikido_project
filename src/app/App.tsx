import './styles/index.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';
import { AuthPage, RegPage } from '../pages/AuthRegPages';

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
        { path: '/login', element: <AuthPage /> },
        { path: '/register', element: <RegPage /> },
    ];

    return (
        <>
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
        </>
    );
}

export default App;
