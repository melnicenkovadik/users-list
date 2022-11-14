import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from "models/user";
import {initialUsers} from "utils/constants";

interface IUserState {
    users: IUser[];
}

const initialState: IUserState = {
    users: initialUsers,
};
export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action:PayloadAction<IUser>) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action:PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action:PayloadAction<IUser>) => {
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
        }

    },
});

export const usersActions = userSlice.actions;
export const usersReducer = userSlice.reducer;
