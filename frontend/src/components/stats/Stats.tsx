import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import api from "../../api";
import Cookies from "js-cookie";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './stats.css'
import {RootState} from "../../store/store";
import {addPoint, clearPoints, setToken, updatePercent} from "../../store/reducers";
import {Point} from "../../store/types";

function Stats() {

    const dispatch = useDispatch();
    const percentFromStore = useSelector((state: RootState) => state.token.percent)

    const [hitStrike, setHitStrike] = useState(0);
    const [missStrike, setMissStrike] = useState(0);

    useEffect(() => {
        document.title = "Статистика";
        (document.querySelector(".footer") as HTMLElement).classList.add("fixed-bottom");

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

                    let miss_m = 0;
                    let hit_m = 0;
                    let miss = 0;
                    let hit = 0;
                    data.forEach((point: Point) => {
                        if (point.result) {
                            hit += 1;
                            miss_m = miss > miss_m ? miss : miss_m;
                            miss = 0;
                        } else {
                            miss += 1;
                            hit_m = hit > hit_m ? hit : hit_m;
                            hit = 0;
                        }
                    })
                    miss_m = miss > miss_m ? miss : miss_m
                    hit_m = hit > hit_m ? hit : hit_m

                    setMissStrike(miss_m);
                    setHitStrike(hit_m);
                })
                .catch(error => {
                    console.debug('Ошибка при запросе точек!' + error)
                });

        }

    }, [dispatch])

    return (
        <main className="stats">
            <div className={"percent_show"}>
                <h1>Ваш процент попаданий:</h1>

                <div style={{width: '300px', margin: '20px auto'}}>
                    <CircularProgressbar
                        value={percentFromStore}
                        text={`${percentFromStore}%`}
                        styles={buildStyles({
                            textColor: '#3e98c7',
                            pathColor: percentFromStore >= 50 ? 'green' : 'orange',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </div>
            </div>
            <div className={"strikes"}>
                <div className={"hit_strike"}>
                    Самая долгая серия попаданий подряд: <b>{hitStrike}</b>
                </div>
                <div className={"miss_strike"}>
                    Самая долгая серия промахов подряд: <b>{missStrike}</b>
                </div>
            </div>

        </main>
    );
}

export default Stats;