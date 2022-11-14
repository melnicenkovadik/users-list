import {CiCircleRemove} from "react-icons/ci";
import {BiEdit} from "react-icons/bi";
import {GrUpdate} from "react-icons/gr";
import React from "react";
import {useActions} from "hooks/actions";
import {IUser} from "models/user";
import {useToast} from "hooks/use-toast";

export function User(props: { user: IUser }) {
    const {
        user: {
            id,
            email,
            name,
            phone
        }
    } = props;
    const {removeUser, updateUser} = useActions();
    const [editUser, setEditUser] = React.useState<IUser | null>(null);
    const { showSuccess } = useToast();

    const removeUserHandler = (id: string) => {
        removeUser(id);
        showSuccess('Користувача видалено');
    }

    const updateUserHandler = (user: IUser) => {
        setEditUser(user);
    }

    function saveUserChanges() {
        if (editUser) {
            updateUser(editUser);
            showSuccess(`Користувача ${editUser.name} оновлено`);
            setEditUser(null);
        }
    }

    return (
        <div className="user" key={id}>
            <div className='user__actions'>
                <div
                    onClick={() => removeUserHandler(id)}
                    className='user__action'>
                    <CiCircleRemove/>
                </div>
                {
                    editUser?.id !== id ?
                        (
                            <div
                                onClick={() => updateUserHandler({
                                    id,
                                    email,
                                    name,
                                    phone
                                })}
                                className='user__action'>
                                <BiEdit/>
                            </div>
                        ) :
                        (
                            <div
                                onClick={saveUserChanges}
                                className='user__action'>
                                <GrUpdate/>
                            </div>
                        )
                }
            </div>
            <div className='user__info'>
                {
                    editUser && editUser?.id === id ? (
                        <div className='user__info--content'>
                            <input
                                className='item is-edit'
                                type="text"
                                value={editUser.name}
                                onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                            />
                            <input
                                className='item is-edit'
                                type="text"
                                value={editUser.email}
                                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                            />
                            <input
                                className='item is-edit'
                                type="text"
                                value={editUser.phone}
                                onChange={(e) => setEditUser({...editUser, phone: e.target.value})}
                            />
                        </div>
                    ) : (
                        <div className='user__info--content'>
                            <input
                                disabled
                                className='item'
                                type="text"
                                value={name}
                            />
                            <input
                                disabled
                                className='item'
                                type="text"
                                value={email}
                            />
                            <input
                                disabled
                                className='item'
                                type="text"
                                value={phone}
                            />
                        </div>
                    )

                }
            </div>
        </div>
    )
}