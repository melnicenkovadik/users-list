import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from 'modules/common/App';
import {persistor, store} from "store";
import {PersistGate} from 'redux-persist/integration/react';
import './styles/Main.scss';
import {ToastContainer} from "react-toast";
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
        <ToastContainer delay={5000} position="top-right" />
    </React.StrictMode>
);
