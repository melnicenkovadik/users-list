import React from 'react';
import {useAppSelector} from "../hooks/redux";
import * as Yup from 'yup';
import {useActions} from "../hooks/actions";
import { Field, Form, Formik } from 'formik';
import uniqid from "uniqid";

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Невірний формат емейлу').required('Обовязкове поле'),
    name: Yup.string().required('Обовязкове поле'),
    phone: Yup.string().required('Обовязкове поле'),
});


function App() {
    const {users} = useAppSelector(state => state.users);
    const { addUser } = useActions();

    return (
        <div className="App">
            <div className='add-user'>
                <Formik
                    initialValues={{
                        email: '',
                        name: '',
                        phone : ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        const { email, name,phone } = values;
                        const newUser = {
                            id:uniqid(),
                            email,
                            name,
                            phone
                        }
                        console.log('newUser',newUser);
                        addUser(newUser);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <div>
                                <div>
                                    {errors.email && touched.email ? (
                                        <div className="text-error">
                                            <label htmlFor="email">Адреса електронної пошти</label> -
                                            <span>{errors.email}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="email">Адреса електронної пошти</label>
                                        </div>
                                    )}
                                </div>

                                <Field
                                    className="field"
                                    name="email"
                                    type="email"
                                />

                                <div>
                                    {errors.name && touched.name ? (
                                        <div className="text-error">
                                            <label htmlFor="name">Ім'я</label> -
                                            <span>{errors.name}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="name">Ім'я</label>
                                        </div>
                                    )}
                                </div>

                                <Field
                                    className="field"
                                    name="name"
                                    type="text"
                                />

                                <div>
                                    {errors.phone && touched.phone ? (
                                        <div className="text-error">
                                            <label htmlFor="phone">Номер телефону</label> -
                                            <span>{errors.phone}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="phone">Номер телефону</label>
                                        </div>
                                    )}
                                </div>

                                <Field
                                    className="field"
                                    name="phone"
                                    type="text"
                                />
                            </div>

                            <button type="submit">Submit</button>

                        </Form>
                    )}
                </Formik>
            </div>
            <div className="users-list">
                {users.map(user => (
                    <div className="user" key={user.id}>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div>{user.phone}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
