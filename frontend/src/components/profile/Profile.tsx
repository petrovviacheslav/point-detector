import React, {useEffect, useState} from 'react';

import './profile.css'

import {useDispatch, useSelector} from "react-redux";
import InputText from "../custom/InputText";
import api from "../../api";
import {clearPoints, clearToken, logOut, setEmail, setIsVerified, setToken, setUsername} from "../../store/reducers";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../store/store";


function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //const tokenFromStore = useSelector(state => state.token.token)
    const tokenFromStore = useSelector((state: RootState) => state.token.token)
    const emailFromStore = useSelector((state: RootState) => state.token.email)
    const usernameFromStore = useSelector((state: RootState) => state.token.username)
    const isVerifiedFromStore = useSelector((state: RootState) => state.token.isVerified)


    const [username, setUsername2] = useState('')
    const [usernameInfo, setUsernameInfo] = useState({info: '', success: true})

    const [password, setPassword] = useState('')
    const [passwordInfo, setPasswordInfo] = useState({info: '', success: true})


    useEffect(() => {
        document.title = "Профиль"

        const token = Cookies.get('authToken');
        //console.debug("token from cookies: " + token)
        if (token) {
            dispatch(setToken(token))
            //dispatch(authorize()); // Сохраните токен в хранилище

            api.getProfile(token)
                .then(data => {
                    dispatch(setEmail(data.email))
                    dispatch(setUsername(data.username))
                    dispatch(setIsVerified(data.isVerified))
                })
                .catch(error => {
                    console.debug('Ошибка при запросе данных о пользователе! ' + error)
                });
        }
    }, [dispatch])

    const logout = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(clearToken())
        dispatch(logOut())
        dispatch(clearPoints())
        navigate("/", {replace: true})
    }


    const changeUsername = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (username.trim().length > 4) {
            api.changeUsername(username.trim(), tokenFromStore)
                .then(res => {
                    if (res.success) {
                        dispatch(setUsername(username.trim()))
                        setUsernameInfo({info: 'Вы успешно сменили username на "' + username + '"', success: true});
                    } else {
                        setUsernameInfo({info: 'Username "' + username + '" уже занят!', success: false});
                    }
                })
                .catch(e => {
                    setUsernameInfo({info: "Ошибка при отправке username", success: false})
                })
        } else {
            setUsernameInfo({info: "Username должен состоять минимум из 5 непустых символов", success: false})
        }
    }

    const changePassword = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (password.trim().length > 4) {
            api.changePassword(password.trim(), tokenFromStore)
                .then(res => {
                    setPasswordInfo({info: 'Вы успешно сменили пароль на "' + password + '"', success: true});
                })
                .catch(e => {
                    setPasswordInfo({info: "Ошибка при отправке пароля для смены", success: false})
                })
        } else {
            setPasswordInfo({info: "Пароль должен состоять минимум из 5 непустых символов", success: false})
        }
    }


    return (

        <main className="profile-container">
            <div className="profile-header">
                {/*<img src={user.avatar} alt="Аватар пользователя" className="profile-avatar"/>*/}
                <h1 className="profile-name">Ваш
                    username: {usernameFromStore == null ? "его нет" : usernameFromStore}</h1>
                <p className="profile-email">Ваша почта: {emailFromStore}</p>
                <p className="profile-is-verified" style={isVerifiedFromStore ? {color: "green"} : {color: "red"}}>Вы {isVerifiedFromStore ? '' : 'не'} подтвердили свою почту</p>
            </div>

            <div className={"change"}>
                <form className="form-change">
                    <div className={"in_form_div"}>
                        <h3 className="selection-label">Сменить username:</h3>
                        <div className="text-field text-field_floating-3">
                            <input className="text-field__input" id="login"
                                       type="text"
                                       placeholder={"username"}
                                       onChange={(e: { target: { value: string; }; }) => {
                                           setUsername2(e.target.value)
                                       }}
                                       value={username === null ? '' : username}
                            />
                            <label className="text-field__label" htmlFor="login">New username</label>
                        </div>
                        <div style={{color: usernameInfo.success ? "green" : "red"}}>{usernameInfo.info}</div>
                        <button disabled={username === usernameFromStore || username.length <= 4}
                                onClick={changeUsername}>Сменить username</button>
                    </div>
                    <div className={"in_form_div"}>
                        <h3 className="selection-label">Сменить пароль:</h3>
                        <div className="text-field text-field_floating-3">
                            <input className="text-field__input" id="password"
                                       type="password"
                                       placeholder={"New password"}
                                       onChange={(e: { target: { value: string; }; }) => {
                                           setPassword(e.target.value)
                                       }}
                                       value={password === null ? '' : password}
                            />
                            <label className="text-field__label" htmlFor="password">New password</label>
                        </div>
                        <div style={{color: passwordInfo.success ? "green" : "red"}}>{passwordInfo.info}</div>
                        <button disabled={password.length <= 4}
                                onClick={changePassword}>Сменить пароль</button>


                        <button onClick={logout}>Выйти из аккаунта</button>
                    </div>
                </form>
            </div>
        </main>

    );
}

export default Profile;