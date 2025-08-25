import './footer.css'
// @ts-ignore
import image from "./favicon.jpg"

function Footer()  {
    return (
        <footer className="footer">
            <div>
                <a href="https://se.ifmo.ru">
                    <img className="vt" src={image} alt=""/>
                </a>
            </div>
            <small>
                Проект доступен с открытым исходным кодом на условиях Лицензии CC BY-NC-SA 4.0. Авторские права 2025
                Петров Вячеслав
            </small>
        </footer>
    )
}

export default Footer