import {
    createSlice,
    configureStore,
    combineReducers, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import axios from "axios";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Определяем интерфейс для пользователя
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

// Определяем интерфейс для состояния пользователей
interface UsersState {
    users: User[];
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Создаем асинхронный thunk для получения пользователей
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        return response.data;
    }
);

// Создаем редюсер с использованием createSlice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: 'idle',
        error: null,
    } as UsersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Something went wrong';
            });
    },
});


const rootReducer = combineReducers({
    users: usersSlice.reducer,
})
export const store = configureStore({
    reducer: rootReducer
})

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()))
