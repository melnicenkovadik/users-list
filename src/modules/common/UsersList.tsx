import React from "react";
import {useAppSelector} from "hooks/redux";
import {User} from "./User";

export function UsersList() {
    const {users} = useAppSelector(state => state.users);

    return (
        <div className="users-list">
            {users.map(user => (
                <User
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    )
}