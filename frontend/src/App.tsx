import React from 'react';
import Auth from './components/auth/Auth'
import Main from './components/main/Main'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import Profile from "./components/profile/Profile";
import Header from "./components/header/Header";
import {Nav} from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin";
import Verification from "./components/verification/Verification";
import Stats from "./components/stats/Stats";
import About from "./components/about/About";
import {RootState} from "./store/store";
import './main.css'


function App() {

    const isAuth = useSelector((state: RootState) => state.token.auth)

    const createPage = (component: JSX.Element) => {
        return (
            <div className={"mainComponent"}>
                <Header/>
                <Nav/>
                {component}
                <Footer/>
            </div>
        )
    }

    return (
        <div className={"wrapper"}>
            <Routes>

                <Route path="/main"
                       element={
                           isAuth ? createPage(<Main/>) : <Navigate to="/auth"/>
                       }
                />

                <Route path="/auth"
                       element={
                           isAuth ? <Navigate to="/main"/> : <Auth/>
                       }/>

                <Route path="/profile"
                       element={
                           isAuth ? createPage(<Profile/>) : <Navigate to="/auth"/>
                       }/>

                <Route path="/admin-panel"
                       element={
                           isAuth ? createPage(<Admin/>) : <Navigate to="/auth"/>
                       }/>

                <Route path="/verification"
                       element={
                           isAuth ? createPage(<Verification/>) : <Navigate to="/auth"/>
                       }/>

                <Route path="/stats"
                       element={
                           isAuth ? createPage(<Stats/>) : <Navigate to="/auth"/>
                       }/>

                <Route path="/" element={<About/>}/>


                {/*<Route path="*" element={<NotFound/>}/>*/}
            </Routes>

        </div>
    );
}
export default App;