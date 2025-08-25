import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {addUser, clearUsers, setToken} from "../../store/reducers";
import api from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {User} from "../../store/types";

function Admin() {

    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.token.users)
    const [lol, setLol] = useState(false)


    useEffect(() => {
        (document.querySelector(".footer") as HTMLElement).classList.add("fixed-bottom")

        const token = Cookies.get('authToken');
        console.debug("token from cookies: " + token)
        if (token) {
            dispatch(setToken(token))
            //dispatch(authorize()); // Сохраните токен в хранилище

            api.getAllUsers(token)
                .then(data => {
                    if (data === '') setLol(true)
                    else {
                        dispatch(clearUsers())
                        data.map((user: User) => dispatch(addUser(user)))
                    }
                })
                .catch(error => {
                    console.debug('Ошибка при запросе пользователей!' + error)
                });
        }
    }, [dispatch])

    return (
        <table>
            <tbody>
            {lol && <tr><td>а что ты тут делаешь??</td></tr>}
            {users.map(user => {
                    return (
                        <tr key={"tr"+user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
    )

}

export default Admin