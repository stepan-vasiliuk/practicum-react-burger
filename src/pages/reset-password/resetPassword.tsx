import {FormEvent, useState} from "react";
import resetStyles from "..//formStyles.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useFormCustom} from "../../utils/form";
import {resetPassword} from "../../services/actions";
import {passwordRecovery} from "../../services/actions";

export default function ResetPassword() {

    // @ts-ignore
    const emailSent: boolean = useSelector(state => state.userReducer.emailSent);
    const dispatch = useDispatch();


    const initial = {
        password: "",
        token: "",
    };

    const {form, setForm, handleChange} = useFormCustom(initial);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        // @ts-ignore
        dispatch(passwordRecovery(form))
        setForm(initial);
    }

    return (
        <>
            {emailSent ?
                <div className={resetStyles.wrapper}>
                    <form className={resetStyles.form_flexbox} onSubmit={e => onSubmit(e)}>
                        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                        <PasswordInput value={form.password!}
                                       placeholder='Введите новый пароль'
                                       onChange={e => handleChange(e)}
                                       name='password'
                        />
                        <Input value={form.token!}
                               placeholder='Введите код из письма'
                               onChange={e => handleChange(e)}
                               name='token'
                        />
                        <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
                    </form>
                    <section className={resetStyles.bottom_text}>
                        <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
                        <Link to='/login'>
                            <p className='text text_type_main-small text_color_accent'>Войти</p>
                        </Link>
                    </section>
                </div>
                : <Navigate to='/login'/>
            }
        </>
    )
}