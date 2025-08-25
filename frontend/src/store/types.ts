
export interface TokenState {
    token: string;
    points: Point[]; // Замените any на конкретный тип, если возможно
    percent: number;
    r: number;
    auth: boolean | null; // auth может быть строкой или null
    username: string | null;
    email: string | null;
    isVerified: boolean;
    users: User[]; // Замените any на конкретный тип, если возможно
}

export interface Point {
    x: number;
    y: number;
    r: number;
    result: boolean;
    currenttime: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    isVerified: boolean;
}

