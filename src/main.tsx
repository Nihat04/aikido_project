import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './features/store/store.ts';

import App from './app/App';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <StrictMode>
                <App />
            </StrictMode>
        </Provider>
    </BrowserRouter>
);
