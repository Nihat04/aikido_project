import './styles/index.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCoach } from '../entities/user';
import { addUser } from '../features/store/user/userSlice';

import MainPage from '../pages/MainPage/MainPage';
import AuthorizationPage from '../pages/AuthorizationPage';
import PersonalPage from '../pages/PersonalPage';

type route = {
    path: string;
    element: JSX.Element;
};

function App() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const publicRoutes: route[] = [
        { path: '/', element: <MainPage /> },
        { path: '/schedule', element: <MainPage /> },
        { path: '/groups', element: <MainPage /> },
        { path: '/visits', element: <MainPage /> },
        { path: '/login', element: <AuthorizationPage /> },
        { path: '/account', element: <PersonalPage /> },
    ];

    // useEffect(() => {
    //     getCoach()
    //         .then((user) => dispatch(addUser(user)))
    //         .catch(() => navigate('/login'));

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
