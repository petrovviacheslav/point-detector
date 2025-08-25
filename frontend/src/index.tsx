import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store'
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom'

//localStorage.setItem('token', null)
//localStorage.setItem('auth', 'false')

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

