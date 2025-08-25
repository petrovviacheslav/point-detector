import React, {useEffect} from 'react';
import XYRForm from "./XYRForm";
import MySVG from "./MySVG";
import ResultsTable from "./ResultsTable";
import {useDispatch} from "react-redux";
import {addPoint, clearPoints, setToken, updatePercent} from "../../store/reducers";
import api from "../../api";
import Cookies from "js-cookie";
import './main.css'
import 'react-circular-progressbar/dist/styles.css';
import {Point} from "../../store/types";

function Main() {

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Главная"

        const token = Cookies.get('authToken');
        //console.debug("token from cookies: " + token)
        if (token) {
            dispatch(setToken(token))
            //dispatch(authorize()); // Сохраните токен в хранилище

            api.getPoints(token)
                .then(data => {
                    console.debug("Пришедшие точки: " + data)
                    dispatch(clearPoints())
                    data.map((point: Point) => dispatch(addPoint(point)))
                    dispatch(updatePercent())
                })
                .catch(error => {
                    console.debug('Ошибка при запросе точек!' + error)
                });

        }
    }, [dispatch])

    return (
        <main className="main">
            <div className={"graph"}>
                <MySVG/>
                <XYRForm/>
            </div>

            <h1>Результаты:</h1>
            <ResultsTable/>

        </main>
    );
}

export default Main;