import loginStyles from '../formStyles.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useFormCustom} from "../../utils/form";
import {userLogin, userRegister} from "../../services/actions";

export default function LoginPage() {
    const dispatch = useDispatch();

    const initial = {
        email: '',
        password: '',
    }

    const {form, setForm, handleChange} = useFormCustom(initial);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(userLogin(form));
        setForm(initial);
    }


    return (
        <div className={loginStyles.wrapper}>
            <form className={loginStyles.form_flexbox} onSubmit={e => onSubmit(e)}>
                <h1 className='text text_type_main-medium'>Вход</h1>
                <EmailInput
                    value={form.email}
                    onChange={e => handleChange(e)}
                    name='email'
                />
                <PasswordInput
                    value={form.password}
                    onChange={e => handleChange(e)}
                    name='password'
                />
                <Button htmlType="submit" type='primary' size='medium'>Войти</Button>
            </form>
            <section className={loginStyles.bottom_section}>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</p>
                    <Link to='/register'>
                        <p className='text text_type_main-small text_color_accent'>Зарегистрироваться</p>
                    </Link>
                </div>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                    <Link to='/forgot-password'>
                        <p className='text text_type_main-small text_color_accent'>Восстановить пароль</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}