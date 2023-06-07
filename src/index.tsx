import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/app/app";
import {Provider} from "react-redux";
import configureStore from "./services";
import {HashRouter as Router} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


//@ts-ignore
const root = ReactDOM.createRoot(document.querySelector('#root'));
const store = configureStore();

root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </Provider>
        </Router>
    </React.StrictMode>
)