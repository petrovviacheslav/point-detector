import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './reducers'; // Импортируйте редьюсер

const store = configureStore({
    reducer: {
        token: tokenReducer,
    },
});

// Экспортируйте типы для использования в других частях приложения
export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;

export default store;
