export default class validator {
    static isValid(n: string, type: "X" | "Y" | "R") {
        if (n === null || isNaN(Number(n)) || n === undefined || n.trim() === '') return {error: type + " должно быть числом", success: false}
        let num: number;
        try {
            num = parseFloat(n)
        } catch (error) {
            return {error: type + " должно быть числом", success: false}
        }

        if (type === "R") {
            if (num > 3 || num < 1) return {error: type + " должно быть в интервале [1, 3]", success: false}
        } else {
            if (num > 3 || num < -5) return {error: type + " должно быть в интервале [-5, 3]", success: false}
        }
        return {error: '', success: true}
    }
}