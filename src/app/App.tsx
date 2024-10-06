import './styles/index.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';

type route = {
    path: string;
    element: JSX.Element;
};

function App() {
    const publicRoutes: route[] = [{ path: '/', element: <MainPage /> }];

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
