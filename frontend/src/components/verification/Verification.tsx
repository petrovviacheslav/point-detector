import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import api from "../../api";
import Cookies from "js-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import {setToken} from "../../store/reducers";
import {RootState} from "../../store/store";


function Verification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const tokenFromStore = useSelector((state: RootState) => state.token.token)
    const [requestInfo, setRequestInfo] = useState({info: '', success: true})


    useEffect(() => {

            const queryString = location.search; // Получаем строку после ?
            const urlParams = new URLSearchParams(queryString);
            const cacheValue = urlParams.get('cache'); // Замените 'paramName' на имя вашего параметра
            if (cacheValue === null || cacheValue.length !== 32) {
                setRequestInfo({
                    info: 'Чтобы подтвердить почту надо сначала зайти в систему под своим аккаунтом и потом заново нажать на ссылку',
                    success: false
                })
            }
            document.title = "Подтверждение почты";

            (document.querySelector(".footer") as HTMLElement).classList.add("fixed-bottom");

            const token = Cookies.get('authToken');
            //console.debug("token from cookies: " + token)
            if (token) {
                dispatch(setToken(token))
                if (cacheValue !== null && cacheValue.length === 32) {
                    api.confirmProfile(token, cacheValue)
                        .then(data => {
                            setRequestInfo({info: 'Вы успешно подтвердили свою почту', success: true})
                        })
                        .catch(error => {
                            setRequestInfo({
                                info: 'Чтобы подтвердить почту надо сначала зайти в систему под своим аккаунтом и потом заново нажать на ссылку',
                                success: false
                            })
                            console.debug('Ошибка при подтверждении почты! ' + error)
                        });
                }
            }
        },
        [dispatch, navigate, location])


    const toMain = () => {
        navigate("/main", {replace: true})
    }

    return (

        <main className="verification-container">
            <div className="profile-header">
                <div style={{margin: '30px auto'}}>{requestInfo.info}</div>
                <button onClick={toMain}>Вернуться на главную</button>
            </div>
        </main>

    );
}

export default Verification;