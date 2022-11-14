import {Field, Form, Formik} from "formik";
import uniqid from "uniqid";
import React from "react";
import {useActions} from "../hooks/actions";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
    email: Yup.string().email('Невірний формат емейлу').required('Обовязкове поле'),
    name: Yup.string().required('Обовязкове поле'),
    phone: Yup.string().required('Обовязкове поле'),
});

export function AddUser() {
    const { addUser } = useActions();

    return (
        <div className='add-user'>
            <Formik
                initialValues={{
                    email: '',
                    name: '',
                    phone : ''
                }}
                validationSchema={UserSchema}
                onSubmit={values => {
                    const { email, name,phone } = values;
                    const newUser = {
                        id:uniqid(),
                        email,
                        name,
                        phone
                    }
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

                        <button type="submit">Додати користувача</button>

                    </Form>
                )}
            </Formik>
        </div>
    )
}