import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import './resultTable.css'
import {RootState} from "../../store/store";

const ResultsTable = () => {

    const points: any[] = useSelector((state: RootState) => state.token.points)
    const [numPage, setNumPage] = useState(0)

    useEffect(() => {
        if (points.length === 0) setNumPage(0);
    }, [points.length]);

    const increment = (): void => {
        setNumPage((prevCount: number) => prevCount + 1);
    };
    const decrement = (): void => {
        setNumPage((prevCount: number) => prevCount - 1);
    };


    return (

        <table id="check" className="table-check">
            <caption>
                <button disabled={numPage === 0} onClick={decrement}>&lt; prev</button>
                <span>{10*numPage+1}...{(numPage+1)*10}</span>
                <button disabled={10 * (numPage + 1) >= points.length} onClick={increment}>next &gt;</button>
            </caption>
            <thead>
            <tr className="table-header">
                <th scope="col">№</th>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">R</th>
                <th scope="col">Попал?</th>
                <th scope="col">Дата</th>
            </tr>
            </thead>
            <tbody>
            {(points.length === 0) && <tr>
                <td colSpan={6} id="no-results">Нет результатов</td>
            </tr>}

            {(points.length > 0) &&
                points.slice(10 * numPage, 10 * (numPage + 1)).map((point, index) => {
                    return (
                        <tr key={"tableKey" + point.id} className={point.result ? "hit" : "miss"}>
                            <td>{10 * numPage + index + 1}</td>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td>{point.result ? "Да" : "Нет"}</td>
                            <td>{point.currenttime}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>


    )

}
export default ResultsTable;