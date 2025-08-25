import axios from "axios";

export default class api {
    static path = 'http://localhost/api'// 'http://parzi.ru:3001/server-app'

    static async registerReq(email: string, password: string) {
        return await axios.post(api.path + "/auth/register", {
            email: email,
            password: password,
        }).then((res: { data: any; }) => res.data);
    }


    static async loginReq(emailOrUsername: string, password: string) {
        return await axios.post(this.path + '/auth/first-login', {
            emailOrUsername: emailOrUsername,
            password: password,
        }).then((res: { data: any; }) => res.data)
    }

    static async twoFactorLogin(emailOrUsername: string, password: string, code: any) {
        return await axios.post(this.path + '/auth/login', {
            emailOrUsername: emailOrUsername,
            password: password,
            code: code
        }).then((res: { data: any; }) => res.data)
    }

    static async sendPoint(point: { x: number; y: number; r: number; }, token: string) {
        return axios.post(this.path + '/point/add', {
            x: Number(point.x),
            y: Number(point.y),
            r: Number(point.r),
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при отправке точки! " + error.response.data.error);
                }
            })
    }

    static async deletePoints(token: string) {
        return axios.delete(this.path + '/point/delete', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .catch(function (error: { response: any; }) {
                if (error.response) {
                    return console.debug(error.response);
                }
            })
    }

    static async getPoints(token: string) {
        return axios.get(this.path + '/point/getAll', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при получении массива точек! " + error.response.data.error);
                }
            })
    }

    static async changeUsername(username: string, token: string) {
        return axios.post(this.path + '/user/changeUsername', {
            data: username.trim()
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при смене username! " + error.response.data.error);
                }
            })
    }

    static async changePassword(password: string, token: string) {
        return axios.post(this.path + '/user/changePassword', {
            data: password.trim()
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при смене пароля! " + error.response.data.error);
                }
            })
    }

    static async getProfile(token: string) {
        return axios.get(this.path + '/user/getProfile', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при получении данных о пользователе! " + error.response.data.error);
                }
            })
    }

    static async confirmProfile(token: string, cacheValue: string) {
        return axios.post(this.path + '/user/confirmProfile', {
            cache: cacheValue
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            //.then(res => res.data)
        // .catch(function (error) {
        //     if (error.response) {
        //         return console.debug("Ошибка при подтверждении почты! " + error.response.data.error);
        //     }
        // })
    }

    static async getAllUsers(token: string) {
        return axios.get(this.path + '/admin/getAllUsers', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при получении данных о пользователях! " + error.response.data.error);
                }
            })
    }

    static async write(name: string, email: string, message: string) {
        return axios.post(this.path + '/admin/write-to-me', {
            name: name,
            email: email,
            message: message,
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
            }
        })
            .then((res: { data: any; }) => res.data)
            .catch(function (error: { response: { data: { error: string; }; }; }) {
                if (error.response) {
                    return console.debug("Ошибка при получении данных о пользователях! " + error.response.data.error);
                }
            })
    }

}