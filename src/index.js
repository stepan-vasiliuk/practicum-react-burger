import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import {Provider} from "react-redux";
import configureStore from "./services";

const root = ReactDOM.createRoot(document.querySelector('#root'));
const store = configureStore();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
)