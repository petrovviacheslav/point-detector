import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {Point, TokenState, User} from "./types";


const initialState: TokenState = {
    token: '',
    points: [],
    percent: 0,
    r: 1,
    auth: Boolean(Cookies.get('authToken') != null && Cookies.get('authToken') != undefined && (Cookies.get('authToken') as String).length > 20),
    username: null,
    email: null,
    isVerified: false,
    users: [],
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload

            Cookies.set('authToken', action.payload.toString(), {expires: 1});
            //localStorage.setItem("token", "Can be replace: "+action.payload.toString())
            console.debug("Установлен токен")// + state.token)
        },
        clearToken(state) {
            state.token = ''
            Cookies.remove('authToken');
            //localStorage.setItem("token", null)
            console.debug("Токен очищен")
        },
        addPoint(state, action: PayloadAction<Point>) {
            state.points.push(action.payload)
        },
        clearPoints(state) {
            state.points = []
            console.debug("Хранилище точек очищено")
        },
        changeR(state, action: PayloadAction<string>) {
            state.r = parseFloat(action.payload)
        },
        authorize(state, action: PayloadAction<boolean>) {
            state.auth = action.payload

            console.debug("auth установлен")
            localStorage.setItem("auth", "true")
        },
        logOut(state) {
            state.auth = false
            Cookies.remove('authToken');
            console.debug("auth сброшен")
            localStorage.setItem("auth", "false")
        },
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
            console.debug("Установлен username: " + state.username)
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
            console.debug("Установлен email: " + state.email)
        },
        setIsVerified(state, action: PayloadAction<boolean>) {
            state.isVerified = action.payload
            console.debug("Установлен isVerified: " + state.isVerified)
        },
        clearUsername(state) {
            state.username = null
            console.debug("Username сброшен")
        },
        clearEmail(state) {
            state.email = null
            console.debug("Email сброшен")
        },
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload)
        },
        clearUsers(state) {
            state.users = []
            console.debug("Хранилище пользователей очищено")
        },
        updatePercent(state) {
            let hit: number = 0
            state.points.map(point => point.result ? hit += 1 : hit += 0)
            if (state.points.length === 0) state.percent = 0
            else state.percent = parseFloat((100 * hit / state.points.length).toFixed(2))

            // console.debug(state.percent)

        }
    },
});

export const {
    setToken,
    clearToken,
    addPoint,
    clearPoints,
    changeR,
    authorize,
    logOut,
    setEmail,
    setUsername,
    clearEmail,
    clearUsername,
    addUser,
    clearUsers,
    setIsVerified,
    updatePercent
} = tokenSlice.actions;

export default tokenSlice.reducer;